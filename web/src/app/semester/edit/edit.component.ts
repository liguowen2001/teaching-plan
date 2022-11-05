import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/utils/build/src';
import {SemesterService} from '../../../service/semester.service';
import {Semester} from '../../../entity/semester';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private semesterService: SemesterService,
              private commonService: CommonService,) {
  }

  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    id: 'id',
    name: 'name',
    startTime: 'startTime',
    endTime: 'endTime'
  };
  semester = {} as Semester;

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.id, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.startTime, new FormControl( Validators.required));
    this.formGroup.addControl(this.formKeys.endTime, new FormControl( Validators.required));

    // 获取id并找出对应client
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  loadById(id: number): void {
    this.formGroup.get('id')?.setValue(id);
    this.semesterService.getById(id)
      .subscribe((semester) => {
        Assert.isNotNullOrUndefined(semester, semester.name, semester.startTime,semester.endTime, 'some properties must be passed');
        this.formGroup.get(this.formKeys.name).setValue(semester.name);
        this.formGroup.get(this.formKeys.startTime).setValue(semester.startTime);
        this.formGroup.get(this.formKeys.endTime).setValue(semester.endTime);
      }, error => console.log(error));
  }

  onSubmit(formGroup: FormGroup): void {
    const id = this.formGroup.get('id').value;
    const newSemester = new Semester({
      id: formGroup.get(this.formKeys.id).value,
      name: formGroup.get(this.formKeys.name).value,
      startTime: formGroup.get(this.formKeys.startTime).value,
      endTime: formGroup.get(this.formKeys.endTime).value,

    });

    this.semesterService.update(id, newSemester)
      .subscribe(() => {
          this.commonService.success(() => this.commonService.back());
        },
        error => {
          this.commonService.error();
        });
  }
}
