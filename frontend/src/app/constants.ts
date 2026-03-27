/**
 * Application-wide constants.
 * Import from here instead of scattering magic strings/values across the codebase.
 */

// ---------------------------------------------------------------------------
// Product Categories
// ---------------------------------------------------------------------------

export const PRODUCT_CATEGORIES = [
  'All',
  'Books',
  'Clothing',
  'Electronics',
  'Furniture',
  'Others',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const DEFAULT_CATEGORY: ProductCategory = 'All';

// ---------------------------------------------------------------------------
// API Routes
// ---------------------------------------------------------------------------

export const API_ROUTES = {
  PRODUCTS: '/api/products',
  CART: '/api/cart',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_REGISTER: '/api/auth/register',
} as const;

// ---------------------------------------------------------------------------
// Local-storage keys
// ---------------------------------------------------------------------------

export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'token',
} as const;

// ---------------------------------------------------------------------------
// Assets / Images
// ---------------------------------------------------------------------------

export const PLACEHOLDER_IMAGE_URL = 'https://placehold.co/400?text=No+Image';
