import { Pipe, PipeTransform } from '@angular/core';
import { SeriesScenarioResult } from '../models/score.model';

@Pipe({
  name: 'filterByOriginalValue',
  standalone: false
})
export class FilterByOriginalValuePipe implements PipeTransform {

  transform(items: SeriesScenarioResult[], originalValue: number): SeriesScenarioResult[] {
    if (!items) {
      return [];
    }
    return items.filter(item => item.originalSeriesValue === originalValue);
  }

}
