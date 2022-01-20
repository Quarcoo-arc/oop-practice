class DOMNavigator {
  static clearEventListeners(element) {
    const clonedEl = element.cloneNode(true);
    element.replaceWith(clonedEl);
    return clonedEl;
  }

  static moveElement(elementId, destinationSelector) {
    const element = document.getElementById(elementId);
    const destinationEl = document.querySelector(destinationSelector);
    destinationEl.append(element);
  }
}

class Tooltip {}

class ProjectItem {
  constructor(id, updateProjectLists, type) {
    this.type = type;
    this.id = id;
    this.updateProjectLists = updateProjectLists;
    this.projectItemEl = document.getElementById(this.id);
    this.connectMoreInfoButton();
    this.connectSwitchButton(this.type);
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

  connectSwitchButton(type) {
    let switchBtn = this.projectItemEl.querySelector("button:last-of-type");
    switchBtn = DOMNavigator.clearEventListeners(switchBtn);
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
    switchBtn.addEventListener(
      "click",
      this.updateProjectLists.bind(null, this.id)
    );
  }

  update(updateProjectListsFunc, type) {
    this.updateProjectLists = updateProjectListsFunc;
    this.connectSwitchButton(type);
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
        new ProjectItem(
          projectItem.id,
          this.switchProjectLists.bind(this),
          this.type
        )
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
    DOMNavigator.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProjectLists.bind(this), this.type);
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
