import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@portfolio/ui';
import { VirtualizedDropdown } from '@portfolio/ui/virtualized';

const records = Array.from({ length: 10000 }, (_, index) => ({
  value: String(index + 1),
  label: `Record ${String(index + 1).padStart(5, '0')}`,
  disabled: (index + 1) % 997 === 0,
}));

const meta = {
  title: 'Shared UI/VirtualizedDropdown',
  component: VirtualizedDropdown,
  tags: ['autodocs'],
  args: {
    id: 'record',
    name: 'record',
    options: records,
    placeholder: 'Choose a record',
    'aria-describedby': 'record-help',
  },
  render: (args) => (
    <div className="grid w-full max-w-md gap-ui-2">
      <label htmlFor={args.id} className="font-semibold">
        Record
      </label>
      <VirtualizedDropdown {...args} />
      <p id="record-help" className="text-sm text-ui-text-muted">
        10,000 records. Use arrow keys, Home, End, or type a record name. Press Enter to select.
      </p>
    </div>
  ),
} satisfies Meta<typeof VirtualizedDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  args: { id: 'controlled-record' },
  render: function ControlledDropdown(args) {
    const [value, setValue] = useState('5000');
    return (
      <div className="grid w-full max-w-md gap-ui-2">
        <label htmlFor={args.id} className="font-semibold">
          Record
        </label>
        <VirtualizedDropdown {...args} value={value} onValueChange={setValue} />
        <p id="record-help" className="text-sm text-ui-text-muted" aria-live="polite">
          Selected value: {value}. Opening the list scrolls to the selected record.
        </p>
        <Button variant="secondary" onClick={() => setValue('9000')}>
          Select record 09000
        </Button>
      </div>
    );
  },
};

export const Form: Story = {
  args: { id: 'form-record', required: true },
  render: function DropdownForm(args) {
    const [submitted, setSubmitted] = useState('');
    return (
      <form
        className="grid w-full max-w-md gap-ui-3"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(String(new FormData(event.currentTarget).get(args.name ?? 'record') ?? ''));
        }}
        onReset={() => setSubmitted('')}
      >
        <label htmlFor={args.id} className="font-semibold">
          Record (required)
        </label>
        <VirtualizedDropdown {...args} />
        <p id="record-help" className="text-sm text-ui-text-muted">
          Submit an empty selection to see validation. Reset restores the placeholder.
        </p>
        <div className="flex flex-wrap gap-ui-2">
          <Button type="submit">Submit</Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
        <p role="status" className="text-sm text-ui-text-muted">
          {submitted ? `Submitted record: ${submitted}` : 'No record submitted.'}
        </p>
      </form>
    );
  },
};

export const Disabled: Story = {
  args: { id: 'disabled-record', disabled: true, defaultValue: '5000' },
};

export const Invalid: Story = {
  args: {
    id: 'invalid-record',
    'aria-invalid': true,
    'aria-describedby': 'record-error',
  },
  render: (args) => (
    <div className="grid w-full max-w-md gap-ui-2">
      <label htmlFor={args.id} className="font-semibold">
        Record
      </label>
      <VirtualizedDropdown {...args} />
      <p id="record-error" className="text-sm text-ui-error">
        Choose an available record.
      </p>
    </div>
  ),
};

export const Empty: Story = {
  args: { id: 'empty-record', options: [], emptyMessage: 'No records available' },
};

export const LongLabels: Story = {
  args: {
    id: 'long-label-record',
    defaultValue: 'long',
    options: [
      {
        value: 'long',
        label:
          'A record with a long descriptive name that remains readable to assistive technology and fits a narrow viewport',
      },
      { value: 'short', label: 'A shorter record' },
      { value: 'unavailable', label: 'An unavailable record', disabled: true },
    ],
  },
};
