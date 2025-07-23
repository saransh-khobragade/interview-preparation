/**
 * Library Management System - Low Level Design
 * 
 * Requirements:
 * 1. Book catalog management
 * 2. Member registration
 * 3. Book borrowing and returning
 * 4. Fine calculation
 * 5. Book reservation
 * 
 * API ENDPOINTS:
 * POST /books - Add new book
 * GET /books/search - Search books
 * POST /members - Register member
 * POST /transactions/borrow - Borrow book
 * POST /transactions/return - Return book
 * POST /reservations - Reserve book
 * GET /members/{memberId}/history - Get borrowing history
 * POST /fines/{fineId}/pay - Pay fine
 * 
 * DATABASE TABLES:
 * books: id, isbn, title, author, publisher, category, status, total_copies, available_copies
 * members: id, name, email, phone, membership_type, registration_date, is_active, current_borrowed_books
 * transactions: id, book_id, member_id, type, transaction_date, due_date, return_date, fine_amount
 * reservations: id, book_id, member_id, reservation_date, expiry_date, is_active
 * fines: id, member_id, transaction_id, amount, reason, created_date, is_paid
 */

// Enums and Types
enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  BORROWED = 'BORROWED',
  RESERVED = 'RESERVED',
  LOST = 'LOST',
  MAINTENANCE = 'MAINTENANCE'
}

enum MembershipType {
  STUDENT = 'STUDENT',
  FACULTY = 'FACULTY',
  STAFF = 'STAFF',
  PUBLIC = 'PUBLIC'
}

enum TransactionType {
  BORROW = 'BORROW',
  RETURN = 'RETURN',
  RESERVE = 'RESERVE',
  RENEW = 'RENEW'
}

// Core Domain Models
interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publishedYear: number;
  category: string;
  pages: number;
  status: BookStatus;
  location: string; // shelf location
}

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipType: MembershipType;
  registrationDate: Date;
  isActive: boolean;
  maxBooksAllowed: number;
  currentBorrowedBooks: number;
}

interface BookTransaction {
  id: string;
  bookId: string;
  memberId: string;
  type: TransactionType;
  transactionDate: Date;
  dueDate?: Date;
  returnDate?: Date;
  fineAmount?: number;
  isReturned: boolean;
}

interface BookReservation {
  id: string;
  bookId: string;
  memberId: string;
  reservationDate: Date;
  expiryDate: Date;
  isActive: boolean;
}

interface Fine {
  id: string;
  memberId: string;
  transactionId: string;
  amount: number;
  reason: string;
  createdDate: Date;
  isPaid: boolean;
}

interface SearchCriteria {
  title?: string;
  author?: string;
  isbn?: string;
  category?: string;
  status?: BookStatus;
}

// Repository Interfaces
interface BookRepository {
  save(book: Book): Promise<void>;
  findById(id: string): Promise<Book | null>;
  findByISBN(isbn: string): Promise<Book | null>;
  search(criteria: SearchCriteria): Promise<Book[]>;
  updateStatus(bookId: string, status: BookStatus): Promise<void>;
  findAvailableBooks(): Promise<Book[]>;
}

interface MemberRepository {
  save(member: Member): Promise<void>;
  findById(id: string): Promise<Member | null>;
  findByEmail(email: string): Promise<Member | null>;
  updateBorrowedCount(memberId: string, count: number): Promise<void>;
  findAll(): Promise<Member[]>;
}

interface TransactionRepository {
  save(transaction: BookTransaction): Promise<void>;
  findById(id: string): Promise<BookTransaction | null>;
  findByMember(memberId: string): Promise<BookTransaction[]>;
  findActiveByBook(bookId: string): Promise<BookTransaction | null>;
  findOverdueTransactions(): Promise<BookTransaction[]>;
  update(transaction: BookTransaction): Promise<void>;
}

interface ReservationRepository {
  save(reservation: BookReservation): Promise<void>;
  findActiveByBook(bookId: string): Promise<BookReservation[]>;
  findByMember(memberId: string): Promise<BookReservation[]>;
  markAsUsed(reservationId: string): Promise<void>;
  findExpiredReservations(): Promise<BookReservation[]>;
}

interface FineRepository {
  save(fine: Fine): Promise<void>;
  findByMember(memberId: string): Promise<Fine[]>;
  markAsPaid(fineId: string): Promise<void>;
  getTotalUnpaidFines(memberId: string): Promise<number>;
}

// Service Interfaces
interface NotificationService {
  sendDueReminderNotification(member: Member, book: Book): Promise<void>;
  sendOverdueNotification(member: Member, book: Book, daysOverdue: number): Promise<void>;
  sendReservationAvailableNotification(member: Member, book: Book): Promise<void>;
}

interface FineCalculationService {
  calculateFine(daysOverdue: number, membershipType: MembershipType): number;
  getMaxFineAmount(membershipType: MembershipType): number;
}

// Strategy Pattern for Fine Calculation
interface FineStrategy {
  calculateFine(daysOverdue: number): number;
}

class StudentFineStrategy implements FineStrategy {
  calculateFine(daysOverdue: number): number {
    // Calculate student fine rates
    throw new Error('Implementation needed');
  }
}

class FacultyFineStrategy implements FineStrategy {
  calculateFine(daysOverdue: number): number {
    // Calculate faculty fine rates
    throw new Error('Implementation needed');
  }
}

class PublicFineStrategy implements FineStrategy {
  calculateFine(daysOverdue: number): number {
    // Calculate public user fine rates
    throw new Error('Implementation needed');
  }
}

// Main Library Service
class LibraryService {
  constructor(
    private bookRepository: BookRepository,
    private memberRepository: MemberRepository,
    private transactionRepository: TransactionRepository,
    private reservationRepository: ReservationRepository,
    private fineRepository: FineRepository,
    private notificationService: NotificationService,
    private fineCalculationService: FineCalculationService
  ) {}

  async addBook(bookDetails: Omit<Book, 'id' | 'status'>): Promise<Book> {
    // Create and save new book
    throw new Error('Implementation needed');
  }

  async registerMember(memberDetails: Omit<Member, 'id' | 'registrationDate' | 'isActive' | 'currentBorrowedBooks'>): Promise<Member> {
    // Create and register new member
    throw new Error('Implementation needed');
  }

  async borrowBook(bookId: string, memberId: string): Promise<BookTransaction> {
    // Validate member, check limits and fines, create transaction
    throw new Error('Implementation needed');
  }

  async returnBook(bookId: string, memberId: string): Promise<{ transaction: BookTransaction; fine?: Fine }> {
    // Process book return, calculate fines, update status
    throw new Error('Implementation needed');
  }

  async reserveBook(bookId: string, memberId: string): Promise<BookReservation> {
    // Reserve book for member if not available
    throw new Error('Implementation needed');
  }

  async searchBooks(criteria: SearchCriteria): Promise<Book[]> {
    // Search books by criteria
    throw new Error('Implementation needed');
  }

  async renewBook(transactionId: string, memberId: string): Promise<BookTransaction> {
    // Renew book borrowing period
    throw new Error('Implementation needed');
  }

  async payFine(fineId: string, memberId: string): Promise<void> {
    // Process fine payment
    throw new Error('Implementation needed');
  }

  async getMemberHistory(memberId: string): Promise<BookTransaction[]> {
    // Get member's borrowing history
    throw new Error('Implementation needed');
  }

  async getOverdueBooks(): Promise<BookTransaction[]> {
    // Get all overdue book transactions
    throw new Error('Implementation needed');
  }




}

// Factory Pattern for creating fine calculation service
class FineCalculationServiceFactory {
  static create(): FineCalculationService {
    // Create fine calculation service with strategies
    throw new Error('Implementation needed');
  }
}

/**
 * Key Design Patterns Used:
 * 1. Repository Pattern - Data access abstraction
 * 2. Strategy Pattern - Fine calculation strategies
 * 3. Factory Pattern - Service creation
 * 4. Command Pattern - Transaction operations
 * 
 * Scalability Considerations:
 * - Database indexing on ISBN, title, author
 * - Caching for frequently searched books
 * - Background jobs for fine calculations
 * - Event-driven notifications
 * - Audit logging for all transactions
 */

export { 
  LibraryService, 
  FineCalculationServiceFactory,
  type Book, 
  type Member, 
  type BookTransaction,
  BookStatus,
  MembershipType,
  TransactionType 
}; 