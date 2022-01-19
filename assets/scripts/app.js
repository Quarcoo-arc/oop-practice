class Tooltip {}

class ProjectItem {
  constructor(id) {
    const card = document.getElementById(`p${id}`);
  }
}

class ProjectList {
  constructor(type) {
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    console.log(projectItems);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
  }
}

App.init();
