import {Injectable} from '@angular/core';
import {Menu} from '../entity/menu';
import {Observable, Subscriber} from 'rxjs';
import {UserService} from './user.service';

/**
 * 菜单服务
 * author: liguowen
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private static readonly menus = [
    {
      name: '用户管理',
      url: 'user',
      icon: 'fa fa-user-cog',
      role: 0
    },
    {
      name: '学生管理',
      url: 'student',
      icon: 'fa fa-address-book',
      role: 0
    },
    {
      name: '教师管理',
      url: 'teacher',
      icon: 'fa fa-address-book',
      role: 0
    },
    {
      name: '专业管理',
      url: 'major',
      icon: 'fa fa-address-book',
      role: 0
    },
    {
      name: '班级管理',
      url: 'klass',
      icon: 'fa fa-house-user',
      role: 0
    },
    {
      name: '学期管理',
      url: 'semester',
      icon: 'fa fa-user-cog',
      role: 0
    },
    {
      name: '课程管理',
      url: 'course',
      icon: 'fa fa-cog',
      role: 0
    },
    {
      name: '教学计划管理',
      url: 'teachingPlan',
      icon: 'fa fa-address-book',
      role: 1
    },
    {
      name: '课程',
      url: 'studentCourse',
      icon: 'fa fa-address-book',
      role: 2
    },
    {
      name: '个人中心',
      url: 'personal',
      icon: 'fa fa-user-alt',
      role: null
    },
  ] as Menu[];

  constructor(private userService: UserService) {
  }

  public getMenus(): Observable<Menu[]> {
    let subscribe: Subscriber<Menu[]>;
    return new Observable<Menu[]>(s => {
      subscribe = s;
      this.userService.currentLoginUser$.subscribe(
        user => {
          subscribe.next(
            MenuService.menus.filter(menu => {
              if (menu.role === null) {
                return true;
              }
              if (user?.role == 2) {
                if (menu.role == 2) {
                  return true;
                } else {
                  return false;
                }
              } else {
                if (menu.role == 2) {
                  return false;
                }
                if (user?.role <= menu.role) {
                  return true;
                } else {
                  return false;
                }
              }
              /**
               * found 为 true 表示显示此栏菜单，由于目前没有添加user的role属性，默认为全部显示
               */
            })
          );
        }
      );
    });
  }
}
