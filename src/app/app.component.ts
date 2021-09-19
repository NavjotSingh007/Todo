import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddTaskAPIResponse } from './models/add-task-api.model';
import { DeleteTaskApiResponse } from './models/delete-task-api.model';
import { GetTasksAPiResponse } from './models/get-tasks-api.model';
import { Task } from './models/task.model';
import { UpdateTaskAPiResponse } from './models/update-task-api.model';
import { TaskService } from './services/task.service';
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  title = 'todo';

  searchTaskText: string = '';

  tasks: Task[] = [];

  editTaskFG = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    isCompleted: this.fb.control(false),
    id: this.fb.control('', [Validators.required]),
  });
  addTaskFG = this.fb.group({
    name: this.fb.control('', [Validators.required]),
  });

  async ngOnInit() {
    let getTasksAPiResponse: GetTasksAPiResponse = await this.taskService
      .getTasks()
      .toPromise();
    if (getTasksAPiResponse.operation == 'FAILED') {
      alert(getTasksAPiResponse.message);
    }
    this.tasks = getTasksAPiResponse.data;
  }

  addTaskButtonClicked() {
    this.addTaskFG.reset();
    $('#addTaskModal').modal('show');
  }

  async addTask() {
    if (this.doesTaskAlreadyExist(this.addTaskFG.value?.name)) {
      alert('Task Already Exist');
      return;
    }

    let addTaskAPiResponse: AddTaskAPIResponse = await this.taskService
      .addTask({
        name: this.addTaskFG.value?.name,
        isCompleted: false,
      })
      .toPromise();

    if (addTaskAPiResponse.operation == 'FAILED') {
      alert(addTaskAPiResponse.message);
      return;
    }

    this.tasks.push(addTaskAPiResponse.data);

    $('#addTaskModal').modal('hide');
  }

  async deleteTask(id: string) {
    let apiResponse: DeleteTaskApiResponse = await this.taskService
      .deleteTask(id)
      .toPromise();

    if (apiResponse.operation == 'FAILED') {
      alert(apiResponse.message);
      return;
    }

    for (let index = 0; index < this.tasks.length; index++) {
      const task = this.tasks[index];
      if (task.id == id) {
        this.tasks.splice(index, 1);
        this.tasks = JSON.parse(JSON.stringify(this.tasks));
      }
    }
  }

  async editTask(id: any) {
    let apiResponse: UpdateTaskAPiResponse = await this.taskService
      .updateTask(this.editTaskFG.value)
      .toPromise();

    if (apiResponse.operation == 'FAILED') {
      alert(apiResponse.message);
      return;
    }

    for (let taskIndex = 0; taskIndex < this.tasks.length; taskIndex++) {
      const task = this.tasks[taskIndex];
      if (task.id == id) {
        this.tasks[taskIndex] = this.editTaskFG.value;
        this.tasks = JSON.parse(JSON.stringify(this.tasks));
        break;
      }
    }

    $('#editTaskModal').modal('hide');
  }

  doesTaskAlreadyExist(taskToCheck: string): boolean {
    for (const task of this.tasks) {
      if (task.name.toLowerCase() == taskToCheck.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  editButtonCLicked(id: string) {
    let task: Task = null as any;
    for (const taskToCheck of this.tasks) {
      if (taskToCheck.id == id) {
        task = taskToCheck;
        break;
      }
    }

    this.editTaskFG.patchValue({
      name: task.name,
      isCompleted: task.isCompleted,
      id: task.id,
    });
    $('#editTaskModal').attr('data-id', task.id);
    $('#editTaskModal').modal('show');
  }
}
