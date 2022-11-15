import {Component, OnInit} from '@angular/core';
import {Page} from '@yunzhi/ng-common';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from '../../../conf/app.config';
import {Assert} from '@yunzhi/utils/build/src';
import {TeachingPlan} from '../../../entity/teaching-plan';
import {TeachingPlanService} from '../../../service/teaching-plan.service';
import {UserService} from '../../../service/user.service';
import {StudentService} from '../../../service/student.service';
import {Student} from '../../../entity/student';
import {SemesterService} from '../../../service/semester.service';
import {Semester} from '../../../entity/semester';


@Component({
  selector: 'app-category-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  keys = {
    page: 'page',
    size: 'size',
    semesterId: 'semesterId'
  };

  pageData = {} as Page<TeachingPlan>;
  params: Params;
  queryForm = new FormGroup({});
  student = {} as Student;
  currentSemester: Semester;

  constructor(private teachingPlanService: TeachingPlanService,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private studentService: StudentService,
              private semesterService: SemesterService) {
  }

  ngOnInit(): void {
    // 使用this.keys初始化FormControl，从而避免拼写错误
    this.queryForm!.addControl(this.keys.semesterId, new FormControl());

    // 订阅参数变化
    this.route.queryParams.subscribe((params: {page?: string, size?: string}) => {
      // 缓存查询参数
      this.params = params;
      // 使用参数中的数据设置formGroup
      this.queryForm.get(this.keys.semesterId).setValue(params[this.keys.semesterId]);

      getDefaultWhenValueIsInValid(params[this.keys.page], '0');
      getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString());

      this.userService.currentLoginUser$
        .subscribe(user => {
          this.studentService.getByUserId(user.id)
            .subscribe(student => {
              this.student = student;
              console.log(this.student.klass);

              // 发起查询
              let semesterId = this.queryForm.get(this.keys.semesterId).value;
              if (semesterId !== undefined) {
                this.student.klass.teachingPlans = this.student.klass.teachingPlans.filter(
                  teachingPlan => teachingPlan.course.semester.id == semesterId);
                console.log(this.student.klass.teachingPlans);
              }
            });
        });

    });
    this.semesterService.getCurrentSemester()
      .subscribe(value => this.currentSemester = value);
  }

  /**
   * 删除
   */
  onDelete(object: TeachingPlan): void {
    Assert.isNotNullOrUndefined(object.id, 'id未定义');
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        const index = this.pageData.content.indexOf(object);
        this.teachingPlanService.delete(object.id!)
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
  validateData(data: Page<TeachingPlan>): void {
    data.content.forEach(v => this.validateUser(v));
    this.pageData = data;
  }

  /**
   * 校验字段是否符合V层表现
   * @param teachingPlan
   */
  validateUser(teachingPlan: TeachingPlan): void {
    // 必有条件
    Assert.isNotNullOrUndefined(
      // teachingPlan.id,
      // teachingPlan.name,
      // teachingPlan.teacher,
      // teachingPlan.teacher.user,
      // teachingPlan.teacher.user.name,
      // teachingPlan.course,
      // teachingPlan.course.name,
      // teachingPlan.course.semester,
      // teachingPlan.course.semester.name,
      // teachingPlan.klasses,
      '未满足table列表的初始化条件'
    );
  }

  view(teachingPlan: TeachingPlan) {
    this.commonService.viewFile(teachingPlan.name);
  }

  viewTrainingPlan(){
    this.commonService.viewFile(this.student.klass.major.trainingPlan);
  }
}
