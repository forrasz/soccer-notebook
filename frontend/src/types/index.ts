// ユーザー関連の型定義
export interface User {
  id: string;
  email: string;
  name: string;
}

// ノート関連の型定義
export interface Note {
  id: string;
  date: string;
  location: string;
  themes: Theme[];
  records: Record[];
  didList: string[];
  learnedList: string[];
  nextList: string[];
  drawingData?: DrawData[];
}

export interface Theme {
  text: string;
  score: number | null;
}

export interface Record {
  opponent: string;
  score1: string;
  score2: string;
}

// Canvas関連の型定義
export interface DrawData {
  type: 'circle' | 'path';
  color: string;
  data: { x: number; y: number }[];
}

export interface DrawType {
  key: string;
  label: string;
  color: string;
  type: 'circle' | 'path';
}

// フォーム関連の型定義
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
} 