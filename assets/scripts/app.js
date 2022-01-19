class Tooltip {}

class ProjectItem {
  constructor(id) {
    this.id = id;
    this.projectItemEl = document.getElementById(this.id);
    this.connectSwitchButton();
  }

  connectMoreInfoButton() {
    const moreInfoBtn = this.projectItemEl.querySelector(
      "button:first-of-type"
    );
  }

  connectSwitchButton() {
    const switchBtn = this.projectItemEl.querySelector("button:last-of-type");
    switchBtn.addEventListener("click", () => {
      switchBtn.textContent === "Activate"
        ? (switchBtn.textContent = "Finish")
        : (switchBtn.textContent = "Activate");
    });
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projectItem of projectItems) {
      this.projects.push(new ProjectItem(projectItem.id));
    }
    console.log(this.projects);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
  }
}

App.init();
