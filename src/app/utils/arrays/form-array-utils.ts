import {FormArray} from '@angular/forms';

export abstract class FormArrayUtils {
  static swapFormArrayItems(formArray: FormArray, firstIndex: number, secondIndex: number) {
    const direction = secondIndex > firstIndex ? 1 : -1;
    const numberOfSwaps = secondIndex * direction;
    const swappedItem = formArray.at(firstIndex);

    for (let i = firstIndex; i * direction < numberOfSwaps; i += direction) {
      const current = formArray.at(i + direction);

      formArray.setControl(i, current);
    }

    formArray.setControl(secondIndex, swappedItem);
  }
}
