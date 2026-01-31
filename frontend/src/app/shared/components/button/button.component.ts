import { Component, input, output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button
      [type]="type()"
      [class]="getButtonClasses()"
      [disabled]="disabled() || loading()"
      (click)="handleClick()"
    >
      @if (loading()) {
        <span class="spinner"></span>
      }
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-weight: 600;
        border-radius: var(--radius, 8px);
        transition: all 0.3s ease;
        cursor: pointer;
        border: none;
        font-family: inherit;
      }

      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .size-small {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }

      .size-medium {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      }

      .size-large {
        padding: 1rem 2rem;
        font-size: 1.125rem;
      }

      .variant-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      }

      .variant-primary:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }

      .variant-primary:active:not(:disabled) {
        transform: translateY(0);
      }

      .variant-secondary {
        background-color: var(--neutral-700, #374151);
        color: white;
      }

      .variant-secondary:hover:not(:disabled) {
        background-color: var(--neutral-600, #4b5563);
        transform: translateY(-1px);
      }

      .variant-outline {
        background-color: transparent;
        border: 2px solid var(--primary, #667eea);
        color: var(--primary, #667eea);
      }

      .variant-outline:hover:not(:disabled) {
        background-color: rgba(102, 126, 234, 0.1);
        transform: translateY(-1px);
      }

      .variant-ghost {
        background-color: transparent;
        color: var(--neutral-300, #d1d5db);
      }

      .variant-ghost:hover:not(:disabled) {
        background-color: var(--neutral-800, #1f2937);
      }

      .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('medium');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  clicked = output<Event>();

  getButtonClasses(): string {
    return `variant-${this.variant()} size-${this.size()}`;
  }

  handleClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event as Event);
    }
  }
}
