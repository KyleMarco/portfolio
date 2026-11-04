import type { CSSProperties, Key, ReactNode } from 'react';
import { useCallback } from 'react';
import { useVirtualizedTable } from './useVirtualizedTable';

export type VirtualizedTableColumn<TItem> = {
  id: string;
  header: ReactNode;
  renderCell: (item: TItem, rowIndex: number) => ReactNode;
  width?: number | string;
  className?: string;
};

export type VirtualizedTableProps<TItem> = {
  items: readonly TItem[];
  columns: readonly VirtualizedTableColumn<TItem>[];
  getRowKey?: (item: TItem, rowIndex: number) => Key;
  estimateRowSize?: number | ((index: number) => number);
  overscan?: number;
  height?: CSSProperties['height'];
  ariaLabel?: string;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
};

function getGridTemplate<TItem>(columns: readonly VirtualizedTableColumn<TItem>[]) {
  return columns
    .map((column) => {
      if (typeof column.width === 'number') {
        return `${column.width}px`;
      }

      return column.width ?? 'minmax(0, 1fr)';
    })
    .join(' ');
}

export function VirtualizedTable<TItem>({
  items,
  columns,
  getRowKey,
  estimateRowSize = 48,
  overscan = 5,
  height = 320,
  ariaLabel,
  className = '',
  headerClassName = '',
  rowClassName = '',
}: VirtualizedTableProps<TItem>) {
  const rowKey = useCallback(
    (index: number) => getRowKey?.(items[index], index) ?? index,
    [getRowKey, items],
  );
  const { scrollElementRef, virtualizer } = useVirtualizedTable({
    rowCount: items.length,
    estimateRowSize,
    overscan,
    getRowKey: rowKey,
  });
  const gridTemplateColumns = getGridTemplate(columns);

  return (
    <div
      role="table"
      aria-label={ariaLabel}
      aria-rowcount={items.length + 1}
      aria-colcount={columns.length}
      className={className}
    >
      <div role="rowgroup" className={`border-b border-ui-border ${headerClassName}`.trim()}>
        <div
          role="row"
          className="grid bg-ui-surface-muted text-left text-xs font-semibold uppercase tracking-wide text-ui-text-muted"
          style={{ gridTemplateColumns }}
        >
          {columns.map((column) => (
            <div
              key={column.id}
              role="columnheader"
              className={`px-3 py-2 ${column.className ?? ''}`.trim()}
            >
              {column.header}
            </div>
          ))}
        </div>
      </div>
      <div ref={scrollElementRef} role="rowgroup" className="overflow-auto" style={{ height }}>
        <div
          role="presentation"
          style={{
            height: virtualizer.getTotalSize(),
            position: 'relative',
            width: '100%',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const item = items[virtualRow.index];

            return (
              <div
                key={virtualRow.key}
                ref={virtualizer.measureElement}
                data-index={virtualRow.index}
                role="row"
                aria-rowindex={virtualRow.index + 2}
                className={`grid border-b border-ui-border text-sm text-ui-text ${rowClassName}`.trim()}
                style={{
                  gridTemplateColumns,
                  left: 0,
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: '100%',
                }}
              >
                {columns.map((column) => (
                  <div
                    key={column.id}
                    role="cell"
                    className={`min-w-0 px-3 py-3 ${column.className ?? ''}`.trim()}
                  >
                    {column.renderCell(item, virtualRow.index)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
