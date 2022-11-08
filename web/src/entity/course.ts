/**
 * 课程
 */
import {Semester} from './semester';
import {Klass} from './Klass';
import {Teacher} from './teacher';
import {Major} from './major';

export class Course {
  /**
   * id
   */
  id?: number;
  /**
   * 名称
   */
  name?: string;


  /**
   * 学期
   */
  semester: Semester;

  /**
   * 课程学分
   */
  courseCredit: number;

  /**
   * 实验学分
   */
  experimentalCredit: number;

  /**
   * 考核方式
   */
  examinationMethod: string;

  /**
   * 教师
   */
  teacher?: Teacher;

  /**
   * 开课专业
   */
  majors?: Major[];

  constructor(data = {} as {
    id?: number,
    name?: string,
    semester?: Semester,
    courseCredit?: number,
    experimentalCredit?: number,
    examinationMethod?: string,
    teacher?: Teacher,
    majors?: Major[]
  }) {
    this.id = data.id;
    this.name = data.name;
    this.semester = data.semester;
    this.courseCredit = data.courseCredit;
    this.experimentalCredit = data.experimentalCredit;
    this.examinationMethod = data.examinationMethod;
    this.teacher = data.teacher;
    this.majors = data.majors;
  }

}
