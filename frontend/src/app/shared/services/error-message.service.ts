import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

/**
 * Interface for error message mapping strategy
 * Follows Interface Segregation Principle - focused interface for error mapping only
 */
export interface IErrorMessageMapper {
  mapErrorToMessage(errors: ValidationErrors): string;
}

/**
 * Service responsible for mapping validation errors to user-friendly messages
 * Follows Single Responsibility Principle - only handles error message mapping
 * Implements Strategy Pattern for extensible error message handling
 */
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

  /**
   * Maps validation errors to user-friendly error messages
   * Open/Closed Principle - can extend with custom error types without modifying
   */
  mapErrorToMessage(errors: ValidationErrors): string {
    if (!errors || Object.keys(errors).length === 0) {
      return '';
    }

    // Get the first error key
    const errorKey = Object.keys(errors)[0];
    const errorValue = errors[errorKey];

    // Use the mapping strategy if available
    const messageGenerator = this.defaultMessages[errorKey];
    if (messageGenerator) {
      return messageGenerator(errorValue);
    }

    // Fallback message
    return 'Invalid value';
  }

  /**
   * Allows extending error messages without modifying this class
   * Follows Open/Closed Principle
   */
  addCustomErrorMessage(errorKey: string, messageGenerator: (error: any) => string): void {
    this.defaultMessages[errorKey] = messageGenerator;
  }
}
