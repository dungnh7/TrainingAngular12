import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserscheduleComponent } from './userschedule.component';

describe('UserscheduleComponent', () => {
  let component: UserscheduleComponent;
  let fixture: ComponentFixture<UserscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserscheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
