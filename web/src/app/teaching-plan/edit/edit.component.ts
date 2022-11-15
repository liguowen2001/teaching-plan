import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../../service/course.service';
import {Course} from '../../../entity/course';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/utils/build/src';
import {Semester} from '../../../entity/semester';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private courseService: CourseService,
              private commonService: CommonService,) {
  }

  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    id: 'id',
    name: 'name',
    semester: 'semester',
    courseCredit: 'courseCredit',
    experimentalCredit: 'experimentalCredit',
    examinationMethod: 'examinationMethod'
  };
  course = {} as Course;

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.id, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.semester, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.courseCredit, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.experimentalCredit, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.examinationMethod, new FormControl('', Validators.required));

    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  loadById(id: number): void {
    this.formGroup.get('id')?.setValue(id);
    this.courseService.getById(id)
      .subscribe((course) => {
        Assert.isNotNullOrUndefined(course, course.name, 'some properties must be passed');
        this.formGroup.get(this.formKeys.name).setValue(course.name);
        this.formGroup.get(this.formKeys.semester).setValue(course.semester.id);
        this.formGroup.get(this.formKeys.examinationMethod).setValue(course.examinationMethod);
        this.formGroup.get(this.formKeys.experimentalCredit).setValue(course.experimentalCredit);
        this.formGroup.get(this.formKeys.courseCredit).setValue(course.courseCredit);

      }, error => console.log(error));
  }

  onSubmit(formGroup: FormGroup): void {
    const id = this.formGroup.get('id').value;
    const newCourse = new Course({
      id: formGroup.get('id').value,
      name: formGroup.get('name').value,
      semester: {
        id: formGroup.get(this.formKeys.semester).value
      } as Semester,
      experimentalCredit: formGroup.get(this.formKeys.experimentalCredit).value,
      examinationMethod: formGroup.get(this.formKeys.examinationMethod).value,
      courseCredit: formGroup.get(this.formKeys.courseCredit).value
    });

    this.courseService.update(id, newCourse)
      .subscribe(() => {
          this.commonService.success(() => this.commonService.back());
        },
        error => {
          this.commonService.error();
        });
  }
}
