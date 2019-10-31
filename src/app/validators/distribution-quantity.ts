import {AbstractControl, FormArray, ValidatorFn} from '@angular/forms';

export function validateDistributionQuantity(requestQuantity: number): ValidatorFn {
  return (control: AbstractControl) => {
    if (!(control instanceof FormArray)) {
      return null;
    }

    const distributedQuantity = control.getRawValue()
      .map(repartition => repartition.plantQuantity ? repartition.plantQuantity : 0)
      .reduce((accumulator, current) => accumulator + current, 0);

    if (distributedQuantity !== requestQuantity) {
      return {
        distributionQuantity: {
          valid: false
        }
      };
    }

    return null;
  };
}
