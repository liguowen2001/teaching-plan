import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CommonService} from '../../../service/common.service';
import {CourseService} from '../../../service/course.service';
import {Course} from '../../../entity/course';
import {Semester} from '../../../entity/semester';
import {TeachingPlan} from '../../../entity/teaching-plan';
import {Teacher} from '../../../entity/teacher';
import {TeachingPlanService} from '../../../service/teaching-plan.service';


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
    semester: 'semester',
    courseCredit: 'courseCredit',
    experimentalCredit: 'experimentalCredit',
    examinationMethod: 'examinationMethod',
    teachers: 'teachers'
  };

  formGroup = new FormGroup({});

  teachers = [] as number[];

  constructor(private courseService: CourseService,
              private commonService: CommonService,
              private teachingPlanService: TeachingPlanService
  ) {
  }

  ngOnInit(): void {
    this.inItFormControl();
  }

  /**
   * 初始化formGroup
   */
  inItFormControl() {

    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.semester, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.courseCredit, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.experimentalCredit, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.examinationMethod, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.teachers, new FormControl([] as number[], Validators.required));

  }

  /**
   * 点击保存
   * @param formGroup
   */
  onSubmit(formGroup: FormGroup): void {
    const newCourse = new Course({
      name: formGroup.get(this.formKeys.name).value,
      semester: {
        id: formGroup.get(this.formKeys.semester).value
      } as Semester,
      experimentalCredit: formGroup.get(this.formKeys.experimentalCredit).value,
      examinationMethod: formGroup.get(this.formKeys.examinationMethod).value,
      courseCredit: formGroup.get(this.formKeys.courseCredit).value
    });
    // 调用save方法
    this.courseService.save(newCourse)
      .subscribe(courseId => {
        this.saveTeachingPlan(courseId, this.teachingPlanService);
        this.commonService.success(() => {
          this.commonService.back();
        });
      }, () => {
        this.commonService.error(() => {
        }, '保存失败', '保存失败');
      });
  }

  saveTeachingPlan(courseId: number, teachingPlanService: TeachingPlanService): void {
    this.teachers = this.formGroup.get(this.formKeys.teachers).value;
    let teacherPlan = new TeachingPlan();
    this.teachers.forEach(function (teacherId) {
      teacherPlan = {
        course: {
          id: courseId
        },
        teacher: {
          id: teacherId
        } as Teacher
      } as TeachingPlan;
      teachingPlanService.save(teacherPlan)
        .subscribe(value => {
          console.log(value);
        });
    });
  }


}
