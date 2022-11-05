import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../service/common.service';
import {DomSanitizer} from '@angular/platform-browser';
import {FileService} from '../../../service/file.service';
import {Major} from '../../../entity/major';
import {MajorService} from '../../../service/major.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  formGroup = new FormGroup({});
  file: File;
  sanitizerUrl: any;
  canSubmit = true as boolean;
  keys = {
    name: 'name',
  };

  formData = new FormData();

  constructor(private commonService: CommonService,
              private sanitizer: DomSanitizer,
              private fileService: FileService,
              private majorService: MajorService
  ) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.keys.name, new FormControl('', Validators.required));
  }

  /**
   * 保存提交功能
   * @param formGroup 待保存的数据
   */
  onSubmit(formGroup: FormGroup): void {

    this.formData.append('file', this.file);
    this.fileService.save(this.formData)
      .subscribe(fileName => {
        let major = new Major({
          name: formGroup.get(this.keys.name).value,
          trainingPlan: fileName
        });
        this.majorService.save(major)
          .subscribe(() => {
            // 数据保存成功，调用commonService的成功提示并进行返回跳转
            this.commonService.success(() => {
              this.commonService.back();
            });
          });
      },error => {
        this.commonService.error(()=>{},'保存失败，文件大于10M')
      });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.canSubmit = false;
      this.file = file;
    }
  }
}
