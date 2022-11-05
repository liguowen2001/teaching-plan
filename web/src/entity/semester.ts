/**
 * 学期
 */

export class Semester {
  /**
   * id
   */
  id?: number;
  /**
   * 名称
   */
  name?: string;

  /**
   * 开始时间
   */
  startTime?: number;

  /**
   * 结束时间
   */
  endTime?: number;

  constructor(data = {} as {
    id?: number,
    name?: string,
    startTime?: number,
    endTime?: number
  }) {
    this.id = data.id;
    this.name = data.name;
    this.startTime = data.startTime;
    this.endTime = data.endTime;

  }

}
