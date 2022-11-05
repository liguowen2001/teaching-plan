import { Component, OnInit } from '@angular/core';
import {Page} from '@yunzhi/ng-common';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from '../../../conf/app.config';
import {Assert} from '@yunzhi/utils/build/src';
import {Major} from '../../../entity/major';
import {MajorService} from '../../../service/major.service';
import {FileService} from '../../../service/file.service';

@Component({
  selector: 'app-category-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  keys = {
    page: 'page',
    size: 'size',
    name: 'name',
  };

  pageData = {} as Page<Major>;
  params: Params;
  queryForm = new FormGroup({});

  constructor(private majorService: MajorService,
              private commonService: CommonService,
              private fileService: FileService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // 使用this.keys初始化FormControl，从而避免拼写错误
    this.queryForm!.addControl(this.keys.name, new FormControl());

    // 订阅参数变化
    this.route.queryParams.subscribe((params: { page?: string, size?: string }) => {
      // 缓存查询参数
      this.params = params;
      // 使用参数中的数据设置formGroup
      this.queryForm.get(this.keys.name).setValue(params[this.keys.name]);

      getDefaultWhenValueIsInValid(params[this.keys.page], '0');
      getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString());

      // 发起查询
      this.majorService.page(
        // 调用stringToIntegerNumber将查询的字符串转为number
        getDefaultWhenValueIsInValid(params[this.keys.page], '0'),
        getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString()),
        {
          name: params[this.keys.name]
        },
      ).subscribe(page => {
        this.validateData(page);
        this.pageData = page;
      })
    });
  }

  /**
   * 删除
   * @param object 用户
   */
  onDelete(object: Major): void {
    Assert.isNotNullOrUndefined(object.id, 'id未定义');
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        const index = this.pageData.content.indexOf(object);
        this.fileService.delete(object.trainingPlan)
          .subscribe(() => {
            console.log("deleteFile");
            this.majorService.delete(object.id!)
              .subscribe(() => {
                this.commonService.success(() => this.pageData.content.splice(index, 1));
              });
          })

      }
    }, '');
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.reload({...this.params, ...{page}});
  }


  /**
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.reload({...this.params, ...{size}});
  }

  onSubmit(queryForm: FormGroup): void {
    this.reload({...this.params, ...queryForm.value});
  }

  /**
   * 查询
   * @param params page: 当前页 size: 每页大小
   */
  reload(params: Params): void {
    //this.commonService.reloadByParam(params).then();
    // 将参数转换为路由参数
    const queryParams = CommonService.convertToRouteParams(params);
    this.router.navigate(['./'],
      {
        relativeTo: this.route,
        queryParams: queryParams,
      }).then();
  }

  /**
   * 校验数据是否满足前台列表的条件
   * @param data 分页数据
   */
  validateData(data: Page<Major>): void {
    data.content.forEach(v => this.validateUser(v));
    this.pageData = data;
  }

  /**
   * 校验字段是否符合V层表现
   * @param user 用户
   */
  validateUser(user: Major): void {
    // 必有条件
    Assert.isNotNullOrUndefined(
      user.id,
      user.name,
      '未满足table列表的初始化条件'
    );
  }

  /**
   * 查看培养计划
   * @param major
   */
  view(major: Major) {
    this.commonService.viewFile(major.trainingPlan);
  }
}
