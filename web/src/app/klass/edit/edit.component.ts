import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {ActivatedRoute} from '@angular/router';
import {KlassService} from '../../../service/klass.service';
import {Klass} from '../../../entity/Klass';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/utils/build/src';
import {Major} from '../../../entity/major';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private klassService: KlassService,
              private commonService: CommonService,) {
  }

  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    id: 'id',
    name: 'name',
    majorId: 'majorId'
  };
  klass = {} as Klass;

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.id, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.majorId, new FormControl('', Validators.required));
    // 获取id并找出对应client
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  loadById(id: number): void {
    this.formGroup.get('id')?.setValue(id);
    this.klassService.getById(id)
      .subscribe((klass) => {
        Assert.isNotNullOrUndefined(klass, klass.name, klass.major, 'some properties must be passed');
        this.formGroup.get(this.formKeys.name).setValue(klass.name);
        this.formGroup.get(this.formKeys.majorId).setValue(klass.major.id);
      }, error => console.log(error));
  }

  onSubmit(formGroup: FormGroup): void {
    const id = this.formGroup.get('id').value;
    const newKlass = new Klass({
      id: formGroup.get('id').value,
      name: formGroup.get('name').value,
      major: {id: formGroup.get(this.formKeys.majorId).value} as Major
    });

    this.klassService.update(id, newKlass)
      .subscribe(() => {
          this.commonService.success(() => this.commonService.back());
        },
        error => {
          this.commonService.error();
        });
  }
}
