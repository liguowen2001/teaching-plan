import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorSelectComponent } from './major-select.component';

describe('MajorSelectComponent', () => {
  let component: MajorSelectComponent;
  let fixture: ComponentFixture<MajorSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
