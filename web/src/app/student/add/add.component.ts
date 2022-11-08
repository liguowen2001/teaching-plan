import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../entity/user';
import {UsernameValidator} from './username-validator';
import {UserAsyncValidators} from './user-async-validators';
import {Student} from '../../../entity/student';
import {StudentService} from '../../../service/student.service';

/**
 * 用户管理新增
 */

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private commonService: CommonService,
              private userAsyncValidators: UserAsyncValidators) {
  }

  beExit = false;
  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    name: 'name',
    username: 'username',
    email: 'email',
    klass: 'klass'
  };
  user = {} as User;

  initFormControl(): void {
    const formControlUsername = new FormControl('',
      [Validators.required, UsernameValidator.username], this.userAsyncValidators.userNotExist());
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.username, formControlUsername);
    this.formGroup.addControl(this.formKeys.email, new FormControl('', Validators.email));
    this.formGroup.addControl(this.formKeys.klass,new FormControl(''));
  }

  ngOnInit(): void {
    this.initFormControl();
  }

  onSubmit(formGroup: FormGroup): void {
    const user = {
      name: formGroup.get(this.formKeys.name).value as string,
      username: formGroup.get(this.formKeys.username).value as string,
      email: formGroup.get(this.formKeys.email).value as string,
      role: 2,
    } as User;
    const student = {
      user: user,
      klass: {
        id: formGroup.get(this.formKeys.klass).value as number
      }
    } as Student;
    this.studentService.save(student)
      // tslint:disable-next-line:variable-name
      .subscribe(string => {
          this.commonService.success(() => {
            this.commonService.back();
          }, '', '操作成功，密码为' + string)
        }, error => {
          this.commonService.error(() => {
          }, '数据更新失败')
        },
      );
  }

}

