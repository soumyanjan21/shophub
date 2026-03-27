import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export interface IErrorMessageMapper {
  mapErrorToMessage(errors: ValidationErrors): string;
}

/** Narrow type that covers the shape of Angular built-in validation error objects. */
type ValidationErrorValue = {
  requiredLength?: number;
  actualLength?: number;
  min?: number;
  max?: number;
  [key: string]: unknown;
};

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService implements IErrorMessageMapper {
  private readonly defaultMessages: Record<string, (error: ValidationErrorValue) => string> = {
    required: () => 'This field is required',
    email: () => 'Please enter a valid email address',
    minlength: (error) => `Minimum length is ${error['requiredLength']} characters`,
    maxlength: (error) => `Maximum length is ${error['requiredLength']} characters`,
    min: (error) => `Minimum value is ${error['min']}`,
    max: (error) => `Maximum value is ${error['max']}`,
    pattern: () => 'Invalid format',
  };

  mapErrorToMessage(errors: ValidationErrors): string {
    if (!errors || Object.keys(errors).length === 0) {
      return '';
    }

    const errorKey = Object.keys(errors)[0];
    const errorValue = errors[errorKey] as ValidationErrorValue;

    const messageGenerator = this.defaultMessages[errorKey];
    if (messageGenerator) {
      return messageGenerator(errorValue);
    }

    return 'Invalid value';
  }

  addCustomErrorMessage(
    errorKey: string,
    messageGenerator: (error: ValidationErrorValue) => string,
  ): void {
    this.defaultMessages[errorKey] = messageGenerator;
  }
}
