import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewtaskComponent } from './edit-newtask.component';

describe('EditNewtaskComponent', () => {
  let component: EditNewtaskComponent;
  let fixture: ComponentFixture<EditNewtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewtaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
