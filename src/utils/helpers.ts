
import { Product, CartItem, CartCondition } from "../types";

// Calculate distance between two points using Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Calculate delivery fee based on distance
export function calculateDeliveryFee(distance: number): number {
  // 0.5 AZN per kilometer
  return Math.round(distance * 0.5 * 10) / 10;
}

// Calculate subtotal from cart items
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

// Calculate total price including delivery fee
export function calculateTotal(subtotal: number, deliveryFee: number): number {
  return subtotal + deliveryFee;
}

// Apply cart conditions to product list
export function applyCartConditions(
  products: Product[],
  conditions: CartCondition[],
  onlyInStock: boolean = false
): Product[] {
  let filteredProducts = [...products];
  
  // Filter by stock availability if required
  if (onlyInStock) {
    filteredProducts = filteredProducts.filter(product => product.inStock);
  }
  
  // Apply include/exclude conditions
  conditions.forEach(condition => {
    if (condition.type === 'exclude') {
      filteredProducts = filteredProducts.filter(
        product => product.id !== condition.productId
      );
    }
  });
  
  // Add back explicitly included products that might have been filtered out
  const includeConditions = conditions.filter(c => c.type === 'include');
  if (includeConditions.length > 0) {
    const includedProductIds = includeConditions.map(c => c.productId);
    const productsToInclude = products.filter(
      p => includedProductIds.includes(p.id)
    );
    
    // Merge the lists without duplicates
    productsToInclude.forEach(product => {
      if (!filteredProducts.find(p => p.id === product.id)) {
        filteredProducts.push(product);
      }
    });
  }
  
  return filteredProducts;
}

// Format price with currency
export function formatPrice(price: number, currency: string = "AZN"): string {
  return `${price} ${currency}`;
}
