/**
 * 专业
 * author: liguowen
 */
import {User} from './user';
import {Klass} from './Klass';

export class Student {
  /**
   * id
   */
  id?: number;

  /**
   * 用户
   */
  user?: User;

  /**
   * 班级
   */
  klass?: Klass;

  constructor(data = {} as {
    id?: number,
    user?: User,
    klass?: Klass

  }) {
    this.id = data.id;
    this.klass = data.klass;
    this.user = data.user;
  }
}
