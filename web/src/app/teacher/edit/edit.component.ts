import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../entity/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../service/common.service';
import {Assert} from '@yunzhi/utils/build/src';
import {UserAsyncValidators} from '../add/user-async-validators';
import {UsernameValidator} from '../add/username-validator';
import {TeacherService} from '../../../service/teacher.service';
import {Teacher} from '../../../entity/teacher';


/**
 * 用户管理编辑
 * author: liMingAo
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private teacherService: TeacherService,
              private commonService: CommonService,
              private userAsyncValidators: UserAsyncValidators) {
  }

  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    name: 'name',
    username: 'username',
    email: 'email',
  };
  teacher = {} as Teacher;

  loadById(id: number): void {
    this.teacherService.getById(id)
      .subscribe((teacher: Teacher) => {
        this.setteacher(teacher);
      }, (error: any) => console.log(error));
  }

  setteacher(teacher: Teacher): void {
    this.teacher = teacher;

    this.formGroup.get(this.formKeys.name).setValue(teacher.user.name);
    this.formGroup.get(this.formKeys.username).setValue(teacher.user.username);
    this.formGroup.get(this.formKeys.email).setValue(teacher.user.email);
  }

  initFormControl(): void {
    const formControlUsername = new FormControl('',
      [Validators.required, UsernameValidator.username], this.userAsyncValidators.userNotExist());
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.username, formControlUsername);
    this.formGroup.addControl(this.formKeys.email, new FormControl('', Validators.email));
  }

  ngOnInit(): void {
    this.initFormControl();
    // 检测用户名变化，判断是否改变
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  onSubmit(formGroup: FormGroup): void {
    const id = this.teacher.id;
    const user = {
      id: this.teacher.user.id,
      name: formGroup.get(this.formKeys.name).value as string,
      username: formGroup.get(this.formKeys.username).value as string,
      email: formGroup.get(this.formKeys.email).value as string,
      role: 1
    } as User;
    const teacher = {
      id: this.teacher.id,
      user: user
    } as Teacher;
    this.teacherService.update(id, teacher)
      .subscribe(() => {
        this.commonService.success(() => this.commonService.back());
      }, (error) => {
        this.commonService.error(() => {
        }, error);
      });
  }
}
