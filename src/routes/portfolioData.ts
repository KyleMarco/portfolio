export const profile = {
  firstName: 'Kyle Marco',
  lastName: 'Cabiling',
  email: 'kylemarcocabiling@gmail.com',
};

export const projects = [
  {
    id: 'storefront',
    technologies: ['React', 'TypeScript', 'Redux Toolkit', 'TanStack Query', 'Tailwind CSS'],
    screenshot: 'images/storefront-demo.png',
    demoHref: '/demo',
    sourceHref: 'https://github.com/KyleMarco/portfolio',
  },
  {
    id: 'portfolio',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    screenshot: 'images/portfolio-home.png',
    demoHref: '/',
    sourceHref: 'https://github.com/KyleMarco/portfolio',
  },
] as const;

export const experiences = [
  {
    id: 'kpmg',
    company: 'KPMG (RG Manabat & Co.)',
    startDate: { year: 2026, month: 4 },
    endDate: null,
    accent: 'bg-blue-600',
    technologies:
      'ReactJS, TypeScript, TanStack Query, Redux, Redux Toolkit, Tailwind CSS, Material UI, Storybook, Jest, React Testing Library, Git, GitHub Copilot',
    highlights: [
      'reusableComponents',
      'apiBackedFeatures',
      'prototypeMigration',
      'aiWorkflows',
      'dataFetching',
      'clientState',
      'responsiveInterfaces',
      'uiTests',
      'aiAssistedDevelopment',
      'teamCollaboration',
    ],
  },
  {
    id: 'felix',
    company: 'FELIX (ZZ Connect, Inc.)',
    startDate: { year: 2021, month: 7 },
    endDate: { year: 2026, month: 3 },
    accent: 'bg-blue-600',
    technologies:
      'ReactJS, TypeScript, Redux, Redux Toolkit, Tailwind CSS, Sass, Storybook, Jest, React Testing Library, Git, GitHub Copilot',
    highlights: [
      'reusableComponents',
      'figmaImplementation',
      'crossFunctionalDelivery',
      'performanceOptimization',
      'automatedTests',
      'codeReviews',
      'securityVulnerabilities',
      'legacyMaintenance',
      'userManagement',
      'tenderRequests',
      'semanticVersioning',
    ],
  },
  {
    id: 'fujitsu',
    company: 'FUJITSU (WeServ Systems International, Inc.)',
    startDate: { year: 2017, month: 9 },
    endDate: { year: 2021, month: 4 },
    accent: 'bg-blue-600',
    technologies:
      'ReactJS, Redux, Redux-Thunk, Redux-Saga, Material UI, React Hooks, Storybook, Jest, VB.NET',
    highlights: [
      'reusablePagesAndComponents',
      'designImplementation',
      'performanceTroubleshooting',
      'teamLeadership',
      'testCases',
      'legacyAnalysis',
      'reactProjects',
    ],
  },
] as const;

export const skillGroups = [
  {
    id: 'frontend',
    skills: [
      'ReactJS',
      'NextJS',
      'Vite',
      'React Hooks',
      'Redux',
      'Redux Toolkit',
      'Redux-Thunk',
      'Redux-Saga',
      'TanStack Query',
      'JavaScript',
      'TypeScript',
      'Axios',
      'Tailwind CSS',
      'Material UI',
      'Sass',
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
    id: 'tools',
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
      'NPM',
    ],
  },
  { id: 'ai', skills: ['GitHub Copilot', 'Codex'] },
] as const;

export const education = [
  {
    id: 'university',
    institution: 'Visayas State University',
    completedAt: { year: 2017, month: 7 },
    location: 'Baybay City, Leyte, Philippines',
  },
  {
    id: 'highSchool',
    institution: 'Kananga National High School',
    completedAt: { year: 2013, month: 4 },
    location: 'Kananga, Leyte, Philippines',
    completionLabel: 'completed',
  },
] as const;

export const contactCards = [
  {
    id: 'email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    id: 'phone',
    value: '+63 920 601 3973',
    href: 'tel:+639206013973',
  },
  {
    id: 'linkedin',
    value: 'linkedin.com/in/kylemarcocabiling',
    href: 'https://www.linkedin.com/in/kylemarcocabiling',
  },
];
