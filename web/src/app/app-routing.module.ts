import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BasicComponent} from '@yunzhi/ng-theme';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },

  {
    path: '',
    component: BasicComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: {
          title: '用户管理'
        }
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
        data: {
          title: '学生管理'
        }
      },
      {
        path: 'teacher',
        loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),
        data: {
          title: '教师管理'
        }
      },
      {
        path: 'personal',
        loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule)
      },
      {
        path: 'major',
        loadChildren: () => import('./major/major.module').then(m => m.MajorModule),
        data: {
          title: '专业管理'
        }
      },
      {
        path: 'klass',
        loadChildren: () => import('./klass/klass.module').then(m => m.KlassModule),
        data: {
          title: '班级管理'
        }
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.CourseModule),
        data: {
          title: '课程管理'
        }
      },
      {
        path: 'semester',
        loadChildren: () => import('./semester/semester.module').then(m => m.SemesterModule),
        data: {
          title: '学期管理'
        }
      },
      {
        path: 'teachingPlan',
        loadChildren: () => import('./teaching-plan/teaching-plan.module').then(m => m.TeachingPlanModule),
        data: {
          title: '教学计划管理'
        }
      },
      {
        path: 'studentCourse',
        loadChildren: () => import('./student-course/student-course.module').then(m => m.StudentCourseModule),
        data: {
          title: '课程'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
