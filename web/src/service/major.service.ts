import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Major} from '../entity/major';
import {Observable} from 'rxjs';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MajorService {

  private baseUrl = 'major';
  constructor(private httpClient: HttpClient) { }

  public update(majorId: number, major: Major): Observable<Major> {
    return this.httpClient.put<Major>(`${this.baseUrl}/${majorId}`, major);
  }

  /**
   * 删除
   */
  public delete(majorId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${majorId.toString()}`);
  }


  public page(page: number, size: number, param: { name?: string }): Observable<Page<Major>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Major>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Major>(data).toObject(o => new Major(o))));

  }

  public save(major: Major): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}`, major);
  }

  public getById(majorId: number): Observable<Major> {
    return this.httpClient.get<Major>(`${this.baseUrl}/${majorId.toString()}`);
  }

  public getAll(): Observable<Major[]>{
    return this.httpClient.get<Major[]>(`${this.baseUrl}/getAll`);
  }

}
