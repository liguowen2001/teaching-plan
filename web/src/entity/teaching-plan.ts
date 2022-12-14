/**
 * 教学计划
 * author: liguowen
 */
import {Teacher} from './teacher';
import {Klass} from './Klass';
import {Course} from './course';

export class TeachingPlan {
  /**
   * id
   */
  id?: number;
  /**
   * 名称
   */
  name?: string;

  /**
   * 教师
   */
  teacher?: Teacher;

  /**
   * 班级
   */
  klasses?: Klass[];

  /**
   * 课程
   */
  course?: Course;

  teachingFocus?: string;

  constructor(data = {} as {
    id?: number,
    name?: string,
    klasses?: Klass[],
    teacher?: Teacher,
    course?: Course,
    teachingFocus?: string

  }) {
    this.id = data.id;
    this.name = data.name;
    this.klasses = data.klasses;
    this.teacher = data.teacher;
    this.course = data.course;
    this.teachingFocus = data.teachingFocus;
  }
}
