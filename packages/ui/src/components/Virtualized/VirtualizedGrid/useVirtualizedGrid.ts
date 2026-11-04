import { useCallback, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

export type UseVirtualizedGridOptions = {
  rowCount: number;
  columnCount: number;
  estimateRowSize: number | ((index: number) => number);
  estimateColumnSize: number | ((index: number) => number);
  rowOverscan?: number;
  columnOverscan?: number;
};

export function useVirtualizedGrid({
  rowCount,
  columnCount,
  estimateRowSize,
  estimateColumnSize,
  rowOverscan = 3,
  columnOverscan = 2,
}: UseVirtualizedGridOptions) {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const getScrollElement = useCallback(() => scrollElementRef.current, []);
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement,
    estimateSize: typeof estimateRowSize === 'number' ? () => estimateRowSize : estimateRowSize,
    overscan: rowOverscan,
    useFlushSync: false,
  });
  const columnVirtualizer = useVirtualizer({
    count: columnCount,
    getScrollElement,
    estimateSize:
      typeof estimateColumnSize === 'number' ? () => estimateColumnSize : estimateColumnSize,
    horizontal: true,
    overscan: columnOverscan,
    useFlushSync: false,
  });

  return { scrollElementRef, rowVirtualizer, columnVirtualizer };
}
