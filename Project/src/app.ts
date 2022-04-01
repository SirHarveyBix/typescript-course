/// <reference path='drag-drop-interface.ts' />
/// <reference path='project-model.ts' />

namespace App {
  // Project state Management
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFunction: Listener<T>) {
      this.listeners.push(listenerFunction);
    }
  }

  class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );

      this.projects.push(newProject);
      for (const listenerFunction of this.listeners) {
        listenerFunction(this.projects.slice());
      }
    }
    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((item) => item.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const listenerFunction of this.listeners) {
        listenerFunction(this.projects.slice());
      }
    }
  }

  const projectState = ProjectState.getInstance();

  // Validation
  interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  const validate = (validatableInput: Validatable) => {
    let isValid = true;
    if (validatableInput.required) {
      isValid =
        isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (
      validatableInput.minLength != null &&
      typeof validatableInput.value === 'string'
    ) {
      isValid =
        isValid && validatableInput.value.length >= validatableInput.minLength!;
    }
    if (
      validatableInput.maxLength != null &&
      typeof validatableInput.value === 'string'
    ) {
      isValid =
        isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (
      validatableInput.min != null &&
      typeof validatableInput.value === 'number'
    ) {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (
      validatableInput.max != null &&
      typeof validatableInput.value === 'number'
    ) {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
  };

  //autobind decorator
  const autobind = (
    _target: any,
    _methodName: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFunction = originalMethod.bind(this);
        return boundFunction;
      },
    };
    return adjustedDescriptor;
  };

  // Component Base Class
  abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = <HTMLTemplateElement>(
        document.getElementById(templateId)!
      );
      this.hostElement = <T>document.getElementById(hostElementId)!;

      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = <U>importedNode.firstElementChild;
      if (newElementId) this.element.id = newElementId;

      this.attach(insertAtStart);
    }
    private attach(insertAtBeginning: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtBeginning ? 'afterbegin' : 'beforeend',
        this.element
      );
    }

    abstract configure?(): void;
    abstract renderContent(): void;
  }
  //Project Item Class
  class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    get persons() {
      if (this.project.people === 1) return '1 person';
      else return `${this.project.people} persons`;
    }

    constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    @autobind dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_event: DragEvent): void {
      console.log('dragend');
    }

    configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector('h3')!.textContent =
        this.persons + ' assigned';
      this.element.querySelector('p')!.textContent = this.project.description;
    }
  }

  // ProjectList Class
  class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);

      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    @autobind dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.add('droppable');
      }
    }

    @autobind dropHandler(event: DragEvent): void {
      const projectId = event.dataTransfer!.getData('text/plain');
      projectState.moveProject(
        projectId,
        this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    @autobind dragLeaveHandler(_event: DragEvent): void {
      const listElement = this.element.querySelector('ul')!;
      listElement.classList.remove('droppable');
    }

    configure() {
      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHandler);
      this.element.addEventListener('drop', this.dropHandler);

      projectState.addListener((projects: Project[]) => {
        const releventProject = projects.filter((project) => {
          if (this.type === 'active') {
            return project.status === ProjectStatus.Active;
          }
          return project.status === ProjectStatus.Finished;
        });
        this.assignedProjects = releventProject;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent =
        this.type.toLocaleUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
      const listElement = <HTMLUListElement>(
        document.getElementById(`${this.type}-projects-list`)!
      );
      listElement.innerHTML = '';
      for (const projectItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
      }
    }
  }

  //projectInput Class
  class Projectinput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super('project-input', 'app', true, 'user-input');

      this.titleInputElement = <HTMLInputElement>(
        this.element.querySelector('#title')
      );
      this.descriptionInputElement = <HTMLInputElement>(
        this.element.querySelector('#description')
      );
      this.peopleInputElement = <HTMLInputElement>(
        this.element.querySelector('#people')
      );

      this.configure();
    }

    configure() {
      this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
      };
      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
      const peopleValidatable: Validatable = {
        value: Number(enteredPeople),
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert('Invalid Input, Try again.');
        return;
      } else {
        return [enteredTitle, enteredDescription, Number(enteredPeople)];
      }
    }

    private clearInputs() {
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
      this.peopleInputElement.value = '';
    }

    @autobind private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);

        this.clearInputs();
      }
    }
  }

  new Projectinput();
  new ProjectList('active');
  new ProjectList('finished');
}
