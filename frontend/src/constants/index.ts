import { DrawType } from '../types';

// ページネーション設定
export const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20];

// Canvas設定
export const FIELD_WIDTH = 600;
export const FIELD_HEIGHT = 400;

// 描画タイプ設定
export const DRAW_TYPES: DrawType[] = [
  { key: 'friend', label: '味方(青)', color: 'blue', type: 'circle' },
  { key: 'enemy', label: '相手(赤)', color: 'red', type: 'circle' },
  { key: 'ball', label: 'ボール(黒)', color: 'black', type: 'circle' },
  { key: 'path', label: '線(黄)', color: 'yellow', type: 'path' },
];

// 星評価の最大値
export const MAX_STAR_RATING = 3;

// デフォルトテーマ数
export const DEFAULT_THEME_COUNT = 3; 