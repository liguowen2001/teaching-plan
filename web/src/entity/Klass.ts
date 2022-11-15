/**
 * 班级
 */
import {Major} from './major';
import {TeachingPlan} from './teaching-plan';

export class Klass {
  /**
   * id
   */
  id?: number;
  /**
   * 名称
   */
  name?: string;

  major?: Major;

  teachingPlans?: TeachingPlan[];

  constructor(data = {} as {
    id?: number,
    name?: string,
    major?: Major,
    teachingPlans?: TeachingPlan[]
  }) {
    this.id = data.id;
    this.name = data.name;
    this.major = data.major;
    this.teachingPlans = data.teachingPlans;
  }

}
