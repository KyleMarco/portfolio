import type { CSSProperties, Key, ReactNode } from 'react';
import { useVirtualizedGrid } from './useVirtualizedGrid';

export type VirtualizedGridProps<TItem> = {
  items: readonly TItem[];
  columnCount: number;
  renderCell: (item: TItem, index: number, rowIndex: number, columnIndex: number) => ReactNode;
  getItemKey?: (item: TItem, index: number) => Key;
  estimateRowSize?: number | ((index: number) => number);
  estimateColumnSize?: number | ((index: number) => number);
  rowOverscan?: number;
  columnOverscan?: number;
  height?: CSSProperties['height'];
  ariaLabel?: string;
  className?: string;
  cellClassName?: string;
};

export function VirtualizedGrid<TItem>({
  items,
  columnCount,
  renderCell,
  getItemKey,
  estimateRowSize = 48,
  estimateColumnSize = 160,
  rowOverscan = 3,
  columnOverscan = 2,
  height = 320,
  ariaLabel,
  className = '',
  cellClassName = '',
}: VirtualizedGridProps<TItem>) {
  const hasValidColumnCount = Number.isInteger(columnCount) && columnCount > 0;
  const effectiveColumnCount = hasValidColumnCount ? columnCount : 1;
  const rowCount = hasValidColumnCount ? Math.ceil(items.length / effectiveColumnCount) : 0;
  const { scrollElementRef, rowVirtualizer, columnVirtualizer } = useVirtualizedGrid({
    rowCount,
    columnCount: rowCount > 0 ? effectiveColumnCount : 0,
    estimateRowSize,
    estimateColumnSize,
    rowOverscan,
    columnOverscan,
  });

  if (!hasValidColumnCount) {
    throw new RangeError('VirtualizedGrid columnCount must be a positive integer.');
  }

  const virtualRows = rowVirtualizer.getVirtualItems();
  const virtualColumns = columnVirtualizer.getVirtualItems();

  return (
    <div
      ref={scrollElementRef}
      role="grid"
      aria-label={ariaLabel}
      aria-rowcount={rowCount}
      aria-colcount={columnCount}
      className={`overflow-auto ${className}`.trim()}
      style={{ height }}
    >
      <div
        role="presentation"
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: 'relative',
          width: columnVirtualizer.getTotalSize(),
        }}
      >
        {virtualRows.map((virtualRow) => (
          <div
            key={virtualRow.key}
            role="row"
            aria-rowindex={virtualRow.index + 1}
            style={{
              height: virtualRow.size,
              left: 0,
              position: 'absolute',
              top: 0,
              transform: `translateY(${virtualRow.start}px)`,
              width: columnVirtualizer.getTotalSize(),
            }}
          >
            {virtualColumns.map((virtualColumn) => {
              const index = virtualRow.index * columnCount + virtualColumn.index;

              if (index >= items.length) {
                return null;
              }

              const item = items[index];
              const key = getItemKey?.(item, index) ?? index;
              const style: CSSProperties = {
                height: '100%',
                left: 0,
                position: 'absolute',
                top: 0,
                transform: `translateX(${virtualColumn.start}px)`,
                width: virtualColumn.size,
              };

              return (
                <div
                  key={`${String(key)}:${virtualRow.index}:${virtualColumn.index}`}
                  role="gridcell"
                  aria-rowindex={virtualRow.index + 1}
                  aria-colindex={virtualColumn.index + 1}
                  className={cellClassName}
                  style={style}
                >
                  {renderCell(item, index, virtualRow.index, virtualColumn.index)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
