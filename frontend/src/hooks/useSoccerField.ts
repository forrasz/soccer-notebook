import { useRef, useState, useCallback } from 'react';
import { DrawData } from '../types';
import { DRAW_TYPES } from '../constants';

export const useSoccerField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawMode, setDrawMode] = useState('friend');
  const [drawing, setDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const [history, setHistory] = useState<DrawData[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const getCanvasCoordinates = useCallback((e: React.MouseEvent | MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const addToHistory = useCallback((newDrawData: DrawData[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newDrawData]);
    setHistoryIndex(newHistory.length);
  }, [history, historyIndex]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (drawMode !== 'path') {
      const coords = getCanvasCoordinates(e);
      const drawType = DRAW_TYPES.find(dt => dt.key === drawMode);
      const newDrawData: DrawData[] = [
        ...history[historyIndex], 
        { 
          type: 'circle', 
          data: [coords], 
          color: drawType?.color || 'blue' 
        }
      ];
      addToHistory(newDrawData);
    }
  }, [drawMode, getCanvasCoordinates, history, historyIndex, addToHistory]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (drawMode === 'path') {
      setDrawing(true);
      setCurrentPath([getCanvasCoordinates(e)]);
    }
  }, [drawMode, getCanvasCoordinates]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!drawing || drawMode !== 'path') return;
    setCurrentPath(prev => [...prev, getCanvasCoordinates(e)]);
  }, [drawing, drawMode, getCanvasCoordinates]);

  const handleMouseUp = useCallback(() => {
    if (drawing && drawMode === 'path' && currentPath.length > 1) {
      const drawType = DRAW_TYPES.find(dt => dt.key === drawMode);
      const newDrawData: DrawData[] = [
        ...history[historyIndex], 
        { 
          type: 'path', 
          data: currentPath, 
          color: drawType?.color || 'yellow' 
        }
      ];
      addToHistory(newDrawData);
    }
    setDrawing(false);
    setCurrentPath([]);
  }, [drawing, drawMode, currentPath, history, historyIndex, addToHistory]);

  const handleClear = useCallback(() => {
    addToHistory([]);
  }, [addToHistory]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  }, [historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  }, [historyIndex, history.length]);

  return {
    canvasRef,
    drawMode,
    setDrawMode,
    drawing,
    currentPath,
    history,
    historyIndex,
    handleCanvasClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleClear,
    handleUndo,
    handleRedo,
  };
}; 