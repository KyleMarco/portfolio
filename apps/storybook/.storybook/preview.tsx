import type { Preview } from '@storybook/react-vite';
import '../../../packages/ui/src/styles/index.css';

const preview: Preview = {
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
