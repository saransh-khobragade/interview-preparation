/**
 * Shopping Cart System (like Amazon/E-commerce) - Low Level Design
 * 
 * Requirements:
 * 1. Add/remove items from cart
 * 2. Inventory management
 * 3. Pricing and discounts
 * 4. Checkout process
 * 5. Order management
 * 
 * API ENDPOINTS:
 * POST /carts/items - Add item to cart
 * DELETE /carts/items/{productId} - Remove item from cart
 * PUT /carts/items/{productId} - Update item quantity
 * GET /carts/{userId} - Get cart details
 * POST /orders/checkout - Checkout cart
 * GET /orders/{orderId} - Get order details
 * GET /products/search - Search products
 * GET /inventory/{productId} - Check inventory
 * 
 * DATABASE TABLES:
 * products: id, name, description, price, category, image_urls, is_active
 * carts: id, user_id, created_at, updated_at
 * cart_items: id, cart_id, product_id, quantity, added_at
 * inventory: id, product_id, available_quantity, reserved_quantity, last_updated
 * orders: id, user_id, total_amount, discount_amount, shipping_address, status, created_at
 * order_items: id, order_id, product_id, quantity, unit_price, total_price
 * addresses: id, user_id, street, city, state, zip_code, country
 */

// Core Domain Models
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrls: string[];
  isActive: boolean;
}

interface CartItem {
  productId: string;
  quantity: number;
  addedAt: Date;
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

interface Inventory {
  productId: string;
  availableQuantity: number;
  reservedQuantity: number;
  lastUpdated: Date;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  shippingAddress: Address;
  status: OrderStatus;
  createdAt: Date;
}

interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

// Repository Interfaces
interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  findByCategory(category: string): Promise<Product[]>;
  search(query: string): Promise<Product[]>;
}

interface CartRepository {
  save(cart: Cart): Promise<void>;
  findByUserId(userId: string): Promise<Cart | null>;
  clear(userId: string): Promise<void>;
}

interface InventoryRepository {
  findByProductId(productId: string): Promise<Inventory | null>;
  reserve(productId: string, quantity: number): Promise<boolean>;
  release(productId: string, quantity: number): Promise<void>;
  updateStock(productId: string, quantity: number): Promise<void>;
}

interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(orderId: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[]>;
}

// Service Interfaces
interface PricingStrategy {
  calculatePrice(items: CartItem[], products: Product[]): Promise<{ subtotal: number; discount: number; total: number }>;
}

interface PaymentService {
  processPayment(amount: number, paymentMethod: string): Promise<{ success: boolean; transactionId?: string }>;
}

interface ShippingService {
  calculateShipping(items: OrderItem[], address: Address): Promise<number>;
  scheduleDelivery(orderId: string, address: Address): Promise<string>; // tracking ID
}

// Strategy Pattern for Pricing
class RegularPricingStrategy implements PricingStrategy {
  async calculatePrice(items: CartItem[], products: Product[]): Promise<{ subtotal: number; discount: number; total: number }> {
    // Calculate regular prices without discounts
    throw new Error('Implementation needed');
  }
}

class MemberPricingStrategy implements PricingStrategy {
  async calculatePrice(items: CartItem[], products: Product[]): Promise<{ subtotal: number; discount: number; total: number }> {
    // Apply member discounts
    throw new Error('Implementation needed');
  }
}

class PromotionalPricingStrategy implements PricingStrategy {
  async calculatePrice(items: CartItem[], products: Product[]): Promise<{ subtotal: number; discount: number; total: number }> {
    // Apply promotional codes and bulk discounts
    throw new Error('Implementation needed');
  }
}

// Main Shopping Cart Service
class ShoppingCartService {
  constructor(
    private cartRepo: CartRepository,
    private productRepo: ProductRepository,
    private inventoryRepo: InventoryRepository,
    private orderRepo: OrderRepository,
    private pricingStrategy: PricingStrategy,
    private paymentService: PaymentService,
    private shippingService: ShippingService
  ) {}

  async addToCart(userId: string, productId: string, quantity: number): Promise<Cart> {
    // Validate product, check inventory, add to cart
    throw new Error('Implementation needed');
  }

  async removeFromCart(userId: string, productId: string): Promise<Cart> {
    // Remove item from cart, release reserved inventory
    throw new Error('Implementation needed');
  }

  async updateQuantity(userId: string, productId: string, quantity: number): Promise<Cart> {
    // Update cart item quantity, adjust inventory reservation
    throw new Error('Implementation needed');
  }

  async getCart(userId: string): Promise<{ cart: Cart; products: Product[]; pricing: any }> {
    // Get cart with product details and pricing
    throw new Error('Implementation needed');
  }

  async checkout(userId: string, shippingAddress: Address, paymentMethod: string): Promise<Order> {
    // Validate cart, process payment, create order, update inventory
    throw new Error('Implementation needed');
  }

  async getOrderHistory(userId: string): Promise<Order[]> {
    // Get user's order history
    throw new Error('Implementation needed');
  }

  setPricingStrategy(strategy: PricingStrategy): void {
    this.pricingStrategy = strategy;
  }
}

// Inventory Management Service
class InventoryService {
  constructor(private inventoryRepo: InventoryRepository) {}

  async checkAvailability(productId: string, requestedQuantity: number): Promise<boolean> {
    // Check if product has sufficient stock
    throw new Error('Implementation needed');
  }

  async reserveInventory(productId: string, quantity: number): Promise<boolean> {
    // Reserve items for cart (temporary hold)
    throw new Error('Implementation needed');
  }

  async confirmReservation(productId: string, quantity: number): Promise<void> {
    // Convert reservation to actual sale
    throw new Error('Implementation needed');
  }

  async releaseReservation(productId: string, quantity: number): Promise<void> {
    // Release reserved items back to available stock
    throw new Error('Implementation needed');
  }
}

/**
 * Key Design Patterns Used:
 * 1. Strategy Pattern - Different pricing strategies
 * 2. Repository Pattern - Data access abstraction
 * 3. State Pattern - Order status management
 * 4. Command Pattern - Cart operations
 * 
 * Scalability Considerations:
 * - Database sharding by user ID
 * - Caching for product catalog
 * - Event-driven inventory updates
 * - Payment gateway integration
 * - Queue-based order processing
 */

export { 
  ShoppingCartService,
  InventoryService,
  RegularPricingStrategy,
  MemberPricingStrategy,
  PromotionalPricingStrategy,
  type Cart,
  type Order,
  type Product,
  OrderStatus
}; 