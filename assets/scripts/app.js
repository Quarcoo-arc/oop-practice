class Tooltip {}

class ProjectItem {
  constructor(id, updateProjectLists) {
    this.id = id;
    this.updateProjectLists = updateProjectLists;
    this.projectItemEl = document.getElementById(this.id);
    this.connectMoreInfoButton();
    this.connectSwitchButton();
  }

  connectMoreInfoButton() {
    const moreInfoBtn = this.projectItemEl.querySelector(
      "button:first-of-type"
    );
    moreInfoBtn.addEventListener("click", () => {
      const showLessInfo = () => {
        const moreInfoEl = this.projectItemEl.querySelector("p p");
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
    switchBtn.addEventListener(
      "click",
      this.updateProjectLists.bind(null, this.id)
    );
  }

  // changeProjectList() {
  //   const activeProjectsList = document.querySelector("#active-projects ul");
  //   const finishedProjectsList = document.querySelector(
  //     "#finished-projects ul"
  //   );

  //   const moveToActive = () => {
  //     const projectItem = switchBtn.parentElement;
  //     activeProjectsList.append(projectItem);
  //     switchBtn.textContent = "Finish";
  //   };

  //   const moveToFinished = () => {
  //     const projectItem = switchBtn.parentElement;
  //     finishedProjectsList.append(projectItem);
  //     switchBtn.textContent = "Activate";
  //   };

  //   switchBtn.textContent === "Activate" ? moveToActive() : moveToFinished();
  // }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projectItem of projectItems) {
      this.projects.push(
        new ProjectItem(projectItem.id, this.switchProjectLists.bind(this))
      );
    }
    console.log(this.projects);
  }

  //Sets switchHandler Function
  setSwitchHandler(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addtoProjectList(project) {
    this.projects.push(project);
    console.log(this);
  }

  //Switches between projects, with the help of setSwitchHandler function
  switchProjectLists(projectId) {
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");

    activeProjectsList.setSwitchHandler(
      finishedProjectsList.addtoProjectList.bind(finishedProjectsList)
    );

    finishedProjectsList.setSwitchHandler(
      activeProjectsList.addtoProjectList.bind(activeProjectsList)
    );
  }
}

App.init();
