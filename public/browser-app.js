const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");
const all = document.querySelector(".all-tasks");
const complete = document.querySelector(".complete");
const incomplete = document.querySelector(".incomplete");
// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    const {
      data: { tasks },
    } = await axios.get("/api/v1/tasks");
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task;
        return `<div class="single-task ${completed && "task-completed"}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">



<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
</button>
</div>
</div>`;
      })
      .join("");
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};

// showTasks()

const completedTasks = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    const {
      data: { tasks },
    } = await axios.get("/api/v1/tasks");
    const allTasks = tasks.map((task) => {
      if (task.completed) {
        return `<div class="single-task ${task.completed && "task-completed"}">
<h5><span><i class="far fa-check-circle"></i></span>${task.name}</h5>
<div class="task-links">



<!-- edit link -->
<a href="task.html?id=${task.taskID}"  class="edit-link">
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${task.taskID}">
</button>
</div>
</div>`;
      }
    }).join('');
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};

const incompleteTasks = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    const {
      data: { tasks },
    } = await axios.get("/api/v1/tasks");
    const allTasks = tasks.map((task) => {
      if (!task.completed) {
        return `<div class="single-task ${task.completed && "task-completed"}">
<h5><span><i class="far fa-check-circle"></i></span>${task.name}</h5>
<div class="task-links">



<!-- edit link -->
<a href="task.html?id=${task.taskID}"  class="edit-link">
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${task.taskID}">
</button>
</div>
</div>`;
      }
    }).join('');
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};

// delete task /api/tasks/:id

tasksDOM.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = el.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});

// form

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;

  try {
    await axios.post("/api/v1/tasks", { name });
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});

//Display

all.addEventListener("click", () => {
  showTasks();
});

complete.addEventListener('click', () => {
  completedTasks()
})

incomplete.addEventListener('click', () => {
  incompleteTasks()
})



// Deleted Icons
{/* <i class="fas fa-edit"></i> */}
{/* <i class="fas fa-trash"></i> */}