import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from '@portfolio/ui';

const meta = {
  title: 'Shared UI/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  args: {
    id: 'attachment',
    name: 'attachment',
  },
  render: (args) => (
    <div className="grid w-full max-w-md gap-ui-2">
      <label htmlFor={args.id} className="font-semibold">
        Attachment
      </label>
      <FileUpload {...args} />
    </div>
  ),
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  args: {
    id: 'attachments',
    name: 'attachments',
    accept: 'image/*,.pdf',
    multiple: true,
    'aria-describedby': 'attachments-help',
  },
  render: (args) => (
    <div className="grid w-full max-w-md gap-ui-2">
      <label htmlFor={args.id} className="font-semibold">
        Attachments
      </label>
      <FileUpload {...args} />
      <p id="attachments-help" className="text-sm text-ui-text-muted">
        Choose images or PDF documents. You can select more than one file.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    id: 'disabled-attachment',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    id: 'invalid-attachment',
    accept: '.pdf',
    required: true,
    'aria-invalid': true,
    'aria-describedby': 'attachment-error',
  },
  render: (args) => (
    <div className="grid w-full max-w-md gap-ui-2">
      <label htmlFor={args.id} className="font-semibold">
        Attachment (required)
      </label>
      <FileUpload {...args} />
      <p id="attachment-error" className="text-sm text-ui-error">
        Select a PDF document before submitting.
      </p>
    </div>
  ),
};
