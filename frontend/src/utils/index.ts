// 配列操作のユーティリティ関数
export const updateListItem = <T>(list: T[], index: number, value: T): T[] =>
  list.map((item, idx) => idx === index ? value : item);

export const removeListItem = <T>(list: T[], index: number): T[] =>
  list.filter((_, idx) => idx !== index);

export const addListItem = <T>(list: T[], item: T): T[] => [...list, item];

// 数値のバリデーション
export const isValidScore = (score: string): boolean =>
  /^[0-9]*$/.test(score);

// 日付フォーマット
export const formatDate = (date: Date): string =>
  date.toISOString().split('T')[0];

// スコア文字列のサニタイズ
export const sanitizeScore = (score: string): string =>
  score.replace(/[^0-9]/g, ''); 