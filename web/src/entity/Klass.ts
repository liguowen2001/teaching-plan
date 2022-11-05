/**
 * 班级
 */
import {Major} from './major';

export class Klass {
  /**
   * id
   */
  id?: number;
  /**
   * 名称
   */
  name?: string;

  major: Major;
  constructor(data = {} as {
    id?: number,
    name?: string,
    major: Major
  }) {
    this.id = data.id;
    this.name = data.name;
    this.major = data.major;
  }

}
