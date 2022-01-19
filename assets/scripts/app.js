class Tooltip {}

class ProjectItem {
  constructor(id) {
    this.id = id;
    this.projectItemEl = document.getElementById(this.id);
    this.connectSwitchButton();
    this.connectMoreInfoButton();
  }

  connectMoreInfoButton() {
    const moreInfoBtn = this.projectItemEl.querySelector(
      "button:first-of-type"
    );
    moreInfoBtn.addEventListener("click", () => {
      const showLessInfo = () => {
        const moreInfoEl = this.projectItemEl.querySelector("p p");
        // console.log(moreInfoEl);
        moreInfoEl.remove();
        moreInfoBtn.textContent = "More Info";
      };

      const showMoreInfo = () => {
        const moreInfo = this.projectItemEl.dataset.extraInfo;
        const moreInfoEl = document.createElement("p");
        moreInfoEl.textContent = moreInfo;
        this.projectItemEl.querySelector("p").append(moreInfoEl);
        moreInfoBtn.textContent = "Less Info";
      };

      moreInfoBtn.textContent === "More Info" ? showMoreInfo() : showLessInfo();
    });
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
