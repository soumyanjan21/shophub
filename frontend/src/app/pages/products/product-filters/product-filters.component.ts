import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shop-product-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filters">
      <input type="text" placeholder="Search products..." class="search-input" (keydown)="onSearchChange($event)" />
      <select class="category-filter" [value]="selectedCategory" (change)="onCategoryChange($event)">
        @for (category of categories; track category) {
          <option [value]="category">{{ category }}</option>
        }
      </select>
    </div>
  `,
  styles: [
    `
      .filters {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
      }
      .search-input {
        background-color: var(--neutral-800);
        border: 1px solid var(--neutral-700);
        color: var(--white);
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius);
        min-width: 300px;
        font-size: 1rem;
      }
      .category-filter {
        background-color: var(--neutral-800);
        border: 1px solid var(--neutral-700);
        color: var(--white);
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius);
        cursor: pointer;
        font-size: 1rem;
      }
    `
  ]
})
export class ProductFilters {
  @Input() categories: string[] = [];
  @Input() selectedCategory = 'All';
  @Output() categoryChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();

  onCategoryChange(event: Event) {
    this.categoryChange.emit((event.target as HTMLSelectElement).value);
  }

  onSearchChange(event: Event) {
    console.log(event)
    this.searchChange.emit((event.target as HTMLInputElement).value);
  }

}
