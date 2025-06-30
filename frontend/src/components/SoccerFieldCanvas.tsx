import React, { useEffect } from 'react';
import { Box, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { FIELD_WIDTH, FIELD_HEIGHT, DRAW_TYPES } from '../constants';
import { useSoccerField } from '../hooks/useSoccerField';
import { drawSoccerField, drawElements, drawPath } from '../utils/canvasUtils';

const SoccerFieldCanvas: React.FC = () => {
  const {
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
  } = useSoccerField();

  // 描画処理
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    // フィールドの描画
    drawSoccerField(ctx);
    
    // 描画要素の表示
    drawElements(ctx, history[historyIndex]);

    // ドラッグ中の線描画
    if (drawing && currentPath.length > 0 && drawMode === 'path') {
      const drawType = DRAW_TYPES.find(dt => dt.key === drawMode);
      drawPath(ctx, currentPath, drawType?.color || 'yellow');
    }
  }, [history, historyIndex, drawing, currentPath, drawMode]);

  // マウス操作のイベントリスナー
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (drawing) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [drawing, handleMouseMove, handleMouseUp]);

  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();

  return (
    <Box>
      {/* 描画モード選択 */}
      <Box mb={2}>
        <ToggleButtonGroup
          value={drawMode}
          exclusive
          onChange={(_, newMode) => newMode && setDrawMode(newMode)}
          size="small"
        >
          {DRAW_TYPES.map(drawType => (
            <ToggleButton key={drawType.key} value={drawType.key}>
              {drawType.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* キャンバス */}
      <Box
        position="relative"
        display="inline-block"
        border="2px solid #333"
        borderRadius={1}
        mb={2}
      >
        <canvas
          ref={canvasRef}
          width={FIELD_WIDTH}
          height={FIELD_HEIGHT}
          style={{
            display: 'block',
            cursor: drawMode === 'path' ? 'crosshair' : 'pointer',
          }}
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onContextMenu={handleContextMenu}
        />
      </Box>

      {/* 操作ボタン */}
      <Box display="flex" gap={1} justifyContent="center">
        <Button
          size="small"
          onClick={handleUndo}
          disabled={historyIndex <= 0}
        >
          元に戻す
        </Button>
        <Button
          size="small"
          onClick={handleRedo}
          disabled={historyIndex >= history.length - 1}
        >
          やり直し
        </Button>
        <Button
          size="small"
          color="error"
          onClick={handleClear}
        >
          クリア
        </Button>
      </Box>
    </Box>
  );
};

export default SoccerFieldCanvas; 