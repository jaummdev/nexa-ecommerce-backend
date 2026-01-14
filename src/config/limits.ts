/**
 * Application limits configuration
 * All limits are centralized here for easy management
 */
export const LIMITS = {
  PRODUCTS: {
    MAX: 30,
    MESSAGE: "Maximum limit of 30 products reached",
  },
  BANNERS: {
    MAX: 10,
    MESSAGE: "Maximum limit of 10 banners reached",
  },
  CATEGORIES: {
    MAX: 10,
    MESSAGE: "Maximum limit of 10 categories reached",
  },
  CART: {
    MAX_ITEMS: 10,
    MESSAGE: "Cart can have a maximum of 10 different products",
  },
  ORDERS: {
    MAX_PER_USER: 5,
    MESSAGE: "Maximum limit of 5 orders per user reached",
  },
} as const;
