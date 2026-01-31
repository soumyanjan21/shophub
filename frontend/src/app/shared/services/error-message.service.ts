import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export interface IErrorMessageMapper {
  mapErrorToMessage(errors: ValidationErrors): string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService implements IErrorMessageMapper {
  private readonly defaultMessages: Record<string, (error: any) => string> = {
    required: () => 'This field is required',
    email: () => 'Please enter a valid email address',
    minlength: (error) => `Minimum length is ${error.requiredLength} characters`,
    maxlength: (error) => `Maximum length is ${error.requiredLength} characters`,
    min: (error) => `Minimum value is ${error.min}`,
    max: (error) => `Maximum value is ${error.max}`,
    pattern: () => 'Invalid format',
  };

  mapErrorToMessage(errors: ValidationErrors): string {
    if (!errors || Object.keys(errors).length === 0) {
      return '';
    }

    const errorKey = Object.keys(errors)[0];
    const errorValue = errors[errorKey];

    const messageGenerator = this.defaultMessages[errorKey];
    if (messageGenerator) {
      return messageGenerator(errorValue);
    }

    return 'Invalid value';
  }

  addCustomErrorMessage(errorKey: string, messageGenerator: (error: any) => string): void {
    this.defaultMessages[errorKey] = messageGenerator;
  }
}
