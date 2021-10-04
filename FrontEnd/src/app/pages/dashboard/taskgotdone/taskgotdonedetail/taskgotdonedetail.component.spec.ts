import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskgotdonedetailComponent } from './taskgotdonedetail.component';

describe('TaskgotdonedetailComponent', () => {
  let component: TaskgotdonedetailComponent;
  let fixture: ComponentFixture<TaskgotdonedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskgotdonedetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskgotdonedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
