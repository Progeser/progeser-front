import {AbstractControl, ValidatorFn} from '@angular/forms';

export interface AbstractWarnControl extends AbstractControl {
  warnings: any;
}

export function warnMissingPlantStageSurface(): ValidatorFn {
  return (control: AbstractWarnControl) => {
    const missingPlantSurface = control.value
      .some(stage => null == stage.surfaceNeeded);

    control.warnings = missingPlantSurface ? {missingPlantSurface} : null;

    return null;
  };
}
