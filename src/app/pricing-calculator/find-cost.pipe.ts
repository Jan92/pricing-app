import { Pipe, PipeTransform } from '@angular/core';
import { PricingModelResult } from './pricing-simulation.service'; // Import the interface

@Pipe({
  name: 'findCost',
  standalone: true
})
export class FindCostPipe implements PipeTransform {

  transform(
    results: PricingModelResult[] | null | undefined,
    modelName: 'monthly' | 'volume' | 'aiScore'
  ): number | null {
    if (!results) {
      return null;
    }
    const foundResult = results.find(r => r.modelName === modelName);
    return foundResult ? foundResult.cost : null;
  }

} 