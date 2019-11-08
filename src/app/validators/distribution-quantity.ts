import {AbstractControl, FormArray, ValidatorFn} from '@angular/forms';

export function validateDistributionQuantity(requestQuantity: number): ValidatorFn {
  return (control: AbstractControl) => {
    if (!(control instanceof FormArray)) {
      return null;
    }

    const hasStageWithNoSurface = control.getRawValue()
      .some(repartition => null != repartition.plantStage && null == repartition.plantStage.surfaceNeeded);

    if (hasStageWithNoSurface) {
      return null;
    }

    const distributedQuantity = control.getRawValue()
      .map(repartition => repartition.quantity ? repartition.quantity : 0)
      .reduce((accumulator, current) => accumulator + current, 0);

    if (distributedQuantity === requestQuantity) {
      return null;
    }

    return {
      distributionQuantity: {
        valid: false
      }
    };
  };
}
