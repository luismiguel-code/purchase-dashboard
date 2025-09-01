import { AfterViewInit, Component, ViewChild, signal, computed, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../core/services/task.service';
import { Task } from '../core/data/models';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TaskFormComponent } from './task-form/task-form.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['uid', 'title', 'status', 'priority', 'dueDate', 'assignee', 'tags', 'actions'];
  dataSource = new MatTableDataSource<Task>([]);
  statuses = computed(() => [...new Set(this.taskService.tasks().tasks.map(task => task.status))]);
  users = computed(() => this.taskService.tasks().users.filter(user => user.active !== false));
  priorities = computed(() => [...new Set(this.taskService.tasks().tasks.map(task => task.priority))]);

  filterControl = new FormControl('');
  statusFilterControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private ngUnsubscribe = new Subject<void>();

  constructor(private taskService: TaskService, public dialog: MatDialog) {
    effect(() => {
      this.dataSource.data = this.taskService.tasks().tasks;
    });

    this.filterControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(value => {
      this.applyFilter(value || '', this.statusFilterControl.value || '');
    });

    this.statusFilterControl.valueChanges.subscribe(value => {
      this.applyFilter(this.filterControl.value || '', value || '');
      takeUntil(this.ngUnsubscribe)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: Task, filter: string) => {
      const searchTerms = JSON.parse(filter);
      const matchesFilter = (data.title.toLowerCase().includes(searchTerms.text.toLowerCase()) ||
        (data.assignee?.name ? data.assignee.name.toLowerCase().includes(searchTerms.text.toLowerCase()) : false));
      const matchesStatus = searchTerms.status ? data.status === searchTerms.status : true;
      return matchesFilter && matchesStatus;
    };
  }

  applyFilter(text: string, status: string) {
    const filterValue = JSON.stringify({ text, status });
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openTaskForm(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: { task, users: this.users(), statuses: this.statuses(), priorities: this.priorities() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed with result:', result);
        if (result.uid) {
          this.taskService.updateTask(result);
        } else {
          this.taskService.addTask(result);
        }
      }
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.uid);
  }
}
