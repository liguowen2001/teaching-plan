import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Major} from '../../../entity/major';
import {MajorService} from '../../../service/major.service';
import {FileService} from '../../../service/file.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  major = new Major();
  keys = {
    name: 'name'
  };
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  file: File;
  canSubmit = false as boolean;
  formData = new FormData();
  fileChange = false as boolean;

  constructor(private commonService: CommonService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private majorService: MajorService,
              private fileService: FileService) {
  }


  loadById(id: number): void {
    this.majorService.getById(id)
      .subscribe((major: Major) => {
        this.setMajor(major);
      }, error => {
        throw new Error(error);
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id = +param.id;
      this.major.id = id;
      Assert.isTrue(Number.isInteger(id), 'ID类型不正确');
      this.loadById(id);
    });
  }

  onSubmit(formGroup: FormGroup) {
    if(this.fileChange === true){
      this.formData.append('file',this.file);
      this.formData.append('fileName',this.major.trainingPlan);
      this.fileService.update(this.formData)
        .subscribe(fileName => {
          this.majorService.update(this.major.id, {
            id: this.major.id,
            name: formGroup.get(this.keys.name).value as string,
            trainingPlan: fileName
          }).subscribe(() => {
            },
            () => {
            },
            () => {
              this.commonService.success(() => {
                this.commonService.back();
              });
            });
        })
    }else {
      this.majorService.update(this.major.id, {
        id: this.major.id,
        name: formGroup.get(this.keys.name).value as string,
        trainingPlan: this.major.trainingPlan
      }).subscribe(() => {
        },
        () => {
        },
        () => {
          this.commonService.success(() => {
            this.commonService.back();
          });
        });
    }
  }

  setMajor(major: Major): void {
    this.major = major;
    this.formGroup.get(this.keys.name).setValue(major.name);
  }

  onFileSelected(event) {
    this.fileChange = true;
    const file: File = event.target.files[0];
    if (!file) {
      this.canSubmit = true;
    }
  }
}
