import {Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {KlassService} from '../../../service/klass.service';
import {CommonService} from '../../../service/common.service';
import {Klass} from '../../../entity/Klass';
import {Major} from '../../../entity/major';


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
    majorId: 'majorId'
  };

  formGroup = new FormGroup({});
  console = console;

  constructor(private klassService: KlassService,
              private commonService: CommonService,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.inItFormControl();
  }

  /**
   * 初始化formGroup
   */
  inItFormControl() {

    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.majorId, new FormControl('', Validators.required));

  }

  /**
   * 点击保存
   * @param formGroup
   */
  onSubmit(formGroup: FormGroup): void {
    const newKlass = new Klass({
      name: formGroup.get('name').value,
      major: {
        id: formGroup.get(this.formKeys.majorId).value
      } as Major
    });
    // 调用save方法
    console.log(newKlass);
    this.klassService.save(newKlass)
      .subscribe(() => {
        this.commonService.success(() => {
          this.commonService.back();
        });
      } , ()=> {
        this.commonService.error(()=>{},'保存失败',"保存失败")
      });
  }

}
