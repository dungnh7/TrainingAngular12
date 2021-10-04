import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewtaskComponent } from './view-newtask.component';

describe('ViewNewtaskComponent', () => {
  let component: ViewNewtaskComponent;
  let fixture: ComponentFixture<ViewNewtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNewtaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
