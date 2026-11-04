import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import {
  VirtualizedGrid,
  VirtualizedList,
  VirtualizedTable,
  type VirtualizedTableColumn,
} from '@portfolio/ui/virtualized';

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(100);
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(200);
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(20);
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
    new DOMRect(0, 0, 200, 20),
  );
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('VirtualizedList', () => {
  it('renders visible items and exposes their positions to assistive technology', () => {
    const items = Array.from({ length: 1000 }, (_, index) => `Record ${index + 1}`);

    render(
      <VirtualizedList
        items={items}
        estimateSize={20}
        overscan={0}
        height={100}
        ariaLabel="Records"
        renderItem={(item) => item}
      />,
    );

    expect(screen.getByRole('list', { name: 'Records' })).toBeTruthy();
    const firstItem = screen.getAllByRole('listitem')[0]!;

    expect(firstItem.textContent).toBe('Record 1');
    expect(firstItem.getAttribute('aria-posinset')).toBe('1');
    expect(firstItem.getAttribute('aria-setsize')).toBe('1000');
    expect(screen.queryByText('Record 1000')).toBeNull();
  });
});

describe('VirtualizedGrid', () => {
  it('virtualizes rows and columns while preserving cell coordinates', () => {
    const items = Array.from({ length: 1000 }, (_, index) => index);

    render(
      <VirtualizedGrid
        items={items}
        columnCount={10}
        estimateRowSize={20}
        estimateColumnSize={50}
        rowOverscan={0}
        columnOverscan={0}
        height={100}
        ariaLabel="Sample grid"
        renderCell={(_item, _index, rowIndex, columnIndex) =>
          `Row ${rowIndex + 1}, column ${columnIndex + 1}`
        }
      />,
    );

    const firstCell = screen.getByRole('gridcell', {
      name: 'Row 1, column 1',
    });

    expect(screen.getByRole('grid', { name: 'Sample grid' }).getAttribute('aria-rowcount')).toBe(
      '100',
    );
    expect(firstCell.getAttribute('aria-rowindex')).toBe('1');
    expect(firstCell.getAttribute('aria-colindex')).toBe('1');
    expect(screen.queryByRole('gridcell', { name: 'Row 100, column 10' })).toBeNull();
  });

  it('does not render empty cells in a partially filled final row', () => {
    const items = Array.from({ length: 11 }, (_, index) => index);

    render(
      <VirtualizedGrid
        items={items}
        columnCount={5}
        estimateRowSize={20}
        estimateColumnSize={50}
        rowOverscan={10}
        columnOverscan={10}
        height={100}
        ariaLabel="Partial grid"
        renderCell={(_item, _index, rowIndex, columnIndex) =>
          `Row ${rowIndex + 1}, column ${columnIndex + 1}`
        }
      />,
    );

    expect(screen.getByRole('grid', { name: 'Partial grid' }).getAttribute('aria-rowcount')).toBe(
      '3',
    );
    expect(screen.getAllByRole('gridcell')).toHaveLength(11);
    expect(screen.getByRole('gridcell', { name: 'Row 3, column 1' })).toBeTruthy();
    expect(screen.queryByRole('gridcell', { name: 'Row 3, column 2' })).toBeNull();
  });
});

describe('VirtualizedTable', () => {
  it('renders the header and virtualized rows with accessible row indices', () => {
    const rows = Array.from({ length: 1000 }, (_, index) => ({
      id: index + 1,
      name: `Person ${index + 1}`,
    }));
    const columns: VirtualizedTableColumn<(typeof rows)[number]>[] = [
      {
        id: 'name',
        header: 'Name',
        renderCell: (row) => row.name,
      },
    ];

    render(
      <VirtualizedTable
        items={rows}
        columns={columns}
        getRowKey={(row) => row.id}
        estimateRowSize={20}
        overscan={0}
        height={100}
        ariaLabel="People"
      />,
    );

    expect(screen.getByRole('table', { name: 'People' }).getAttribute('aria-rowcount')).toBe(
      '1001',
    );
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy();
    expect(screen.getByRole('row', { name: 'Person 1' }).getAttribute('aria-rowindex')).toBe('2');
    expect(screen.queryByRole('cell', { name: 'Person 1000' })).toBeNull();
  });

  it('keeps the header and reports only the header row when there are no items', () => {
    const columns: VirtualizedTableColumn<string>[] = [
      {
        id: 'name',
        header: 'Name',
        renderCell: (item) => item,
      },
    ];

    render(
      <VirtualizedTable
        items={[]}
        columns={columns}
        estimateRowSize={20}
        height={100}
        ariaLabel="Empty people"
      />,
    );

    expect(screen.getByRole('table', { name: 'Empty people' }).getAttribute('aria-rowcount')).toBe(
      '1',
    );
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy();
    expect(screen.getAllByRole('row')).toHaveLength(1);
  });
});
