import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {TeachingPlan} from '../entity/teaching-plan';

@Injectable({
  providedIn: 'root'
})
export class TeachingPlanService {

  private baseUrl = 'teachingPlan';

  constructor(private httpClient: HttpClient) {
  }

  public update(teachingPlanId: number, teachingPlan: TeachingPlan): Observable<TeachingPlan> {
    return this.httpClient.put<TeachingPlan>(`${this.baseUrl}/${teachingPlanId}`, teachingPlan);
  }

  /**
   * 删除
   */
  public delete(teachingPlanId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${teachingPlanId.toString()}`);
  }


  public page(page: number, size: number, param: {name?: string, semesterId?: number, teacherId?: number}): Observable<Page<TeachingPlan>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')
      .append('klassId', isNotNullOrUndefined(param.semesterId) ? param.semesterId : '')
      .append('teacherId', isNotNullOrUndefined(param.teacherId) ? param.teacherId : '');

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<TeachingPlan>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<TeachingPlan>(data).toObject(o => new TeachingPlan(o))));

  }

  public save(teachingPlan: TeachingPlan): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}`, teachingPlan);
  }

  public getById(teachingPlanId: number): Observable<TeachingPlan> {
    return this.httpClient.get<TeachingPlan>(`${this.baseUrl}/${teachingPlanId.toString()}`);
  }

  public getAll(): Observable<TeachingPlan[]> {
    return this.httpClient.get<TeachingPlan[]>(`${this.baseUrl}/getAll`);
  }

}
