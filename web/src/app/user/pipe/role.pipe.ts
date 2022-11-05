import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch (value){
      case 0:
        return '管理员';
      case 1:
        return '教师';
      case 2:
        return '学生';
      default:
        return '-';
    }
  }

}
