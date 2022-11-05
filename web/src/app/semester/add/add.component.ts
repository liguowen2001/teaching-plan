import {Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CommonService} from '../../../service/common.service';
import {Semester} from '../../../entity/semester';
import {SemesterService} from '../../../service/semester.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  /**
   * form表单关键字
   */
  formKeys = {
    name: 'name',
    startTime: 'startTime',
    endTime: 'endTime'
  };

  formGroup = new FormGroup({});
  timeTrue: boolean;

  constructor(private semesterService: SemesterService,
              private commonService: CommonService,
              ) {
  }

  ngOnInit(): void {
    this.timeTrue = true;
    this.inItFormControl();
    this.formGroup.valueChanges
      .subscribe(value => {
        let startTime = this.formGroup.get(this.formKeys.startTime).value as number;
        let endTime = this.formGroup.get(this.formKeys.endTime).value as number;
        if (startTime>endTime){
          this.timeTrue = false;
        }else {
          this.timeTrue = true;
        }
      })
  }

  /**
   * 初始化formGroup
   */
  inItFormControl() {

    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.startTime, new FormControl( Validators.required));
    this.formGroup.addControl(this.formKeys.endTime, new FormControl(Validators.required));

  }

  /**
   * 点击保存
   * @param formGroup
   */
  onSubmit(formGroup: FormGroup): void {
    const semester = new Semester({
      name: formGroup.get(this.formKeys.name).value,
      startTime: formGroup.get(this.formKeys.startTime).value as number,
      endTime: formGroup.get(this.formKeys.endTime).value as number
    });
    // 调用save方法
    this.semesterService.save(semester)
      .subscribe(() => {
        this.commonService.success(() => {
          this.commonService.back();
        });
      } , ()=> {
        this.commonService.error(()=>{},'保存失败',"保存失败")
      });
  }

}
