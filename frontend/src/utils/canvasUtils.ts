import { DrawData } from '../types';
import { FIELD_WIDTH, FIELD_HEIGHT, DRAW_TYPES } from '../constants';

export const drawSoccerField = (ctx: CanvasRenderingContext2D) => {
  // 背景
  ctx.clearRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);
  ctx.fillStyle = '#388e3c';
  ctx.fillRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  
  // 外枠
  ctx.strokeRect(30, 30, FIELD_WIDTH - 60, FIELD_HEIGHT - 60);
  
  // センターライン
  ctx.beginPath();
  ctx.moveTo(FIELD_WIDTH / 2, 30);
  ctx.lineTo(FIELD_WIDTH / 2, FIELD_HEIGHT - 30);
  ctx.stroke();
  
  // センターサークル
  ctx.beginPath();
  ctx.arc(FIELD_WIDTH / 2, FIELD_HEIGHT / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();
  
  // ペナルティエリア
  ctx.strokeRect(30, FIELD_HEIGHT / 2 - 90, 60, 180);
  ctx.strokeRect(FIELD_WIDTH - 90, FIELD_HEIGHT / 2 - 90, 60, 180);
  
  // ゴールエリア
  ctx.strokeRect(30, FIELD_HEIGHT / 2 - 45, 25, 90);
  ctx.strokeRect(FIELD_WIDTH - 55, FIELD_HEIGHT / 2 - 45, 25, 90);
  
  // ペナルティスポット
  ctx.beginPath();
  ctx.arc(30 + 60 + 12, FIELD_HEIGHT / 2, 3, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(FIELD_WIDTH - 90 - 12, FIELD_HEIGHT / 2, 3, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();
  
  // コーナーアーク（フィールド内側向き）
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  
  // 左上コーナー（右下方向の扇）
  ctx.beginPath();
  ctx.arc(30, 30, 10, 0, Math.PI / 2);
  ctx.stroke();
  
  // 右上コーナー（左下方向の扇）
  ctx.beginPath();
  ctx.arc(FIELD_WIDTH - 30, 30, 10, Math.PI / 2, Math.PI);
  ctx.stroke();
  
  // 左下コーナー（右上方向の扇）
  ctx.beginPath();
  ctx.arc(30, FIELD_HEIGHT - 30, 10, -Math.PI / 2, 0);
  ctx.stroke();
  
  // 右下コーナー（左上方向の扇）
  ctx.beginPath();
  ctx.arc(FIELD_WIDTH - 30, FIELD_HEIGHT - 30, 10, Math.PI, 3 * Math.PI / 2);
  ctx.stroke();
};

export const drawBall = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  const radius = 12;
  
  // ボールの影
  ctx.beginPath();
  ctx.arc(x + 2, y + 2, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fill();
  
  // ボールの本体（白）
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // 参考サイト風のサッカーボールパターン
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1.5;
  ctx.fillStyle = '#000';
  
  // 中央の黒い五角形（正確な五角形）
  ctx.beginPath();
  const centerPentSize = 4;
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const px = x + Math.cos(angle) * centerPentSize;
    const py = y + Math.sin(angle) * centerPentSize;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  
  // 中央の五角形から各頂点に伸びる線
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const startX = x + Math.cos(angle) * centerPentSize;
    const startY = y + Math.sin(angle) * centerPentSize;
    const endX = x + Math.cos(angle) * (radius - 2);
    const endY = y + Math.sin(angle) * (radius - 2);
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
  
  // 六角形のパターンを作るための補助線
  for (let i = 0; i < 5; i++) {
    const angle1 = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const angle2 = ((i + 1) * 2 * Math.PI) / 5 - Math.PI / 2;
    
    const x1 = x + Math.cos(angle1) * (radius - 2);
    const y1 = y + Math.sin(angle1) * (radius - 2);
    const x2 = x + Math.cos(angle2) * (radius - 2);
    const y2 = y + Math.sin(angle2) * (radius - 2);
    
    // 外側の六角形の一部
    const midAngle = (angle1 + angle2) / 2;
    const midX = x + Math.cos(midAngle) * (radius - 1);
    const midY = y + Math.sin(midAngle) * (radius - 1);
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(midX, midY);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
};

export const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
  // プレイヤーの影
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.ellipse(x + 1, y + 12, 6, 2, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // シンプルな一色のプレーヤー
  const playerColor = color === 'blue' ? '#1976d2' : '#d32f2f';
  
  // 足
  ctx.strokeStyle = playerColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 2, y + 6);
  ctx.lineTo(x - 3, y + 12);
  ctx.moveTo(x + 2, y + 6);
  ctx.lineTo(x + 3, y + 12);
  ctx.stroke();
  
  // 体
  ctx.fillStyle = playerColor;
  ctx.beginPath();
  ctx.ellipse(x, y, 5, 8, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // 頭
  ctx.beginPath();
  ctx.arc(x, y - 8, 5, 0, 2 * Math.PI);
  ctx.fill();
  

};

export const drawPath = (ctx: CanvasRenderingContext2D, points: { x: number; y: number }[], color: string) => {
  if (points.length < 2) return;
  
  // 線の描画
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // 線に影を追加
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 3;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
  
  // 影をリセット
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  // より目立つ矢印（ドラッグ全体の方向を使用）
  if (points.length > 1) {
    // 矢印の角度を計算（全体のドラッグ方向を使用）
    let angle: number;
    
    if (points.length === 2) {
      // 2点の場合は単純に最初と最後の点を使用
      const startPoint = points[0];
      const endPoint = points[points.length - 1];
      angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
    } else {
      // 3点以上の場合は、開始点から一定距離以上離れた点を基準にする
      const startPoint = points[0];
      const endPoint = points[points.length - 1];
      
      // 開始点から十分に離れた点を見つける
      let referencePoint = endPoint;
      const minDistance = 20; // 最小距離の閾値
      
      for (let i = points.length - 1; i >= 0; i--) {
        const point = points[i];
        const distance = Math.sqrt(
          Math.pow(point.x - startPoint.x, 2) + Math.pow(point.y - startPoint.y, 2)
        );
        
        if (distance >= minDistance) {
          referencePoint = point;
          break;
        }
      }
      
      // 開始点と基準点の間の角度を計算
      angle = Math.atan2(referencePoint.y - startPoint.y, referencePoint.x - startPoint.x);
    }
    
    const p2 = points[points.length - 1];
    const arrowSize = 16;
    
    // 正三角形の矢印
    ctx.fillStyle = color;
    ctx.beginPath();
    
    // 先端の点（頂点A）
    ctx.moveTo(p2.x, p2.y);
    
    // 正三角形の他の2つの頂点を計算
    // 矢印方向の反対方向を基準として、そこから±60度の位置に配置
    const baseAngle = angle + Math.PI; // 矢印方向の反対
    const leftAngle = baseAngle - Math.PI / 3;  // -60度
    const rightAngle = baseAngle + Math.PI / 3; // +60度
    
    const leftX = p2.x + arrowSize * Math.cos(leftAngle);
    const leftY = p2.y + arrowSize * Math.sin(leftAngle);
    const rightX = p2.x + arrowSize * Math.cos(rightAngle);
    const rightY = p2.y + arrowSize * Math.sin(rightAngle);
    
    ctx.lineTo(leftX, leftY);
    ctx.lineTo(rightX, rightY);
    ctx.closePath();
    ctx.fill();
  }
};

export const drawElements = (ctx: CanvasRenderingContext2D, elements: DrawData[]) => {
  elements.forEach(element => {
    if (element.type === 'circle') {
      const pos = element.data[0];
      if (element.color === 'black') {
        drawBall(ctx, pos.x, pos.y);
      } else {
        drawPlayer(ctx, pos.x, pos.y, element.color);
      }
    } else if (element.type === 'path') {
      drawPath(ctx, element.data, element.color);
    }
  });
}; 