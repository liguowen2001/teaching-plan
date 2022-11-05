import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';
import {map} from 'rxjs/operators';
import {Semester} from '../entity/semester';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  private baseUrl = 'semester';

  constructor(private httpClient: HttpClient) {
  }

  public update(semesterId: number, semester: Semester): Observable<Semester> {
    return this.httpClient.put<Semester>(`${this.baseUrl}/${semesterId}`, semester);
  }

  /**
   * 删除
   */
  public delete(semesterId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${semesterId.toString()}`);
  }


  public page(page: number, size: number, param: {name?: string}): Observable<Page<Semester>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '');
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Semester>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Semester>(data).toObject(o => new Semester(o))));
  }

  public save(semester: Semester): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}`, semester);
  }

  public getById(semesterId: number): Observable<Semester> {
    return this.httpClient.get<Semester>(`${this.baseUrl}/${semesterId.toString()}`);
  }

  public getAll(): Observable<Semester[]> {
    return this.httpClient.get<Semester[]>(`${this.baseUrl}/getAll`);
  }

  /**
   * 获取当前学期
   */
  public getCurrentSemester(): Observable<Semester> {
    const date = new Date();
    let observable = new Observable<Semester>(subscriber => {
      this.getAll()
        .subscribe(semesters => {
          semesters.forEach(function (semester, key) {
            if (semester.startTime < date.getTime() && semester.endTime > date.getTime()) {
              subscriber.next(semester);
            }
          });
        });
    });
    return observable;
  }
}
