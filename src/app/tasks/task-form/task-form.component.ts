import { Component, Inject, OnInit, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { Task, User } from '../../core/data/models';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  users = signal<User[]>([]);
  statuses = signal<string[]>([]);
  priorities = signal<string[]>([]);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task | null, users: User[], statuses: string[], priorities: string[] },
  ) {
    this.taskForm = this.fb.group({
      uid: [''],
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
      assignee: [null],
      tags: [[]]
    });

    this.users.set(this.data.users);
    this.statuses.set(this.data.statuses);
    this.priorities.set(this.data.priorities);
  }

  ngOnInit(): void {
    if (this.data.task) {
      this.taskForm.patchValue({
        ...this.data.task,
        assignee: this.data.task.assignee ? this.data.task.assignee.id : null,
        dueDate: new Date(this.data.task.dueDate)
      });
    }
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const assigneeUser = this.users().find(user => user.id === formValue.assignee);
      const taskToSave: Task = {
        ...formValue,
        assignee: assigneeUser || null,
        dueDate: formValue.dueDate.toISOString()
      };
      this.dialogRef.close(taskToSave);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addTag(event: any): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const currentTags = this.taskForm.get('tags')?.value || [];
      this.taskForm.get('tags')?.setValue([...currentTags, value.trim()]);
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const currentTags: string[] = this.taskForm.get('tags')?.value || [];
    const index = currentTags.indexOf(tag);

    if (index >= 0) {
      currentTags.splice(index, 1);
      this.taskForm.get('tags')?.setValue([...currentTags]);
    }
  }
}
