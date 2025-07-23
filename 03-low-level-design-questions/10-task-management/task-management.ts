/**
 * Task Management System (like Jira/Trello) - Low Level Design
 * 
 * Requirements:
 * 1. Create and manage tasks
 * 2. Project organization
 * 3. Task assignment and status tracking
 * 4. Comments and activity logging
 * 5. Search and filtering
 * 
 * API ENDPOINTS:
 * POST /tasks - Create task
 * GET /tasks/{taskId} - Get task details
 * PUT /tasks/{taskId} - Update task
 * POST /tasks/{taskId}/assign - Assign task
 * POST /tasks/{taskId}/comments - Add comment
 * GET /projects/{projectId}/tasks - Get project tasks
 * GET /tasks/search - Search tasks
 * GET /users/{userId}/tasks - Get user tasks
 * 
 * DATABASE TABLES:
 * projects: id, name, description, owner_id, status, created_at
 * project_members: id, project_id, user_id, role, joined_at
 * tasks: id, title, description, project_id, assignee_id, reporter_id, status, priority, type, due_date, created_at
 * comments: id, task_id, author_id, content, created_at, updated_at
 * activity_logs: id, task_id, user_id, action, old_value, new_value, timestamp
 * task_tags: id, task_id, tag
 */

// Core Domain Models
interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assigneeId?: string;
  reporterId: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: TaskType;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  members: ProjectMember[];
  status: ProjectStatus;
  createdAt: Date;
}

interface ProjectMember {
  userId: string;
  role: ProjectRole;
  joinedAt: Date;
}

interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface ActivityLog {
  id: string;
  taskId: string;
  userId: string;
  action: ActivityType;
  oldValue?: string;
  newValue?: string;
  timestamp: Date;
}

interface SearchFilter {
  projectId?: string;
  assigneeId?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  tags?: string[];
  dueDateBefore?: Date;
  dueDateAfter?: Date;
}

enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

enum TaskType {
  FEATURE = 'FEATURE',
  BUG = 'BUG',
  TASK = 'TASK',
  EPIC = 'EPIC'
}

enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  ON_HOLD = 'ON_HOLD'
}

enum ProjectRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER'
}

enum ActivityType {
  CREATED = 'CREATED',
  STATUS_CHANGED = 'STATUS_CHANGED',
  ASSIGNED = 'ASSIGNED',
  COMMENTED = 'COMMENTED',
  PRIORITY_CHANGED = 'PRIORITY_CHANGED',
  DUE_DATE_CHANGED = 'DUE_DATE_CHANGED'
}

// Repository Interfaces
interface TaskRepository {
  save(task: Task): Promise<void>;
  findById(id: string): Promise<Task | null>;
  findByProject(projectId: string): Promise<Task[]>;
  findByAssignee(assigneeId: string): Promise<Task[]>;
  search(filter: SearchFilter): Promise<Task[]>;
  updateStatus(id: string, status: TaskStatus): Promise<void>;
}

interface ProjectRepository {
  save(project: Project): Promise<void>;
  findById(id: string): Promise<Project | null>;
  findByOwnerId(ownerId: string): Promise<Project[]>;
  findByMemberId(memberId: string): Promise<Project[]>;
  addMember(projectId: string, member: ProjectMember): Promise<void>;
  removeMember(projectId: string, userId: string): Promise<void>;
}

interface CommentRepository {
  save(comment: Comment): Promise<void>;
  findByTaskId(taskId: string): Promise<Comment[]>;
  update(comment: Comment): Promise<void>;
  delete(id: string): Promise<void>;
}

interface ActivityLogRepository {
  save(activity: ActivityLog): Promise<void>;
  findByTaskId(taskId: string): Promise<ActivityLog[]>;
  findByUserId(userId: string): Promise<ActivityLog[]>;
}

// Service Interfaces
interface NotificationService {
  notifyTaskAssigned(taskId: string, assigneeId: string): Promise<void>;
  notifyTaskStatusChanged(taskId: string, oldStatus: TaskStatus, newStatus: TaskStatus): Promise<void>;
  notifyTaskCommented(taskId: string, commentId: string): Promise<void>;
  notifyTaskDueSoon(taskId: string): Promise<void>;
}

interface SearchService {
  indexTask(task: Task): Promise<void>;
  searchTasks(query: string, filter: SearchFilter): Promise<Task[]>;
  removeFromIndex(taskId: string): Promise<void>;
}

interface PermissionService {
  canViewTask(userId: string, taskId: string): Promise<boolean>;
  canEditTask(userId: string, taskId: string): Promise<boolean>;
  canDeleteTask(userId: string, taskId: string): Promise<boolean>;
  canManageProject(userId: string, projectId: string): Promise<boolean>;
}

// Strategy Pattern for Task Assignment
interface TaskAssignmentStrategy {
  assignTask(task: Task, projectMembers: ProjectMember[]): Promise<string | null>;
}

class RoundRobinAssignmentStrategy implements TaskAssignmentStrategy {
  private lastAssignedIndex = new Map<string, number>();

  async assignTask(task: Task, projectMembers: ProjectMember[]): Promise<string | null> {
    // Assign tasks in round-robin fashion
    throw new Error('Implementation needed');
  }
}

class WorkloadBasedAssignmentStrategy implements TaskAssignmentStrategy {
  constructor(private taskRepo: TaskRepository) {}

  async assignTask(task: Task, projectMembers: ProjectMember[]): Promise<string | null> {
    // Assign to member with least current workload
    throw new Error('Implementation needed');
  }
}

// Main Task Management Service
class TaskManagementService {
  constructor(
    private taskRepo: TaskRepository,
    private projectRepo: ProjectRepository,
    private commentRepo: CommentRepository,
    private activityRepo: ActivityLogRepository,
    private notificationService: NotificationService,
    private searchService: SearchService,
    private permissionService: PermissionService,
    private assignmentStrategy: TaskAssignmentStrategy
  ) {}

  async createTask(request: {
    title: string;
    description: string;
    projectId: string;
    reporterId: string;
    priority: TaskPriority;
    type: TaskType;
    dueDate?: Date;
    tags?: string[];
  }): Promise<Task> {
    // Create task, log activity, index for search
    throw new Error('Implementation needed');
  }

  async updateTaskStatus(taskId: string, newStatus: TaskStatus, userId: string): Promise<Task> {
    // Update status, log activity, send notifications
    throw new Error('Implementation needed');
  }

  async assignTask(taskId: string, assigneeId: string, assignerId: string): Promise<Task> {
    // Assign task, log activity, notify assignee
    throw new Error('Implementation needed');
  }

  async addComment(taskId: string, authorId: string, content: string): Promise<Comment> {
    // Add comment, log activity, notify stakeholders
    throw new Error('Implementation needed');
  }

  async searchTasks(query: string, filter: SearchFilter, userId: string): Promise<Task[]> {
    // Search tasks with permission filtering
    throw new Error('Implementation needed');
  }

  async getTaskBoard(projectId: string, userId: string): Promise<{ [key in TaskStatus]: Task[] }> {
    // Get tasks organized by status (Kanban board)
    throw new Error('Implementation needed');
  }

  async getTaskActivity(taskId: string, userId: string): Promise<ActivityLog[]> {
    // Get task activity history with permission check
    throw new Error('Implementation needed');
  }

  async getUserTasks(userId: string): Promise<{ assigned: Task[]; reported: Task[] }> {
    // Get tasks assigned to and reported by user
    throw new Error('Implementation needed');
  }

  setAssignmentStrategy(strategy: TaskAssignmentStrategy): void {
    this.assignmentStrategy = strategy;
  }
}

// Project Management Service
class ProjectService {
  constructor(
    private projectRepo: ProjectRepository,
    private permissionService: PermissionService
  ) {}

  async createProject(name: string, description: string, ownerId: string): Promise<Project> {
    // Create project with owner as first member
    throw new Error('Implementation needed');
  }

  async addMember(projectId: string, userId: string, role: ProjectRole, requesterId: string): Promise<void> {
    // Add member with permission check
    throw new Error('Implementation needed');
  }

  async updateMemberRole(projectId: string, userId: string, newRole: ProjectRole, requesterId: string): Promise<void> {
    // Update member role with permission check
    throw new Error('Implementation needed');
  }

  async getProjectMembers(projectId: string): Promise<ProjectMember[]> {
    // Get all project members
    throw new Error('Implementation needed');
  }

  async getUserProjects(userId: string): Promise<Project[]> {
    // Get all projects for user
    throw new Error('Implementation needed');
  }
}

/**
 * Key Design Patterns Used:
 * 1. Strategy Pattern - Task assignment strategies
 * 2. Repository Pattern - Data access abstraction
 * 3. Observer Pattern - Activity logging and notifications
 * 4. Command Pattern - Task operations
 * 5. Factory Pattern - Activity log creation
 * 
 * Scalability Considerations:
 * - Database indexing on frequently queried fields
 * - Caching for project and user data
 * - Search engine integration (Elasticsearch)
 * - Event-driven architecture for notifications
 * - Permission caching to reduce database queries
 */

export { 
  TaskManagementService,
  ProjectService,
  RoundRobinAssignmentStrategy,
  WorkloadBasedAssignmentStrategy,
  type Task,
  type Project,
  type SearchFilter,
  TaskStatus,
  TaskPriority,
  TaskType,
  ProjectRole,
  ActivityType
}; 