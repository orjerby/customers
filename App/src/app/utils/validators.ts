import { AbstractControl, ValidationErrors } from '@angular/forms';

export function isNumber(value: string) {
  return value.trim() !== '' && !isNaN(+value);
}

export function idValidator(control: AbstractControl): ValidationErrors | null {
  let value = control.value;

  value = String(value).trim();
  if (value.length > 9 || value.length < 5 || isNaN(value))
    return { invalid: 'מספר זהות לא תקין' };

  // Pad string with zeros up to 9 digits
  value = value.length < 9 ? ('00000000' + value).slice(-9) : value;

  return Array.from(value, Number).reduce((counter, digit, i) => {
    const step = digit * ((i % 2) + 1);
    return counter + (step > 9 ? step - 9 : step);
  }) %
    10 ===
    0
    ? null
    : { invalid: 'מספר זהות לא תקין' };
}
