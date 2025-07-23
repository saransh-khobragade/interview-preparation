/**
 * Parking Lot System - Low Level Design
 * 
 * Requirements:
 * 1. Multiple vehicle types (car, motorcycle, bus)
 * 2. Multiple spot sizes (compact, large, handicapped)
 * 3. Parking fee calculation
 * 4. Spot availability tracking
 * 5. Entry/exit management
 * 
 * API ENDPOINTS:
 * POST /parking/entry - Vehicle entry
 * POST /parking/exit - Vehicle exit
 * GET /parking/availability - Check available spots
 * GET /parking/tickets/{ticketId} - Get ticket details
 * POST /parking/payment - Process payment
 * GET /parking/lots/{lotId}/status - Get lot status
 * 
 * DATABASE TABLES:
 * parking_lots: id, name, address, total_floors, hourly_rate, created_at
 * parking_floors: id, lot_id, floor_number, total_spots
 * parking_spots: id, floor_id, spot_number, spot_type, is_available, is_handicapped
 * vehicles: id, license_plate, vehicle_type, owner_contact
 * parking_tickets: id, vehicle_id, spot_id, entry_time, exit_time, fee_amount, is_paid
 * payments: id, ticket_id, amount, payment_method, payment_time, transaction_id
 */

// Enums and Types
enum VehicleType {
  MOTORCYCLE = 'MOTORCYCLE',
  CAR = 'CAR',
  BUS = 'BUS'
}

enum SpotType {
  COMPACT = 'COMPACT',
  LARGE = 'LARGE',
  HANDICAPPED = 'HANDICAPPED'
}

enum ParkingStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED'
}

// Core Domain Models
interface Vehicle {
  licensePlate: string;
  type: VehicleType;
  owner?: string;
}

interface ParkingSpot {
  id: string;
  type: SpotType;
  floor: number;
  status: ParkingStatus;
  vehicle?: Vehicle;
}

interface ParkingTicket {
  id: string;
  vehicle: Vehicle;
  spotId: string;
  entryTime: Date;
  exitTime?: Date;
  totalAmount?: number;
  isPaid: boolean;
}

interface ParkingFloor {
  floorNumber: number;
  compactSpots: ParkingSpot[];
  largeSpots: ParkingSpot[];
  handicappedSpots: ParkingSpot[];
}

interface ParkingLot {
  id: string;
  name: string;
  address: string;
  floors: ParkingFloor[];
  hourlyRate: Map<SpotType, number>;
}

// Repository Interfaces
interface ParkingSpotRepository {
  findAvailableSpots(type: SpotType): Promise<ParkingSpot[]>;
  reserveSpot(spotId: string): Promise<void>;
  occupySpot(spotId: string, vehicle: Vehicle): Promise<void>;
  freeSpot(spotId: string): Promise<void>;
  findByVehicle(licensePlate: string): Promise<ParkingSpot | null>;
}

interface TicketRepository {
  save(ticket: ParkingTicket): Promise<void>;
  findById(ticketId: string): Promise<ParkingTicket | null>;
  findByVehicle(licensePlate: string): Promise<ParkingTicket | null>;
  update(ticket: ParkingTicket): Promise<void>;
}

// Service Interfaces
interface PaymentService {
  processPayment(amount: number, paymentMethod: string): Promise<boolean>;
  calculateAmount(ticket: ParkingTicket, hourlyRate: number): number;
}

interface NotificationService {
  sendParkingReminder(vehicle: Vehicle, hoursParked: number): Promise<void>;
  sendExitNotification(ticket: ParkingTicket): Promise<void>;
}

// Strategy Pattern for Spot Finding
interface SpotFindingStrategy {
  findSpot(vehicle: Vehicle, availableSpots: ParkingSpot[]): ParkingSpot | null;
}

class NearestSpotStrategy implements SpotFindingStrategy {
  findSpot(vehicle: Vehicle, availableSpots: ParkingSpot[]): ParkingSpot | null {
    // Find nearest available spot
    throw new Error('Implementation needed');
  }
}

class RandomSpotStrategy implements SpotFindingStrategy {
  findSpot(vehicle: Vehicle, availableSpots: ParkingSpot[]): ParkingSpot | null {
    // Find random available spot
    throw new Error('Implementation needed');
  }
}

// Vehicle to Spot Type Mapping
class VehicleSpotMapper {
  static getCompatibleSpotTypes(vehicleType: VehicleType): SpotType[] {
    // Map vehicle types to compatible spot types
    throw new Error('Implementation needed');
  }
}

// Main Parking System
class ParkingLotService {
  constructor(
    private parkingLot: ParkingLot,
    private spotRepository: ParkingSpotRepository,
    private ticketRepository: TicketRepository,
    private paymentService: PaymentService,
    private notificationService: NotificationService,
    private spotFindingStrategy: SpotFindingStrategy
  ) {}

  async parkVehicle(vehicle: Vehicle): Promise<ParkingTicket> {
    // Find available spot, create ticket, reserve spot
    throw new Error('Implementation needed');
  }

  async exitVehicle(licensePlate: string): Promise<{ ticket: ParkingTicket; amount: number }> {
    // Find ticket, calculate fee, update exit time
    throw new Error('Implementation needed');
  }

  async processPayment(ticketId: string, paymentMethod: string): Promise<boolean> {
    // Process payment, update ticket, free spot
    throw new Error('Implementation needed');
  }

  async findAvailableSpots(vehicleType: VehicleType): Promise<ParkingSpot[]> {
    // Find compatible available spots for vehicle type
    throw new Error('Implementation needed');
  }

  async getParkingStatus(): Promise<{ total: number; occupied: number; available: number }> {
    // Calculate total, occupied, and available spots
    throw new Error('Implementation needed');
  }

  setSpotFindingStrategy(strategy: SpotFindingStrategy): void {
    this.spotFindingStrategy = strategy;
  }
}

// Payment Implementation
class HourlyPaymentService implements PaymentService {
  processPayment(amount: number, paymentMethod: string): Promise<boolean> {
    // Process payment via payment gateway
    throw new Error('Implementation needed');
  }

  calculateAmount(ticket: ParkingTicket, hourlyRate: number): number {
    // Calculate parking fee based on duration and rate
    throw new Error('Implementation needed');
  }
}

// Factory Pattern for Parking Lot Creation
class ParkingLotFactory {
  static createStandardParkingLot(floors: number, spotsPerFloor: number): ParkingLot {
    // Create parking lot with specified floors and spots
    throw new Error('Implementation needed');
  }

  private static createSpots(type: SpotType, floor: number, count: number): ParkingSpot[] {
    // Create parking spots for given type and floor
    throw new Error('Implementation needed');
  }
}

/**
 * Key Design Patterns Used:
 * 1. Strategy Pattern - Different spot finding algorithms
 * 2. Factory Pattern - Parking lot creation
 * 3. Repository Pattern - Data access abstraction
 * 4. State Pattern - Parking spot status management
 * 
 * Scalability Considerations:
 * - Database indexing on vehicle license plates
 * - Caching for spot availability
 * - Event-driven architecture for real-time updates
 * - Payment gateway integration
 */

export { 
  ParkingLotService, 
  ParkingLotFactory, 
  HourlyPaymentService,
  type Vehicle, 
  type ParkingTicket, 
  type ParkingLot,
  VehicleType,
  SpotType 
}; 