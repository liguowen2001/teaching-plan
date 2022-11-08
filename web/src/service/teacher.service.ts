import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {Teacher} from '../entity/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private baseUrl = 'teacher';

  constructor(private httpClient: HttpClient) {
  }

  public update(teacherId: number, teacher: Teacher): Observable<Teacher> {
    return this.httpClient.put<Teacher>(`${this.baseUrl}/${teacherId}`, teacher);
  }

  /**
   * 删除
   */
  public delete(teacherId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${teacherId.toString()}`);
  }


  public page(page: number, size: number, param: {name?: string,userName?: string}): Observable<Page<Teacher>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')
      .append('username', isNotNullOrUndefined(param.userName) ? param.userName : '');

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Teacher>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Teacher>(data).toObject(o => new Teacher(o))));

  }

  public save(teacher: Teacher): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}`, teacher);
  }

  public getById(teacherId: number): Observable<Teacher> {
    return this.httpClient.get<Teacher>(`${this.baseUrl}/${teacherId.toString()}`);
  }

  public getAll(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(`${this.baseUrl}/getAll`);
  }

  public getByUserId(userId: number): Observable<Teacher> {
    return this.httpClient.get<Teacher>(`${this.baseUrl}/getByUser/${userId.toString()}`);
  }

}
