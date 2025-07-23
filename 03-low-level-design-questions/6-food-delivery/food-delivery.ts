/**
 * Food Delivery System (like UberEats/DoorDash) - Low Level Design
 * 
 * Requirements:
 * 1. Restaurant and menu management
 * 2. Order placement and tracking
 * 3. Delivery partner assignment
 * 4. Payment processing
 * 5. Real-time order tracking
 * 
 * API ENDPOINTS:
 * GET /restaurants/search - Search restaurants
 * GET /restaurants/{restaurantId}/menu - Get restaurant menu
 * POST /orders - Place order
 * GET /orders/{orderId} - Get order details
 * PUT /orders/{orderId}/confirm - Confirm order
 * PUT /orders/{orderId}/status - Update order status
 * POST /delivery/assign - Assign delivery partner
 * PUT /delivery/{orderId}/complete - Complete delivery
 * 
 * DATABASE TABLES:
 * users: id, name, email, phone, user_type, created_at
 * restaurants: id, name, address, phone, cuisine_type, is_open, delivery_radius
 * menu_items: id, restaurant_id, name, description, price, category, is_available
 * orders: id, customer_id, restaurant_id, delivery_address, status, total_amount, created_at
 * order_items: id, order_id, menu_item_id, quantity, unit_price, special_instructions
 * delivery_partners: id, user_id, vehicle_type, current_location, status, rating
 * payments: id, order_id, amount, method, status, transaction_id, created_at
 */

// Enums and Types
enum OrderStatus {
  PLACED = 'PLACED',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

enum UserType {
  CUSTOMER = 'CUSTOMER',
  RESTAURANT_OWNER = 'RESTAURANT_OWNER',
  DELIVERY_PARTNER = 'DELIVERY_PARTNER'
}

enum DeliveryPartnerStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE'
}

// Core Domain Models
interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  zipCode: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
  isActive: boolean;
}

interface Customer extends User {
  savedAddresses: Location[];
  paymentMethods: PaymentMethod[];
}

interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: Location;
  ownerId: string;
  cuisineType: string;
  rating: number;
  isOpen: boolean;
  openingHours: OpeningHours[];
  deliveryRadius: number; // in km
}

interface OpeningHours {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  openTime: string; // "09:00"
  closeTime: string; // "22:00"
}

interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVegetarian: boolean;
  isAvailable: boolean;
  preparationTime: number; // in minutes
  image?: string;
}

interface CartItem {
  menuItemId: string;
  quantity: number;
  specialInstructions?: string;
}

interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  items: OrderItem[];
  deliveryAddress: Location;
  status: OrderStatus;
  totalAmount: number;
  deliveryFee: number;
  tax: number;
  placedAt: Date;
  estimatedDeliveryTime?: Date;
  deliveryPartnerId?: string;
  paymentId?: string;
}

interface OrderItem {
  menuItemId: string;
  quantity: number;
  unitPrice: number;
  specialInstructions?: string;
}

interface DeliveryPartner extends User {
  vehicleType: string;
  licenseNumber: string;
  currentLocation: Location;
  status: DeliveryPartnerStatus;
  rating: number;
}

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  processedAt?: Date;
}

interface PaymentMethod {
  id: string;
  type: 'CREDIT_CARD' | 'DEBIT_CARD' | 'DIGITAL_WALLET' | 'CASH';
  details: any; // Card details, wallet info, etc.
}

enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

// Repository Interfaces
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

interface RestaurantRepository {
  findById(id: string): Promise<Restaurant | null>;
  findNearby(location: Location, radius: number): Promise<Restaurant[]>;
  findByOwnerId(ownerId: string): Promise<Restaurant[]>;
  save(restaurant: Restaurant): Promise<void>;
}

interface MenuRepository {
  findByRestaurant(restaurantId: string): Promise<MenuItem[]>;
  findById(itemId: string): Promise<MenuItem | null>;
  save(item: MenuItem): Promise<void>;
  updateAvailability(itemId: string, isAvailable: boolean): Promise<void>;
}

interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(orderId: string): Promise<Order | null>;
  findByCustomer(customerId: string): Promise<Order[]>;
  findByRestaurant(restaurantId: string): Promise<Order[]>;
  findByDeliveryPartner(partnerId: string): Promise<Order[]>;
  update(order: Order): Promise<void>;
}

interface DeliveryPartnerRepository {
  findById(id: string): Promise<DeliveryPartner | null>;
  findAvailableNearby(location: Location, radius: number): Promise<DeliveryPartner[]>;
  updateLocation(partnerId: string, location: Location): Promise<void>;
  updateStatus(partnerId: string, status: DeliveryPartnerStatus): Promise<void>;
}

// Service Interfaces
interface LocationService {
  calculateDistance(from: Location, to: Location): Promise<number>;
  calculateDeliveryTime(distance: number, trafficFactor: number): Promise<number>;
  validateAddress(address: Location): Promise<boolean>;
}

interface PricingService {
  calculateDeliveryFee(distance: number, orderAmount: number): Promise<number>;
  calculateTax(orderAmount: number, location: Location): Promise<number>;
  calculateTotalAmount(items: CartItem[], deliveryFee: number, tax: number): Promise<number>;
}

interface NotificationService {
  notifyCustomer(customerId: string, message: string): Promise<void>;
  notifyRestaurant(restaurantId: string, message: string): Promise<void>;
  notifyDeliveryPartner(partnerId: string, message: string): Promise<void>;
}

interface PaymentService {
  processPayment(payment: Payment): Promise<boolean>;
  refundPayment(paymentId: string, amount: number): Promise<boolean>;
}

// Strategy Pattern for Delivery Partner Assignment
interface DeliveryAssignmentStrategy {
  assignDeliveryPartner(availablePartners: DeliveryPartner[], order: Order): Promise<DeliveryPartner | null>;
}

class NearestPartnerStrategy implements DeliveryAssignmentStrategy {
  async assignDeliveryPartner(availablePartners: DeliveryPartner[], order: Order): Promise<DeliveryPartner | null> {
    // Find nearest available delivery partner
    throw new Error('Implementation needed');
  }
}

class HighestRatedPartnerStrategy implements DeliveryAssignmentStrategy {
  async assignDeliveryPartner(availablePartners: DeliveryPartner[], order: Order): Promise<DeliveryPartner | null> {
    // Find highest rated available delivery partner
    throw new Error('Implementation needed');
  }
}

// Main Food Delivery Service
class FoodDeliveryService {
  constructor(
    private userRepository: UserRepository,
    private restaurantRepository: RestaurantRepository,
    private menuRepository: MenuRepository,
    private orderRepository: OrderRepository,
    private deliveryPartnerRepository: DeliveryPartnerRepository,
    private locationService: LocationService,
    private pricingService: PricingService,
    private notificationService: NotificationService,
    private paymentService: PaymentService,
    private deliveryAssignmentStrategy: DeliveryAssignmentStrategy
  ) {}

  async searchRestaurants(customerLocation: Location, cuisineType?: string): Promise<Restaurant[]> {
    // Search restaurants by location and cuisine type
    throw new Error('Implementation needed');
  }

  async getRestaurantMenu(restaurantId: string): Promise<MenuItem[]> {
    // Get restaurant menu items
    throw new Error('Implementation needed');
  }

  async placeOrder(customerId: string, restaurantId: string, cartItems: CartItem[], deliveryAddress: Location, paymentMethodId: string): Promise<Order> {
    // Validate order, process payment, create order
    throw new Error('Implementation needed');
  }

  async confirmOrder(orderId: string, restaurantId: string, preparationTime: number): Promise<Order> {
    // Confirm order and set estimated delivery time
    throw new Error('Implementation needed');
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    // Update order status and handle status-specific logic
    throw new Error('Implementation needed');
  }

  async assignDeliveryPartner(order: Order): Promise<void> {
    // Assign delivery partner using strategy
    throw new Error('Implementation needed');
  }

  async completeDelivery(orderId: string, deliveryPartnerId: string): Promise<Order> {
    // Complete delivery and notify customer
    throw new Error('Implementation needed');
  }

  async cancelOrder(orderId: string, userId: string): Promise<Order> {
    // Cancel order and process refund
    throw new Error('Implementation needed');
  }

  async getUserOrders(userId: string, userType: UserType): Promise<Order[]> {
    // Get orders for customer, delivery partner, or restaurant
    throw new Error('Implementation needed');
  }
}

/**
 * Key Design Patterns Used:
 * 1. Strategy Pattern - Delivery partner assignment strategies
 * 2. Repository Pattern - Data access abstraction
 * 3. State Pattern - Order status management
 * 4. Observer Pattern - Real-time notifications
 * 5. Factory Pattern - Service creation
 * 
 * Scalability Considerations:
 * - Geospatial indexing for location-based queries
 * - Event-driven architecture for real-time updates
 * - Caching for restaurant and menu data
 * - Message queues for order processing
 * - Load balancing for high availability
 */

export { 
  FoodDeliveryService,
  type Order, 
  type Restaurant, 
  type MenuItem,
  type CartItem,
  OrderStatus,
  UserType,
  DeliveryPartnerStatus 
}; 