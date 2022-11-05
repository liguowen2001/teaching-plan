import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {Klass} from '../entity/Klass';

@Injectable({
  providedIn: 'root'
})
export class KlassService {

  private baseUrl = 'klass';
  constructor(private httpClient: HttpClient) { }

  public update(klassId: number, Klass: Klass): Observable<Klass> {
    return this.httpClient.put<Klass>(`${this.baseUrl}/${klassId}`, Klass);
  }

  /**
   * 删除
   */
  public delete(klassId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${klassId.toString()}`);
  }


  public page(page: number, size: number, param: { name?: string, majorId?: number }): Observable<Page<Klass>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')
      .append('majorId',isNotNullOrUndefined(param.majorId) ? param.majorId : '')
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Klass>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Klass>(data).toObject(o => new Klass(o))));

  }

  public save(Klass: Klass): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}`, Klass);
  }

  public getById(KlassId: number): Observable<Klass> {
    return this.httpClient.get<Klass>(`${this.baseUrl}/${KlassId.toString()}`);
  }

  public getAll(): Observable<Klass[]>{
    return this.httpClient.get<Klass[]>(`${this.baseUrl}/getAll`);
  }

}
