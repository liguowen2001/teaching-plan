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
      name: '专业管理',
      url: 'major',
      icon: 'fa fa-address-book'
    },
    {
      name: '班级管理',
      url: 'klass',
      icon: 'fa fa-house-user'
    },
    {
      name: '课程管理',
      url: 'course',
      icon: 'fa fa-cog'
    },
    {
      name: '用户管理',
      url: 'user',
      icon: 'fa fa-user-cog',
    },
    {
      name: '学期管理',
      url: 'semester',
      icon: 'fa fa-user-cog',
    },
    {
      name: '个人中心',
      url: 'personal',
      icon: 'fa fa-user-alt'
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
              /**
               * found 为 true 表示显示此栏菜单，由于目前没有添加user的role属性，默认为全部显示
               */
              //let found = true;
              return true;
            })
          );
        }
      );
    });
  }
}
