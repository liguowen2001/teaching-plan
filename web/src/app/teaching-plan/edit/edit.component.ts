import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/utils/build/src';
import {TeachingPlanService} from '../../../service/teaching-plan.service';
import {TeachingPlan} from '../../../entity/teaching-plan';
import {Klass} from '../../../entity/Klass';
import {FileService} from '../../../service/file.service';
import {KlassService} from '../../../service/klass.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private teachingPlanService: TeachingPlanService,
              private commonService: CommonService,
              private fileService: FileService,
              private klassService :KlassService) {
  }

  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    id: 'id',
    klasses: 'klasses',
    teachingFocus: 'teachingFocus'
  };
  teachingPlan = {} as TeachingPlan;

  file: File;
  formData = new FormData();

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.id, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.klasses, new FormControl([], Validators.required));
    this.formGroup.addControl(this.formKeys.teachingFocus, new FormControl([], Validators.required));

    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  loadById(id: number): void {
    this.formGroup.get('id')?.setValue(id);
    this.teachingPlanService.getById(id)
      .subscribe((teachingPlan) => {
        Assert.isNotNullOrUndefined(teachingPlan, teachingPlan.name, 'some properties must be passed');
        let klassIds = [];
        teachingPlan.klasses.forEach(function (klass) {
          klassIds.push(klass.id);
        });
        this.formGroup.get(this.formKeys.klasses).setValue(klassIds);

      }, error => console.log(error));
  }

  onSubmit(formGroup: FormGroup): void {
    this.formData.append('file', this.file);
    if (this.file == undefined){
      this.save(null);
    }else {
      this.fileService.save(this.formData)
        .subscribe(fileName => {
          this.save(fileName);
        });
    }

  }

  save(fileName: string): void{
    const id = this.formGroup.get('id').value;
    let klasses = [] as Klass[];
    let klassIds = this.formGroup.get(this.formKeys.klasses).value as number[];
    klassIds.forEach(function (id) {
      klasses.push({id: id});
    });

    const newTeachingPlan = new TeachingPlan({
      id: this.formGroup.get('id').value,
      name: fileName,
      klasses: klasses,
      teachingFocus: this.formGroup.get(this.formKeys.teachingFocus).value
    });
    this.teachingPlanService.update(id, newTeachingPlan)
      .subscribe(() => {
          this.commonService.success(() => this.commonService.back());
        },
        error => {
          this.commonService.error();
        });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

}
