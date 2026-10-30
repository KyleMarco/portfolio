export const profile = {
  firstName: 'Kyle Marco',
  lastName: 'Cabiling',
  role: 'Senior Frontend Developer',
  summary:
    'I work across React component design, API integration, and state management, with experience maintaining applications from prototypes through production.',
  monogramPrimary: 'KM',
  monogramAccent: 'C',
  tagline: 'UI with intention',
  footerRole: 'Frontend Developer',
  email: 'kylemarcocabiling@gmail.com',
};

export const projects = [
  {
    title: 'Interactive storefront',
    category: 'Commerce demo',
    description:
      'A React storefront demo with product browsing, availability filters, quantity selection, and a working cart flow, using Redux Toolkit and TanStack Query.',
    technologies: ['React', 'TypeScript', 'Redux Toolkit', 'TanStack Query', 'Tailwind CSS'],
    screenshot: 'images/storefront-demo.png',
    screenshotAlt: 'Screenshot of the interactive storefront demo',
    demoHref: '/demo',
    demoLabel: 'Live demo',
    sourceHref: 'https://github.com/KyleMarco/portfolio',
  },
  {
    title: 'Portfolio website',
    category: 'Personal site',
    description:
      'A React and TypeScript portfolio with live project demos, a detailed work history, and direct contact links.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    screenshot: 'images/portfolio-home.png',
    screenshotAlt: 'Screenshot of the portfolio website',
    demoHref: '/',
    demoLabel: 'View website',
    sourceHref: 'https://github.com/KyleMarco/portfolio',
  },
] as const;

export const experiences = [
  {
    company: 'KPMG (RG Manabat & Co.)',
    role: 'Senior Frontend Developer',
    dates: 'April 2026 – Present',
    accent: 'bg-blue-600',
    technologies:
      'ReactJS, TypeScript, TanStack Query, Redux, Redux Toolkit, Tailwind CSS, Material UI, Jest, React Testing Library, Git, GitHub Copilot',
    highlights: [
      'Develop scalable, reusable, and maintainable frontend components with ReactJS, TypeScript, and modern frontend practices.',
      'Build interactive, responsive interfaces with functional components and React Hooks, translating business requirements into maintainable solutions.',
      "Migrate a Lovable-generated prototype into the team's standardized repository, aligning it with project architecture, coding conventions, and development standards.",
      'Create reusable AI prompts and custom skills for converting AI-generated prototypes into production-aligned code.',
      'Manage data fetching, caching, and asynchronous API interactions with TanStack Query.',
      'Manage client-side application state with Redux and Redux Toolkit.',
      'Develop responsive interfaces with Tailwind CSS and Material UI.',
      'Write and maintain component and UI tests with Jest and React Testing Library.',
      'Use GitHub Copilot and AI-assisted workflows for code generation, refactoring, debugging, and test creation.',
      'Collaborate across teams to deliver maintainable frontend solutions aligned with project requirements.',
    ],
  },
  {
    company: 'FELIX (ZZ Connect, Inc.)',
    role: 'Frontend Developer',
    dates: 'July 2021 – March 2026',
    accent: 'bg-blue-600',
    technologies:
      'ReactJS, TypeScript, Redux, Redux Toolkit, Tailwind CSS, Sass, Jest, React Testing Library, Git, GitHub Copilot',
    highlights: [
      'Developed reusable ReactJS components with React Hooks, Redux Toolkit, TypeScript, Tailwind CSS, and Sass.',
      'Translated Figma designs into responsive, reusable UI components.',
      'Collaborated with backend engineers, UI/UX designers, and product managers to deliver features.',
      'Diagnosed and optimized performance using React Developer Tools, Redux DevTools, and browser debugging tools.',
      'Developed and maintained automated component and UI tests with Jest and React Testing Library.',
      'Conducted code reviews and deployed features to production.',
      'Identified and resolved NPM package security vulnerabilities.',
      'Migrated data using Laravel and maintained legacy applications by troubleshooting CodeIgniter issues.',
      'Built user and panel management features by integrating REST APIs for CRUD operations.',
      'Developed the Post Tender Request feature by integrating REST APIs for retrieving and submitting tender requests.',
      'Migrated the code repository to Semantic Versioning.',
    ],
  },
  {
    company: 'FUJITSU (WeServ Systems International, Inc.)',
    role: 'Application Systems Engineer',
    dates: 'September 2017 – April 2021',
    location: 'Cebu City, Philippines',
    accent: 'bg-blue-600',
    technologies: 'ReactJS, Redux, Redux-Thunk, Redux-Saga, Material UI, React Hooks, Jest, VB.NET',
    highlights: [
      'Developed reusable ReactJS pages and UI components with class components, functional components, and React Hooks.',
      'Converted Adobe XD designs into functional ReactJS UI components.',
      'Optimized application performance and troubleshot UI issues with React Developer Tools, Redux DevTools, and browser debugging tools.',
      'Led a ReactJS project team, contributing to development, code reviews, testing, and knowledge transfer.',
      'Participated in creating and executing program test cases.',
      'Reverse engineered legacy VB.NET applications and translated implementation details into technical specifications.',
      'Helped build two ReactJS projects: one using class components, Redux, and Redux-Thunk, and a proof of concept using hooks, Redux, and Redux-Saga.',
    ],
  },
];

export const skillGroups = [
  {
    label: 'Frontend development',
    skills: [
      'ReactJS',
      'NextJS',
      'React Hooks',
      'Redux',
      'Redux Toolkit',
      'JavaScript',
      'TypeScript',
      'Axios',
      'Tailwind CSS',
      'Storybook',
      'HTML',
      'CSS',
      'React Testing Library',
      'Jest',
      'Formik',
      'ESLint',
      'TSLint',
      'Prettier',
      'Webpack',
    ],
  },
  {
    label: 'Tools & collaboration',
    skills: [
      'Jira',
      'Redmine',
      'Bitbucket',
      'Git',
      'GitHub',
      'React Developer Tools',
      'Redux DevTools',
      'Browser debugging',
      'Docker',
      'WSL2',
      'Adobe XD',
      'Figma',
      'VS Code',
    ],
  },
  { label: 'AI', skills: ['GitHub Copilot'] },
];

export const education = [
  {
    institution: 'Visayas State University',
    program: 'B.S., Computer Science',
    details: 'July 2017 · Baybay City, Leyte, Philippines',
  },
  {
    institution: 'Kananga National High School',
    details: 'Completed April 2013 · Kananga, Leyte, Philippines',
  },
];

export const contactCards = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: 'Phone',
    value: '+63 920 601 3973',
    href: 'tel:+639206013973',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/kylemarcocabiling',
    href: 'https://www.linkedin.com/in/kylemarcocabiling',
  },
];
