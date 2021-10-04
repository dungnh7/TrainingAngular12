import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewtaskComponent } from './add-newtask.component';

describe('AddNewtaskComponent', () => {
  let component: AddNewtaskComponent;
  let fixture: ComponentFixture<AddNewtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewtaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
