export type DateCallback = (date: Date) => void;

export interface Calendar {
  init: () => void;
  onMonthChange: DateCallback;
  onDaySelect: DateCallback;
  onHourSelect: DateCallback;
  showAddTodo: () => void;
  save: () => void;
}

export interface TodoItem {
  id?: string;
  creationDate: number;
  status: boolean;
  taskTitle: string;
  description: string;
  startDate: number;
  endDate?: number;
  duration?: number;
  tags: string;

  type?: "task" | "event";

  location?: string;
  isRepeating?: boolean;
  recurrence?: "daily" | "weekly" | "monthly" | "yearly";
}

export type UpdateTodoItem = {
  id: string;
} & Omit<Partial<TodoItem>, "id">;

export interface Filter {
  dateFrom?: number;
  dateTo?: number;
  text?: string;
  status?: boolean;
  tagText?: string;
}

export interface CalendarAPI {
  create: (data: TodoItem) => Promise<string | undefined>;
  read: (filter: Partial<Filter>) => Promise<TodoItem[]>;
  update: (data: UpdateTodoItem) => Promise<TodoItem | undefined>;
  delete: (id: string) => Promise<void>;
}

export const APP_PREFIX = "calendar";
