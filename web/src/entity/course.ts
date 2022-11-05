/**
 * 课程
 */
import {Semester} from './semester';

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
  constructor(data = {} as {
    id?: number,
    name?: string,
    semester?: Semester,
    courseCredit?: number,
    experimentalCredit?: number,
    examinationMethod?: string
  }) {
    this.id = data.id;
    this.name = data.name;
    this.semester = data.semester;
    this.courseCredit = data.courseCredit;
    this.experimentalCredit = data.experimentalCredit;
    this.examinationMethod = data.examinationMethod;
  }

}
