import { Injectable, signal } from '@angular/core';
import { Task, User } from '../data/models';
import tasksData from '../data/tasks.mock.json';

interface PurchaseDashboardData {
  users: User[];
  tasks: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private data = signal<PurchaseDashboardData>(tasksData as PurchaseDashboardData);
  tasks = this.data.asReadonly();

  constructor() { }

  addTask(newTask: Task): void {
    this.data.update(currentData => ({
      ...currentData,
      tasks: [...currentData.tasks, { ...newTask, uid: `T-${currentData.tasks.length + 1001}` }]
    }));
  }

  updateTask(updatedTask: Task): void {
    this.data.update(currentData => ({
      ...currentData,
      tasks: currentData.tasks.map(task =>
        task.uid === updatedTask.uid ? updatedTask : task
      )
    }));
  }

  deleteTask(taskUid: string): void {
    this.data.update(currentData => ({
      ...currentData,
      tasks: currentData.tasks.filter(task => task.uid !== taskUid)
    }));
  }
}
