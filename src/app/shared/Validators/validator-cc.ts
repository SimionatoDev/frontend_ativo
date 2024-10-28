import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidatorCC(required: boolean = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let valor = control.value;

    if (!required && valor == null) {
      return null;
    }

    if (valor == '')
      return {
        ValidatorCC: true,
        message: 'C.C. Deverá Existir. Mesmo Que Seja Igual Ao  Original!',
      };

    return null;
  };
}
