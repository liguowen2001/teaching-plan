import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MajorService} from '../../../service/major.service';
import {Select2} from '../../share/select2/select2';


@Component({
  selector: 'app-major-select',
  templateUrl: './major-select.component.html',
  styleUrls: ['./major-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return MajorSelectComponent;
      })
    }
  ]
})
export class MajorSelectComponent implements OnInit, ControlValueAccessor {

  formControl = new FormControl();

  majors = [] as Select2<number, string>[];

  constructor(private majorService: MajorService) {
  }


  ngOnInit(): void {
    this.majorService.getAll()
      .subscribe(majors => {
        this.majors = majors.map(major => new Select2<number, string>(
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
      .subscribe(majorId => fn(majorId));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.formControl.setValue(obj);
  }

}
