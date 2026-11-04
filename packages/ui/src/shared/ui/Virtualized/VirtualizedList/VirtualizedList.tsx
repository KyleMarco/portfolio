import type { CSSProperties, Key, ReactNode } from 'react';
import { useCallback } from 'react';
import { useVirtualizedList } from './useVirtualizedList';

export type VirtualizedListProps<TItem> = {
  items: readonly TItem[];
  renderItem: (item: TItem, index: number) => ReactNode;
  getItemKey?: (item: TItem, index: number) => Key;
  estimateSize?: number | ((index: number) => number);
  overscan?: number;
  height?: CSSProperties['height'];
  ariaLabel?: string;
  className?: string;
  itemClassName?: string;
};

export function VirtualizedList<TItem>({
  items,
  renderItem,
  getItemKey,
  estimateSize = 48,
  overscan = 5,
  height = 320,
  ariaLabel,
  className = '',
  itemClassName = '',
}: VirtualizedListProps<TItem>) {
  const itemKey = useCallback(
    (index: number) => getItemKey?.(items[index], index) ?? index,
    [getItemKey, items],
  );
  const { scrollElementRef, virtualizer } = useVirtualizedList({
    count: items.length,
    estimateSize,
    overscan,
    getItemKey: itemKey,
  });

  return (
    <div
      ref={scrollElementRef}
      role="list"
      aria-label={ariaLabel}
      className={`overflow-auto ${className}`.trim()}
      style={{ height }}
    >
      <div
        role="presentation"
        style={{
          height: virtualizer.getTotalSize(),
          position: 'relative',
          width: '100%',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index];

          return (
            <div
              key={virtualItem.key}
              ref={virtualizer.measureElement}
              data-index={virtualItem.index}
              role="listitem"
              aria-setsize={items.length}
              aria-posinset={virtualItem.index + 1}
              className={itemClassName}
              style={{
                left: 0,
                position: 'absolute',
                top: 0,
                transform: `translateY(${virtualItem.start}px)`,
                width: '100%',
              }}
            >
              {renderItem(item, virtualItem.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
