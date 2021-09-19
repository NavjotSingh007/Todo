import { APiResponse } from './apiresponse.model';
import { Task } from './task.model';

export interface AddTaskAPIResponse extends APiResponse {
  data: Task;
}

export interface AddTaskAPiReqPayload {
  name: string;
  isCompleted: boolean;
}
