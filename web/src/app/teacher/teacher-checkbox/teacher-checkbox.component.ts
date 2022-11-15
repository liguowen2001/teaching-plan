import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TeacherService} from '../../../service/teacher.service';
import {Assert} from '@yunzhi/utils';

@Component({
  selector: 'app-teacher-checkbox',
  templateUrl: './teacher-checkbox.component.html',
  styleUrls: ['./teacher-checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => TeacherCheckboxComponent)
    }
  ]
})
export class TeacherCheckboxComponent implements OnInit, ControlValueAccessor {

  @Output()
  doChange = new EventEmitter<number[]>();
  //选择的身份id
  formControl = new FormControl([] as number[]);
  state = {
    list: [] as {id: number, name: string}[]
  };

  constructor(private teacherService: TeacherService) {
  }

  get list(): {id: number, name: string}[] {
    return this.state.list;
  }

  getDefaultChecked(value: number): boolean {
    return this.formControl.value.includes(value);
  }

  /**
   * 获取当前用户可选择的角色
   */
  getRoles(): void {
    this.teacherService.getAll()
      .subscribe(teachers => {
        let list = [] as {id: number, name: string}[];
        teachers.forEach(function (teacher) {
          list.push({
            id: teacher.id,
            name: teacher.user.name
          });
        });
        this.state.list = list;
      });
  }

  ngOnInit(): void {
    this.getRoles();
  }

  onChange(value: number, checked: boolean): void {
    const values = this.formControl.value as number[];
    const index = values.indexOf(value);
    if (checked && (index === -1)) {
      values.push(value);
    } else if (!checked && (index !== -1)) {
      values.splice(index, 1);
    }
    this.doChange.emit(values);
    this.formControl.setValue([...values]);
  }

  registerOnChange(fn: any): void {
    this.formControl.valueChanges.subscribe(data => fn(data));
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  writeValue(obj: number[]): void {
    Assert.isArray(obj, '角色选择组件请保证传入数组');
    this.formControl.setValue(obj);
  }
}
