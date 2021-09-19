import { APiResponse } from './apiresponse.model';
import { Task } from './task.model';

export interface GetTasksAPiResponse extends APiResponse {
  data: Task[];
}
