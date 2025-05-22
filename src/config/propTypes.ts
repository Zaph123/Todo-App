import { FieldValue, Timestamp } from "firebase/firestore";

// ========== TYPES ==========
export interface Task {
  id: string;
  userId: string | null;
  createdAt: Date | Timestamp | FieldValue | null | undefined;
  content: string;
  imgUrl: string | null;
  isDone: boolean;
  column: ColumnType;
  color: string;
  editedAt?: Date;
  priority: PriorityLevel;
  dueDate: Date | null;
}

export type PriorityLevel = "low" | "medium" | "high";
export type ColumnType = "todo" | "in progress" | "done" | null;

export interface ColumnProps {
  tasks: Task[];
  column: ColumnType;
}

export interface TaskListProps {
  tasks: Task[];
}

export interface TaskCardProps {
  task: Task;
  isEditing: boolean;
  toggleEditForm: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  handleMarkAsDone: (id: string) => void;
}
export interface addTaskProps {
  content: string;
  priority?: PriorityLevel;
  dueDate?: Date | null;
  column?: ColumnType;
}
export interface TaskFormProps {
  onCancel: () => void;
  initialColumn?: ColumnType;
}
export interface GeneralFormProps {
  onCancel: () => void;
  initialColumn?: ColumnType;
}

export interface EditFormProps {
  onCancel: () => void;
  task: Task
}

export interface FormButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant: "submit" | "cancel";
  disabled?: boolean;
}

export interface TodoActionsDropdownProps {
  onDelete: () => void;
  onEdit: () => void;
  onMarkAsDone: () => void;
}

export interface ActionMenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export interface PriorityLevelsProps {
  priority: PriorityLevel;
  setPriority: (priority: PriorityLevel) => void;
}

export interface DueDatePickerProps {
  dueDate: Date | null;
  setDueDate: (date: Date | null) => void;
}

export interface ColumnSelectorProps {
  selectedColumn: ColumnType;
  setSelectedColumn: (column: ColumnType) => void;
}

export interface TaskFormToolsProps {
  autoProgress: boolean;
  priority: PriorityLevel;
  dueDate: Date | null;
  selectedColumn: ColumnType;
  setDueDate: (date: Date | null) => void;
  setSelectedColumn: (column: ColumnType) => void;
  setPriority: (priority: PriorityLevel) => void;
  setAutoProgress: (autoProgress: boolean) => void;
}
