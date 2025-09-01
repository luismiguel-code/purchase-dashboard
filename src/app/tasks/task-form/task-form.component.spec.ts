import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Task, User } from '../../core/data/models';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let dialogRefMock: any;
  let fb: FormBuilder;

  const mockUsers: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', avatarUrl: '' }
  ];
  const mockStatuses: string[] = ['To Do', 'In Progress', 'Done'];
  const mockPriorities: string[] = ['Low', 'Medium', 'High'];

  beforeEach(async () => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, MatDialogModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { task: null, users: mockUsers, statuses: mockStatuses, priorities: mockPriorities } }
      ]
    })
    .compileComponents();

    fb = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values if no data is provided', () => {
    expect(component.taskForm).toBeDefined();
    expect(component.taskForm.value).toEqual({
      uid: '',
      title: '',
      description: '',
      dueDate: '',
      priority: '',
      status: '',
      assignee: null,
      tags: []
    });
  });

  it('should initialize the form with provided data if available', async () => {
    const testData: Task = {
      uid: 'test-uid-1',
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: '2023-12-31T00:00:00.000Z',
      priority: 'High',
      status: 'To Do',
      assignee: { id: '1', name: 'John Doe', email: 'john.doe@example.com', avatarUrl: '' },
      tags: ['tag1', 'tag2'],
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    TestBed.resetTestingModule();

    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, MatDialogModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { task: testData, users: mockUsers, statuses: mockStatuses, priorities: mockPriorities } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.taskForm.value.uid).toEqual(testData.uid);
    expect(component.taskForm.value.title).toEqual(testData.title);
    expect(component.taskForm.value.description).toEqual(testData.description);
    expect(component.taskForm.value.dueDate.toISOString()).toEqual(testData.dueDate); 
    expect(component.taskForm.value.priority).toEqual(testData.priority);
    expect(component.taskForm.value.status).toEqual(testData.status);
    expect(component.taskForm.value.assignee).toEqual(testData.assignee?.id);
    expect(component.taskForm.value.tags).toEqual(testData.tags);
  });

  it('should call dialogRef.close with the form value when onSave is called and form is valid', () => {
    component.taskForm.setValue({
      uid: 'test-uid-2',
      title: 'Test Task Updated',
      description: 'Updated Description',
      dueDate: new Date('2023-12-31'),
      priority: 'High',
      status: 'In Progress',
      assignee: '1',
      tags: ['tag1']
    });
    component.onSave();
    expect(dialogRefMock.close).toHaveBeenCalledWith({
      uid: 'test-uid-2',
      title: 'Test Task Updated',
      description: 'Updated Description',
      dueDate: new Date('2023-12-31').toISOString(),
      priority: 'High',
      status: 'In Progress',
      assignee: { id: '1', name: 'John Doe', email: 'john.doe@example.com', avatarUrl: '' },
      tags: ['tag1'],
    });
  });

  it('should not call dialogRef.close when onSave is called and form is invalid', () => {
    component.taskForm.setValue({
      uid: '',
      title: null,
      description: null,
      dueDate: null,
      priority: null,
      status: '',
      assignee: null,
      tags: []
    });
    component.onSave();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should call dialogRef.close when onCancel is called', () => {
    component.onCancel();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});

