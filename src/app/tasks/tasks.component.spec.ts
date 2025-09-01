import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../core/services/task.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core'; 
import 'zone.js/testing'; 

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let mockTaskService: any; 
  let mockMatDialog: any;

  beforeEach(fakeAsync(async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', avatarUrl: '', email: 'john@example.com', active: true },
      { id: '2', name: 'Jane Smith', avatarUrl: '', email: 'jane@example.com', active: true }
    ];
    const mockTasks = [
      {
        uid: 'T-1', title: 'Task 1', description: 'Desc 1', status: 'TODO', priority: 'High',
        dueDate: '2024-12-01', tags: [], createdAt: '2024-01-01', updatedAt: '2024-01-01', assignee: mockUsers[0]
      },
      {
        uid: 'T-2', title: 'Task 2', description: 'Desc 2', status: 'DONE', priority: 'Low',
        dueDate: '2024-12-02', tags: ['feature'], createdAt: '2024-01-01', updatedAt: '2024-01-01', assignee: mockUsers[1]
      }
    ];

    mockTaskService = jasmine.createSpyObj('TaskService', [
      'addTask',
      'updateTask',
      'deleteTask',
    ]);

    mockTaskService.addTask.and.returnValue(of(undefined));
    mockTaskService.updateTask.and.returnValue(of(undefined));
    mockTaskService.deleteTask.and.returnValue(of(undefined));

    mockTaskService.tasks = signal({
        tasks: mockTasks,
        users: mockUsers,
        priorities: ['High', 'Medium', 'Low'],
        statuses: ['TODO', 'IN_PROGRESS', 'DONE']
      }).asReadonly(),

    mockMatDialog = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(null)
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        TasksComponent,
        BrowserAnimationsModule,
        MatDialogModule, 
        ReactiveFormsModule
      ],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
   
    fixture.detectChanges();
    tick(); 
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize paginator and sort after view init', () => {
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toEqual(component.paginator);
    expect(component.dataSource.sort).toEqual(component.sort);
  });

  it('should apply filter and go to first page', () => {
    const text = 'test';
    const status = 'TODO';
    const filterValue = JSON.stringify({ text, status });

    component.dataSource.paginator = jasmine.createSpyObj('MatPaginator', ['firstPage']);
    component.applyFilter(text, status);

    expect(component.dataSource.filter).toEqual(filterValue);
    expect(component.dataSource.paginator?.firstPage).toHaveBeenCalled();
  });

  it('should delete a task', () => {
    const taskToDelete = {
      uid: '123',
      title: 'Task to Delete',
      description: 'Delete Description',
      status: 'DONE',
      priority: 'Low',
      dueDate: '2024-10-15',
      tags: [],
      createdAt: '2022-05-01',
      updatedAt: '2022-05-01',
      assignee: null
    };
    component.deleteTask(taskToDelete);
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(taskToDelete.uid);
  });
});
