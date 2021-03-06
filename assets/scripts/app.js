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
    //Scroll to view last element added
    element.scrollIntoView({ behavior: "smooth" });
  }
}

class Tooltip {
  show(element) {
    this.element = element;
    const info = this.element.dataset.extraInfo;
    const moreInfoEl = document.createElement("p");
    moreInfoEl.innerText = info;
    this.element
      .querySelector("p")
      .insertAdjacentElement("afterend", moreInfoEl);

    const moreInfoBtn = this.element.querySelector("button:first-of-type");
    moreInfoBtn.innerText = "Less Info";
  }

  hide(element) {
    const moreInfoEl = element.querySelector("p:last-of-type");
    moreInfoEl.remove();
    const moreInfoBtn = element.querySelector("button:first-of-type");
    moreInfoBtn.innerText = "More Info";
  }
}

class ProjectItem {
  constructor(id, updateProjectLists, type) {
    this.type = type;
    this.id = id;
    this.show = true;
    this.updateProjectLists = updateProjectLists;
    this.projectItemEl = document.getElementById(this.id);
    this.connectMoreInfoButton();
    this.connectSwitchButton(this.type);
    this.connectDrag.call(this);
  }

  showMoreInfoHandler(element) {
    const toolTip = new Tooltip();

    const moreInfoBtn = element.querySelector("button:first-of-type");

    moreInfoBtn.innerText === "More Info"
      ? toolTip.show(element)
      : toolTip.hide(element);
  }

  //drag function
  connectDrag() {
    this.projectItemEl.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.id);
      event.dataTransfer.effectAllowed = "move";
      console.log("dragging");
    });
  }

  connectMoreInfoButton() {
    const moreInfoBtn = this.projectItemEl.querySelector(
      "button:first-of-type"
    );
    moreInfoBtn.addEventListener(
      "click",
      this.showMoreInfoHandler.bind(null, this.projectItemEl)
    );
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

    this.connectDroppable();
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);

    list.addEventListener("dragenter", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        list.parentElement.classList.add("droppable");
        event.preventDefault();
      }
    });

    list.addEventListener("dragover", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
      }
    });

    list.addEventListener("dragleave", (event) => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove("droppable");
      }
    });

    list.addEventListener("drop", (event) => {
      const projectId = event.dataTransfer.getData("text/plain");
      if (this.projects.find((p) => p.id === projectId)) {
        return;
      }
      document
        .getElementById(projectId)
        .querySelector("button:last-of-type")
        .click();
      list.parentElement.classList.remove("droppable");
    });
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
