import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {Student} from '../entity/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'student';

  constructor(private httpClient: HttpClient) {
  }

  public update(studentId: number, student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${this.baseUrl}/${studentId}`, student);
  }

  /**
   * 删除
   */
  public delete(studentId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${studentId.toString()}`);
  }


  public page(page: number, size: number, param: {name?: string,userName?: string ,klassId?: number}): Observable<Page<Student>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')
      .append('klassId', isNotNullOrUndefined(param.klassId) ? param.klassId : '')
      .append('username', isNotNullOrUndefined(param.userName) ? param.userName : '');

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Student>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Student>(data).toObject(o => new Student(o))));

  }

  public save(student: Student): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}`, student);
  }

  public getById(studentId: number): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseUrl}/${studentId.toString()}`);
  }

  public getAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseUrl}/getAll`);
  }

  public getByUserId(userId: number): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseUrl}/getByUser/${userId.toString()}`);
  }

}
