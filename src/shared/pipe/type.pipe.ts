import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'sgType' })
export class TypePipe implements PipeTransform {
    constructor() { }
    transform(value: string): string {
        return value === 'income' ? '收入' : '支出';
    }
}
