import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskgotdoneComponent } from './taskgotdone.component';

describe('TaskgotdoneComponent', () => {
  let component: TaskgotdoneComponent;
  let fixture: ComponentFixture<TaskgotdoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskgotdoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskgotdoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
