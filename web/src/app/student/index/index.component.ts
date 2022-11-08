import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Page} from '@yunzhi/ng-common';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from '../../../conf/app.config';
import {Assert} from '@yunzhi/utils/build/src';
import {CommonService} from '../../../service/common.service';
import {StudentService} from '../../../service/student.service';
import {Student} from '../../../entity/student';


/**
 * 用户管理首页
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  keys = {
    page: 'page',
    size: 'size',
    name: 'name',
    username: 'username',
    klassId: 'klassId'
  };
  currentUserId: number;
  nameFormControl = new FormControl('');
  pageData = {} as Page<Student>;
  params: Params;
  queryForm = new FormGroup({});
  usernameFormControl = new FormControl('');

  constructor(private commonService: CommonService,
              private studentService: StudentService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.currentLoginUser$
      .subscribe(user => {
        if (user) {
          Assert.isNotNullOrUndefined(user.name, 'name must be exist');
          Assert.isNotNullOrUndefined(user.username, 'username must be exit');
          this.currentUserId = user.id;
        }
      });
    // 使用this.keys初始化FormControl，从而避免拼写错误
    this.queryForm!.addControl(this.keys.name, this.nameFormControl);
    this.queryForm!.addControl(this.keys.username, this.usernameFormControl);
    this.queryForm!.addControl(this.keys.klassId, new FormControl());

    // 订阅参数变化
    this.route.queryParams.subscribe((params: {page?: string, size?: string}) => {
      // 缓存查询参数
      this.params = params;
      // 使用参数中的数据设置formGroup
      this.queryForm.get(this.keys.name).setValue(params[this.keys.name]);
      this.queryForm.get(this.keys.username).setValue(params[this.keys.username]);
      this.queryForm.get(this.keys.klassId).setValue(params[this.keys.klassId]);

      getDefaultWhenValueIsInValid(params[this.keys.page], '0');
      getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString());

      // 发起查询
      this.studentService.page(
        // 调用stringToIntegerNumber将查询的字符串转为number
        getDefaultWhenValueIsInValid(params[this.keys.page], '0'),
        getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString()),
        {
          name: params[this.keys.name],
          klassId: params[this.keys.klassId],
          userName: params[this.keys.username]
        },
      ).subscribe(page => {
        this.validateData(page);
        this.pageData = page;
      });
    });
  }

  /**
   * 删除
   * @param object 用户
   */
  onDelete(object: Student): void {
    Assert.isNotNullOrUndefined(object.id, 'id未定义');
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        const index = this.pageData.content.indexOf(object);
        this.studentService.delete(object.id!)
          .subscribe(() => {
            this.commonService.success(() => this.pageData.content.splice(index, 1));
          });
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
  validateData(data: Page<Student>): void {
    data.content.forEach(v => this.validateUser(v));
    this.pageData = data;
  }

  /**
   * 校验字段是否符合V层表现
   * @param student
   */
  validateUser(student: Student): void {
    // 必有条件
    Assert.isNotNullOrUndefined(
      student.id,
      student.klass,
      student.user,
      '未满足table列表的初始化条件'
    );
  }

  /**
   * 重置密码
   * @param id
   */
  onResetPassword(id: number): void {
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        this.userService.resetPassword(id)
          .subscribe((defaultPassword) => {
            this.commonService.success(() => {
            }, '', '操作成功，密码:' + defaultPassword);
          });
      }
    }, '');
  }
}
