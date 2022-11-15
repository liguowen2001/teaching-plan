import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCheckboxComponent } from './teacher-checkbox.component';

describe('TeacherCheckboxComponent', () => {
  let component: TeacherCheckboxComponent;
  let fixture: ComponentFixture<TeacherCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
