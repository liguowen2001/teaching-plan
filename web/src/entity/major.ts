/**
 * 专业
 * author: liguowen
 */
export class Major {
  /**
   * id
   */
  id?: number;
  /**
   * 名称
   */
  name?: string;

  /**
   * 培养计划
   */
  trainingPlan?: string

  constructor(data = {} as {
    id?: number,
    name?: string,
    trainingPlan?: string
  }) {
    this.id = data.id;
    this.name = data.name;
    this.trainingPlan = data.trainingPlan;
  }
}
