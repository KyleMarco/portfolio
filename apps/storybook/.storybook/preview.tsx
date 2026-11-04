import type { Preview } from '@storybook/react-vite';
import { ThemePreview } from './ThemePreview';
import './preview.css';

const preview: Preview = {
  initialGlobals: { theme: 'light' },
  globalTypes: {
    theme: {
      description: 'UI color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <ThemePreview theme={context.globals.theme}>
        <Story />
      </ThemePreview>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'warm white',
      values: [
        { name: 'warm white', value: '#fbfaf7' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#1c1917' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
