export interface Ticket {
  id: number;
  title: string;
  description: string;
  assignees: number[];
  task_status: number;
  priority: number;
  post_status: number;
  reporter: number;
  estimate: number;
  start_date: number;
  end_date: number;
  tags: string[];
  created_time: number;
  updated_time: number;
}

export interface Comment {
  id: number;
  tid: number;
  description: string;
  commentor: number;
  created_time: number;
}

export interface StatusHistory {
  id: number;
  tid: number;
  status: number;
  created_time: number;
}
