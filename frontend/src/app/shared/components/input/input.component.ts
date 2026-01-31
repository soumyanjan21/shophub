import { Component, input, effect, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageService } from '../../services/error-message.service';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="input-wrapper">
      @if (label()) {
        <label [for]="id()" class="input-label">{{ label() }}</label>
      }
      <input
        [id]="id()"
        [type]="type()"
        [formControl]="control()"
        [placeholder]="placeholder()"
        [class.error]="hasError()"
        class="input-field"
      />
      @if (hasError() && errorMessage()) {
        <span class="error-message">{{ errorMessage() }}</span>
      }
    </div>
  `,
  styles: [
    `
      .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
      }

      .input-label {
        display: block;
        color: var(--neutral-300, #d1d5db);
        font-size: 0.9rem;
        font-weight: 500;
      }

      .input-field {
        width: 100%;
        padding: 0.75rem 1rem;
        background-color: var(--neutral-800, #1f2937);
        border: 2px solid var(--neutral-700, #374151);
        border-radius: var(--radius, 8px);
        color: var(--white, #ffffff);
        font-size: 1rem;
        font-family: inherit;
        transition: all 0.3s ease;
      }

      .input-field:focus {
        outline: none;
        border-color: var(--primary, #667eea);
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      .input-field.error {
        border-color: #ef4444;
      }

      .input-field.error:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }

      .input-field::placeholder {
        color: var(--neutral-500, #6b7280);
      }

      .error-message {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: -0.25rem;
      }

      .input-field:-webkit-autofill,
      .input-field:-webkit-autofill:hover,
      .input-field:-webkit-autofill:focus {
        -webkit-text-fill-color: var(--white, #ffffff);
        -webkit-box-shadow: 0 0 0 1000px var(--neutral-800, #1f2937) inset;
        transition: background-color 5000s ease-in-out 0s;
      }
    `,
  ],
})
export class InputComponent {
  private errorMessageService = inject(ErrorMessageService);

  control = input.required<FormControl>();
  label = input<string>('');
  type = input<InputType>('text');
  id = input<string>('');
  placeholder = input<string>('');

  private errorMessageValue = '';

  constructor() {
    effect(() => {
      const ctrl = this.control();
      if (ctrl) {
        ctrl.statusChanges.subscribe(() => {
          this.updateErrorMessage();
        });
      }
    });
  }

  hasError(): boolean {
    const ctrl = this.control();
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  errorMessage(): string {
    return this.errorMessageValue;
  }

  private updateErrorMessage(): void {
    const ctrl = this.control();
    if (!ctrl || !this.hasError()) {
      this.errorMessageValue = '';
      return;
    }

    const errors = ctrl.errors;
    if (!errors) {
      this.errorMessageValue = '';
      return;
    }

    this.errorMessageValue = this.errorMessageService.mapErrorToMessage(errors);
  }
}
