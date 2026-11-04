import type { Key } from 'react';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

export type UseVirtualizedTableOptions = {
  rowCount: number;
  estimateRowSize: number | ((index: number) => number);
  overscan?: number;
  getRowKey?: (index: number) => Key;
};

export function useVirtualizedTable({
  rowCount,
  estimateRowSize,
  overscan = 5,
  getRowKey,
}: UseVirtualizedTableOptions) {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: typeof estimateRowSize === 'number' ? () => estimateRowSize : estimateRowSize,
    getItemKey: getRowKey,
    overscan,
    useFlushSync: false,
  });

  return { scrollElementRef, virtualizer };
}
