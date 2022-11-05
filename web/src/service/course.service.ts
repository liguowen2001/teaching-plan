import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {Course} from '../entity/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'course';
  constructor(private httpClient: HttpClient) { }

  public update(courseId: number, course: Course): Observable<Course> {
    return this.httpClient.put<Course>(`${this.baseUrl}/${courseId}`, course);
  }

  /**
   * 删除
   */
  public delete(courseId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${courseId.toString()}`);
  }


  public page(page: number, size: number, param: { name?: string, semesterId?: number }): Observable<Page<Course>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')
      .append('semesterId',isNotNullOrUndefined(param.semesterId) ? param.semesterId : '')
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Course>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Course>(data).toObject(o => new Course(o))));

  }

  public save(course: Course): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}`, course);
  }

  public getById(courseId: number): Observable<Course> {
    return this.httpClient.get<Course>(`${this.baseUrl}/${courseId.toString()}`);
  }

  public getAll(): Observable<Course[]>{
    return this.httpClient.get<Course[]>(`${this.baseUrl}/getAll`);
  }

}
