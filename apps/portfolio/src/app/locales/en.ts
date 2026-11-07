export const en = {
  translation: {
    navigation: {
      label: 'Main navigation',
      homeLabel: '{{name}}, home',
      work: 'Work',
      about: 'About',
      experience: 'Experience',
      contact: 'Contact',
      language: 'Language',
      switchToDark: 'Switch to dark mode',
      switchToLight: 'Switch to light mode',
    },
    notFound: {
      title: 'Page not found',
      description: 'The page you requested does not exist.',
      home: 'Go home',
    },
    about: {
      label: 'About',
      builtWith: 'Built with',
      backHome: 'Back home',
      shopDemo: 'View shop demo',
      highlights: {
        experience: {
          title: 'Professional experience',
          description: 'Browse my frontend career, from early React projects to product team work.',
        },
        toolkit: {
          title: 'Frontend toolkit',
          description:
            'Explore the stack behind my interfaces, from React and TypeScript to testing tools.',
        },
        education: {
          title: 'Education and interests',
          description: 'See my education and interests beyond frontend development.',
        },
        storefront: {
          title: 'Interactive storefront',
          description: 'Browse sample products, filter availability, and manage a cart.',
        },
      },
    },
    home: {
      heroEyebrow: 'Frontend development',
      since2017: 'Since 2017',
      currentExperience: 'Currently at <company>{{company}}</company> as a <role>{{role}}</role>.',
      previousExperience:
        'Previously, I was a {{felixRole}} at <felix>{{felixCompany}}</felix>, and an {{fujitsuRole}} at <fujitsu>{{fujitsuCompany}}</fujitsu>',
      portraitAlt: 'Portrait of {{name}}',
      heroDescription:
        'I turn Figma designs into responsive React interfaces and connect them to REST APIs.',
      contact: 'Email me',
      aboutEyebrow: 'Profile',
      aboutTitle: 'About me',
      experienceEyebrow: 'Where I’ve worked',
      experienceTitle: 'Experience',
      aboutDescription: 'I create thoughtful, user-friendly digital experiences for the web.',
      education: 'Education',
      expertise: 'Technical expertise',
      technologies: 'Technologies',
      contactTitle: 'Contact',
      resumeLink: 'View résumé PDF',
      backToTop: 'Back to top',
    },
    portfolio: {
      profile: {
        role: 'Software Developer',
        summary: 'I’ve built polished frontend experiences across modern and legacy applications.',
        footerRole: 'Frontend Developer',
      },
      present: 'Present',
      experience: {
        kpmg: {
          role: 'Senior Frontend Developer',
          location: 'Hybrid · Makati City, Philippines',
          highlights: {
            reusableComponents: 'Build reusable React components with TypeScript.',
            apiBackedFeatures:
              'Connect product features to REST APIs with React Hooks and Redux Toolkit.',
            prototypeMigration:
              "Adapt Lovable prototypes to the team's architecture and conventions.",
            aiWorkflows:
              'Create reusable prompts and skills that bring AI-generated prototypes closer to production.',
            dataFetching:
              'Handle server-state caching and asynchronous requests with TanStack Query.',
            clientState: 'Manage client-side state with Redux Toolkit.',
            responsiveInterfaces: 'Create responsive layouts with Tailwind CSS and Material UI.',
            uiTests:
              'Write and maintain component and UI tests with Jest and React Testing Library.',
            aiAssistedDevelopment:
              'Use GitHub Copilot and AI-assisted workflows for code generation, refactoring, debugging, and test creation.',
            teamCollaboration:
              'Collaborate across teams to deliver maintainable frontend solutions aligned with project requirements.',
          },
        },
        felix: {
          role: 'Frontend Developer',
          location: 'Remote',
          highlights: {
            reusableComponents:
              'Developed reusable ReactJS components with React Hooks, Redux Toolkit, TypeScript, Tailwind CSS, and Sass.',
            figmaImplementation:
              'Translated Figma designs into responsive, reusable UI components.',
            crossFunctionalDelivery:
              'Collaborated with backend engineers, UI/UX designers, and product managers to deliver features.',
            performanceOptimization:
              'Diagnosed and optimized performance using React Developer Tools, Redux DevTools, and browser debugging tools.',
            automatedTests:
              'Developed and maintained automated component and UI tests with Jest and React Testing Library.',
            codeReviews: 'Conducted code reviews and deployed features to production.',
            securityVulnerabilities:
              'Identified and resolved NPM package security vulnerabilities.',
            legacyMaintenance:
              'Migrated data using Laravel and maintained legacy applications by troubleshooting CodeIgniter issues.',
            userManagement:
              'Built user and panel management features by integrating REST APIs for CRUD operations.',
            tenderRequests:
              'Developed the Post Tender Request feature by integrating REST APIs for retrieving and submitting tender requests.',
            semanticVersioning: 'Migrated the code repository to Semantic Versioning.',
          },
        },
        fujitsu: {
          role: 'Application Systems Engineer',
          location: 'Cebu City, Philippines',
          highlights: {
            reusablePagesAndComponents:
              'Developed reusable ReactJS pages and UI components with class components, functional components, and React Hooks.',
            designImplementation:
              'Converted Adobe XD designs into functional ReactJS UI components.',
            performanceTroubleshooting:
              'Optimized application performance and troubleshot UI issues with React Developer Tools, Redux DevTools, and browser debugging tools.',
            teamLeadership:
              'Led a ReactJS project team, contributing to development, code reviews, testing, and knowledge transfer.',
            testCases: 'Participated in creating and executing program test cases.',
            legacyAnalysis:
              'Reverse engineered legacy VB.NET applications and translated implementation details into technical specifications.',
            reactProjects:
              'Helped build two ReactJS projects: one using class components, Redux, and Redux-Thunk, and a proof of concept using hooks, Redux, and Redux-Saga.',
          },
        },
      },
      skills: {
        frontend: 'Frontend development',
        tools: 'Tools & collaboration',
        ai: 'AI',
      },
      education: {
        university: { program: 'B.S., Computer Science' },
      },
      contact: {
        email: 'Email',
        phone: 'Phone',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
    },
  },
} as const;
