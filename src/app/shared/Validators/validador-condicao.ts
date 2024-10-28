import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidatorCondicao(required: boolean = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let valor = control.value;

    let retorno: number = 0;

    if (!required && valor == null) {
      return null;
    }

    retorno = parseInt(valor);

    if (isNaN(retorno))
      return { ValidatorCondicao: true, message: 'Condição Inválida!' };

    if (retorno == 9)
      return {
        ValidatorSituacao: true,
        message: 'Condição Precisa De Uma Avaliação!',
      };

    return null;
  };
}
