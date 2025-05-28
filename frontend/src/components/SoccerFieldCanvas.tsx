import React, { useRef, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, Button } from '@mui/material';

const FIELD_WIDTH = 600;
const FIELD_HEIGHT = 400;

// 描画データ型
interface DrawData {
  type: 'circle' | 'path';
  color: string;
  data: { x: number, y: number }[] | { x: number, y: number }[];
}

const drawTypes = [
  { key: 'friend', label: '味方(青)', color: 'blue', type: 'circle' },
  { key: 'enemy', label: '相手(赤)', color: 'red', type: 'circle' },
  { key: 'ball', label: 'ボール(黒)', color: 'black', type: 'circle' },
  { key: 'path', label: '線(黄)', color: 'yellow', type: 'path' },
];

const SoccerFieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawMode, setDrawMode] = useState('friend');
  const [drawing, setDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<{ x: number, y: number }[]>([]);
  const [history, setHistory] = useState<DrawData[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // 描画処理
  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const drawAll = (dataToDraw: DrawData[]) => {
      // 背景
      ctx.clearRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);
      ctx.fillStyle = '#388e3c';
      ctx.fillRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      // 外枠
      ctx.strokeRect(30, 30, FIELD_WIDTH-60, FIELD_HEIGHT-60);
      // センターライン
      ctx.beginPath();
      ctx.moveTo(FIELD_WIDTH/2, 30);
      ctx.lineTo(FIELD_WIDTH/2, FIELD_HEIGHT-30);
      ctx.stroke();
      // センターサークル
      ctx.beginPath();
      ctx.arc(FIELD_WIDTH/2, FIELD_HEIGHT/2, 60, 0, 2*Math.PI);
      ctx.stroke();
      // ペナルティエリア
      ctx.strokeRect(30, FIELD_HEIGHT/2-90, 60, 180);
      ctx.strokeRect(FIELD_WIDTH-90, FIELD_HEIGHT/2-90, 60, 180);
      // ゴールエリア
      ctx.strokeRect(30, FIELD_HEIGHT/2-45, 25, 90);
      ctx.strokeRect(FIELD_WIDTH-55, FIELD_HEIGHT/2-45, 25, 90);
      // ペナルティスポット
      ctx.beginPath();
      ctx.arc(30+60+12, FIELD_HEIGHT/2, 3, 0, 2*Math.PI);
      ctx.fillStyle = '#fff'; ctx.fill();
      ctx.beginPath();
      ctx.arc(FIELD_WIDTH-90-12, FIELD_HEIGHT/2, 3, 0, 2*Math.PI);
      ctx.fillStyle = '#fff'; ctx.fill();
      // コーナーアーク
      [30, FIELD_WIDTH-30].forEach(x => {
        [30, FIELD_HEIGHT-30].forEach(y => {
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, 0.5*Math.PI);
          ctx.stroke();
        });
      });

      // 描画データ
      dataToDraw.forEach(d => {
        ctx.beginPath();
        if (d.type === 'circle') {
          const pos = d.data[0];
          if (d.color === 'black') { // ボールの場合
            // ボールっぽい描画（例: 白い円に黒い線をいくつか描画）
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 8, 0, 2*Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 8, 0, Math.PI / 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 8, Math.PI, Math.PI * 1.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y - 8);
            ctx.lineTo(pos.x, pos.y + 8);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pos.x - 8, pos.y);
            ctx.lineTo(pos.x + 8, pos.y);
            ctx.stroke();

          } else {
            // 味方・相手の場合
            ctx.arc(pos.x, pos.y, 10, 0, 2*Math.PI);
            ctx.fillStyle = d.color;
            ctx.fill();
          }
        } else if (d.type === 'path') {
          ctx.strokeStyle = d.color;
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.moveTo(d.data[0].x, d.data[0].y);
          for (let i = 1; i < d.data.length; i++) {
            ctx.lineTo(d.data[i].x, d.data[i].y);
          }
          ctx.stroke();
          // 矢印
          if (d.data.length > 1) {
            const p1 = d.data[d.data.length - 2];
            const p2 = d.data[d.data.length - 1];
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            const arrowSize = 8;
            ctx.beginPath();
            ctx.fillStyle = d.color;
            ctx.moveTo(p2.x, p2.y);
            ctx.lineTo(p2.x - arrowSize * Math.cos(angle - Math.PI / 6), p2.y - arrowSize * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(p2.x - arrowSize * Math.cos(angle + Math.PI / 6), p2.y - arrowSize * Math.sin(angle + Math.PI / 6));
            ctx.closePath();
            ctx.fill();
          }
        }
      });
    };

    drawAll(history[historyIndex]);

    // ドラッグ中の線描画
    if (drawing && currentPath.length > 0 && drawMode === 'path') {
      ctx.beginPath();
      ctx.strokeStyle = drawTypes.find(dt => dt.key === drawMode)?.color || 'yellow';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(currentPath[0].x, currentPath[0].y);
      for (let i = 1; i < currentPath.length; i++) {
        ctx.lineTo(currentPath[i].x, currentPath[i].y);
      }
      ctx.stroke();
    }

  }, [history, historyIndex, drawing, currentPath, drawMode]);

  // マウス操作
  const getCanvasCoordinates = (e: React.MouseEvent | MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (drawMode !== 'path') {
      const coords = getCanvasCoordinates(e);
      const newDrawData: DrawData[] = [...history[historyIndex], { type: 'circle', data: [coords], color: drawTypes.find(dt => dt.key === drawMode)?.color || 'blue' }];
      // 履歴に追加
      const newHistory = history.slice(0, historyIndex + 1);
      setHistory([...newHistory, newDrawData]);
      setHistoryIndex(newHistory.length);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (drawMode === 'path') {
      setDrawing(true);
      setCurrentPath([getCanvasCoordinates(e)]);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!drawing) return;
    if (drawMode === 'path') {
      setCurrentPath([...currentPath, getCanvasCoordinates(e)]);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (drawing) {
      if (drawMode === 'path' && currentPath.length > 1) {
        const newDrawData: DrawData[] = [...history[historyIndex], { type: 'path', data: currentPath, color: drawTypes.find(dt => dt.key === drawMode)?.color || 'yellow' }];
        // 履歴に追加
        const newHistory = history.slice(0, historyIndex + 1);
        setHistory([...newHistory, newDrawData]);
        setHistoryIndex(newHistory.length);
      }
      setDrawing(false);
      setCurrentPath([]);
    }
  };

  // グローバルなMouseMove/Upイベントリスナーを設定
  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [drawing, currentPath, drawMode, history, historyIndex]);

  // 右クリックメニュー抑制
  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  // クリア
  const handleClear = () => {
    setHistory([[]]);
    setHistoryIndex(0);
  };

  // Undo/Redo
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  return (
    <div>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <ToggleButtonGroup
          value={drawMode}
          exclusive
          onChange={(event, newValue) => {
            if (newValue !== null) {
              setDrawMode(newValue);
            }
          }}
        >
          {drawTypes.map(dt => (
            <ToggleButton key={dt.key} value={dt.key} size="small">
              {dt.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button onClick={handleUndo} disabled={historyIndex === 0} variant="outlined" size="small">UNDO</Button>
        <Button onClick={handleRedo} disabled={historyIndex === history.length - 1} variant="outlined" size="small">REDO</Button>
        <Button onClick={handleClear} variant="outlined" color="error" size="small">クリア</Button>
      </Box>
      <canvas
        ref={canvasRef}
        width={FIELD_WIDTH}
        height={FIELD_HEIGHT}
        style={{ border: '1px solid #888', background: '#388e3c', cursor: drawMode === 'path' ? 'crosshair' : 'pointer' }}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onContextMenu={handleContextMenu}
      />
      <div style={{fontSize: 12, marginTop: 4, color: '#555'}}>
        選択したモードで配置・描画できます
      </div>
    </div>
  );
};

export default SoccerFieldCanvas; 