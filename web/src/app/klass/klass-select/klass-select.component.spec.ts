import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlassSelectComponent } from './klass-select.component';

describe('KlassSelectComponent', () => {
  let component: KlassSelectComponent;
  let fixture: ComponentFixture<KlassSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlassSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
