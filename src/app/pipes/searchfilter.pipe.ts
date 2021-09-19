import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'searchfilter',
})
export class SearchfilterPipe implements PipeTransform {
  transform(value: Task[], ...args: unknown[]): Task[] {
    console.log('search filter pipe called');

    let filterText: string = args[0] as string;
    let filteredItems: Task[] = [];

    if (!filterText) {
      return value;
    }

    for (const task of value) {
      if (task.name.toLowerCase().indexOf(filterText) != -1) {
        filteredItems.push(task);
      }
    }
    return filteredItems;
  }
}
