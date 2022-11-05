import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Select2} from '../../share/select2/select2';
import {SemesterService} from '../../../service/semester.service';

/**
 * 学期选择组件
 */
@Component({
  selector: 'app-semester-select',
  templateUrl: './semester-select.component.html',
  styleUrls: ['./semester-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return SemesterSelectComponent;
      })
    }
  ]
})
export class SemesterSelectComponent implements OnInit, ControlValueAccessor {

  formControl = new FormControl();

  semesters = [] as Select2<number, string>[];

  constructor(private semesterService: SemesterService) {
  }

  ngOnInit(): void {
    this.semesterService.getAll()
      .subscribe(majors => {
        this.semesters = majors.map(major => new Select2<number, string>(
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
      .subscribe(semesterId => fn(semesterId));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.formControl.setValue(obj);
  }

}
