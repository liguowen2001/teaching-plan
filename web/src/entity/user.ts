/**
 * 用户
 * author: liMingAo
 */
export class User {
  /**
   * 用户id
   */
  id: number;
  /**
   * 用户姓名
   */
  name?: string;
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password?: string;
  /**
   * 邮箱
   */
  email?: string;

  role?: number

  constructor(data = {} as {
    id: number,
    name?: string,
    username: string,
    password?: string,
    email?: string,
    role?: number
  }) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.role = data.role
  }
}
