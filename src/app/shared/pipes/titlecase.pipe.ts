import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'titlecase', standalone: true })
export class TitleCasePipeImpl implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
