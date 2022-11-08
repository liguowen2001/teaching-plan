/**
 * 专业
 * author: liguowen
 */
import {User} from './user';
import {Klass} from './Klass';

export class Teacher {
  /**
   * id
   */
  id?: number;

  /**
   * 用户
   */
  user?: User;

  constructor(data = {} as {
    id?: number,
    user?: User,

  }) {
    this.id = data.id;
    this.user = data.user;
  }
}
