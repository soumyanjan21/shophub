/**
 * Cart Configuration Constants
 * Centralized configuration for cart-related features
 */

export const CART_CONFIG = {
  /** Tax rate applied to cart subtotal (10%) */
  TAX_RATE: 0.1,

  /** Flat shipping cost */
  SHIPPING_COST: 9.99,

  /** Minimum quantity per item */
  MIN_QUANTITY: 1,

  /** Maximum quantity per item */
  MAX_QUANTITY: 99,

  /** Placeholder image URL for products without images */
  PLACEHOLDER_IMAGE: 'https://placehold.co/100?text=No+Image',
} as const;

export const CART_MESSAGES = {
  REMOVE_CONFIRMATION: 'Are you sure you want to remove this item from your cart?',
  REMOVE_SUCCESS: 'Item removed from cart',
  UPDATE_ERROR: 'Failed to update cart. Please try again.',
  LOAD_ERROR: 'Failed to load cart. Please refresh the page.',
} as const;
