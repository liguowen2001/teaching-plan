import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Select2} from '../../share/select2/select2';
import {KlassService} from '../../../service/klass.service';

@Component({
  selector: 'app-klass-select',
  templateUrl: './klass-select.component.html',
  styleUrls: ['./klass-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return KlassSelectComponent;
      })
    }
  ]
})
export class KlassSelectComponent implements OnInit, ControlValueAccessor {
  formControl = new FormControl();

  klasses = [] as Select2<number, string>[];

  constructor(private klassService: KlassService) {
  }

  ngOnInit(): void {
    this.klassService.getAll()
      .subscribe(majors => {
        this.klasses = majors.map(major => new Select2<number, string>(
          {
            id: major.id,
            option: major.name,
            label: major.name
          }
        ));
      });
  }

  registerOnChange(fn: any): void {
    this.formControl.valueChanges
      .subscribe(klassId => fn(klassId));
  }

  registerOnTouched(fn: any): void {

  }

  writeValue(obj: number): void {
    this.formControl.setValue(obj);
  }

}
