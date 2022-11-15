import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlassCheckboxComponent } from './klass-checkbox.component';

describe('KlassCheckboxComponent', () => {
  let component: KlassCheckboxComponent;
  let fixture: ComponentFixture<KlassCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlassCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
