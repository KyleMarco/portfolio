import type { Key } from 'react';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

export type UseVirtualizedListOptions = {
  count: number;
  estimateSize: number | ((index: number) => number);
  overscan?: number;
  getItemKey?: (index: number) => Key;
};

export function useVirtualizedList({
  count,
  estimateSize,
  overscan = 5,
  getItemKey,
}: UseVirtualizedListOptions) {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: typeof estimateSize === 'number' ? () => estimateSize : estimateSize,
    getItemKey,
    overscan,
    useFlushSync: false,
  });

  return { scrollElementRef, virtualizer };
}
