import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../entity/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {CommonService} from '../../../service/common.service';
import {Assert} from '@yunzhi/utils/build/src';
import {UserAsyncValidators} from '../add/user-async-validators';
import {UsernameValidator} from '../add/username-validator';
import {KlassService} from '../../../service/klass.service';
import {Student} from '../../../entity/student';
import {StudentService} from '../../../service/student.service';
import {Klass} from '../../../entity/Klass';


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
              private studentService: StudentService,
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
    klass: 'klass'
  };
  student = {} as Student;

  loadById(id: number): void {
    this.studentService.getById(id)
      .subscribe((student: Student) => {
        this.setStudent(student);
      }, (error: any) => console.log(error));
  }

  setStudent(student: Student): void {
    this.student = student;

    this.formGroup.get(this.formKeys.name).setValue(student.user.name);
    this.formGroup.get(this.formKeys.username).setValue(student.user.username);
    this.formGroup.get(this.formKeys.email).setValue(student.user.email);
    this.formGroup.get(this.formKeys.klass).setValue(student.klass.id);
  }

  initFormControl(): void {
    const formControlUsername = new FormControl('',
      [Validators.required, UsernameValidator.username], this.userAsyncValidators.userNotExist());
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.username, formControlUsername);
    this.formGroup.addControl(this.formKeys.email, new FormControl('', Validators.email));
    this.formGroup.addControl(this.formKeys.klass, new FormControl(''));
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
    const id = this.student.id;
    const user = {
      id: this.student.user.id,
      name: formGroup.get(this.formKeys.name).value as string,
      username: formGroup.get(this.formKeys.username).value as string,
      email: formGroup.get(this.formKeys.email).value as string,
      role: 2
    } as User;
    const student = {
      id: this.student.id,
      user: user,
      klass: {
        id: this.formGroup.get(this.formKeys.klass).value
      } as Klass
    } as Student;
    this.studentService.update(id, student)
      .subscribe(() => {
        this.commonService.success(() => this.commonService.back());
      }, (error) => {
        this.commonService.error(() => {
        }, error);
      });
  }
}
