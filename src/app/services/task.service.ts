import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddTaskAPiReqPayload,
  AddTaskAPIResponse,
} from '../models/add-task-api.model';
import { DeleteTaskApiResponse } from '../models/delete-task-api.model';
import { GetTasksAPiResponse } from '../models/get-tasks-api.model';
import { Task } from '../models/task.model';
import { UpdateTaskAPiResponse } from '../models/update-task-api.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly baseUrl: string = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<GetTasksAPiResponse> {
    return this.http.get(
      `${this.baseUrl}/tasks`
    ) as Observable<GetTasksAPiResponse>;
  }

  deleteTask(taskId: string): Observable<DeleteTaskApiResponse> {
    return this.http.delete(
      `${this.baseUrl}/tasks/${taskId}`
    ) as Observable<DeleteTaskApiResponse>;
  }

  addTask(task: AddTaskAPiReqPayload): Observable<AddTaskAPIResponse> {
    return this.http.post(
      `${this.baseUrl}/tasks`,
      task
    ) as Observable<AddTaskAPIResponse>;
  }

  updateTask(task: Task): Observable<UpdateTaskAPiResponse> {
    return this.http.put(
      `${this.baseUrl}/tasks`,
      task
    ) as Observable<UpdateTaskAPiResponse>;
  }
}
