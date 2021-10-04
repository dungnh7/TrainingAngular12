import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskinprogressComponent } from './taskinprogress.component';

describe('TaskinprogressComponent', () => {
  let component: TaskinprogressComponent;
  let fixture: ComponentFixture<TaskinprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskinprogressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskinprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
