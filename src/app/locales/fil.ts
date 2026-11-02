import type { en } from './en';

type LocaleShape<T> = {
  [Key in keyof T]: T[Key] extends string
    ? string
    : T[Key] extends object
      ? LocaleShape<T[Key]>
      : T[Key];
};

export const fil: LocaleShape<typeof en> = {
  translation: {
    navigation: {
      label: 'Pangunahing nabigasyon',
      homeLabel: '{{name}}, pumunta sa home page',
      work: 'Mga gawa',
      about: 'Tungkol',
      experience: 'Karanasan',
      contact: 'Makipag-ugnayan',
      language: 'Wika',
    },
    notFound: {
      title: 'Hindi makita ang pahina',
      description: 'Wala ang pahinang hiniling mo.',
      home: 'Bumalik sa home',
    },
    about: {
      label: 'Tungkol',
      builtWith: 'Ginamit na teknolohiya',
      backHome: 'Bumalik sa home',
      shopDemo: 'Tingnan ang demo ng tindahan',
      highlights: {
        experience: {
          title: 'Propesyonal na karanasan',
          description:
            'Tingnan ang aking karanasan sa frontend development sa iba’t ibang pangkat at yugto ng aking karera.',
        },
        toolkit: {
          title: 'Mga gamit sa frontend',
          description:
            'Alamin ang mga wika, framework, at tool na ginagamit ko sa paggawa ng responsive at madaling panatilihing web interface.',
        },
        education: {
          title: 'Edukasyon at mga interes',
          description:
            'Alamin ang tungkol sa aking edukasyon, pinag-aralan, at mga interes sa labas ng frontend development.',
        },
        storefront: {
          title: 'Interactive na tindahan',
          description:
            'Ipinapakita ng shop page ang pag-browse ng produkto at paggamit ng cart kasama ng portfolio.',
        },
      },
    },
    home: {
      heroEyebrow: 'Frontend development',
      since2017: 'Mula 2017',
      currentlyAt: 'Kasalukuyang nasa',
      heroDescription:
        'Gumagawa ako ng responsive na React interface mula sa mga disenyo sa Figma, nag-iintegrate ng REST API, at nagpapanatili ng moderno at legacy na application.',
      contact: 'Mag-email sa akin',
      selectedWork: 'Tingnan ang mga piling gawa',
      projectsEyebrow: 'Mga piling gawa',
      projectsTitle: 'Mga proyekto',
      aboutEyebrow: 'Profile',
      aboutTitle: 'Tungkol sa akin',
      experienceEyebrow: 'Mga naging trabaho',
      experienceTitle: 'Karanasan',
      source: 'GitHub',
      aboutDescription:
        'Gumawa ako ng responsive na React component mula sa mga disenyo sa Figma at nag-integrate ng API para sa pamamahala ng user at mga tender request.',
      education: 'Edukasyon',
      expertise: 'Kasanayang teknikal',
      technologies: 'Mga teknolohiya',
      contactTitle: 'Makipag-ugnayan',
      resumeLink: 'Tingnan ang PDF ng résumé',
      resumeSubject: 'Paghiling ng résumé',
      backToTop: 'Bumalik sa itaas',
    },
    portfolio: {
      profile: {
        role: 'Senior na Frontend Developer',
        summary:
          'Isa akong senior na frontend developer na may karanasan mula 2017. Gumagawa ako ng responsive na React interface mula sa mga disenyo sa Figma, nag-iintegrate ng REST API, at nagpapanatili ng moderno at legacy na application.',
        tagline: 'UI na may layunin',
        footerRole: 'Frontend Developer',
      },
      present: 'Kasalukuyan',
      projects: {
        storefront: {
          title: 'Interactive na tindahan',
          category: 'Demo ng tindahan',
          description:
            'Demo ng React storefront para sa pag-browse ng produkto, pag-filter ayon sa availability, pagpili ng dami, at paggamit ng cart gamit ang Redux Toolkit at TanStack Query.',
          screenshotAlt: 'Screenshot ng interactive na demo ng tindahan',
          demoLabel: 'Live na demo',
        },
        portfolio: {
          title: 'Portfolio website',
          category: 'Personal na website',
          description:
            'Portfolio gamit ang React at TypeScript na may mga live na demo ng proyekto, detalyadong kasaysayan ng trabaho, at direktang link para makipag-ugnayan.',
          screenshotAlt: 'Screenshot ng portfolio website',
          demoLabel: 'Tingnan ang website',
        },
      },
      experience: {
        kpmg: {
          role: 'Senior na Frontend Developer',
          location: 'Hybrid · Makati City, Pilipinas',
          highlights: {
            reusableComponents:
              'Gumagawa ng mga reusable na frontend component gamit ang ReactJS at TypeScript.',
            apiBackedFeatures:
              'Gumagawa ng responsive na interface at mga feature na gumagamit ng API sa tulong ng React Hooks, TanStack Query, at Redux Toolkit.',
            prototypeMigration:
              'Inilipat ang prototype mula sa Lovable papunta sa repository ng team at iniangkop ito sa kasalukuyang architecture at mga convention.',
            aiWorkflows:
              'Gumagawa ng mga reusable na AI prompt at custom skill para maiangkop ang mga prototype na nilikha ng AI sa production code.',
            dataFetching:
              'Pinamamahalaan ang pagkuha at pag-cache ng data, pati ang asynchronous na pakikipag-ugnayan sa API gamit ang TanStack Query.',
            clientState:
              'Pinamamahalaan ang client-side state ng application gamit ang Redux at Redux Toolkit.',
            responsiveInterfaces:
              'Gumagawa ng responsive na interface gamit ang Tailwind CSS at Material UI.',
            uiTests:
              'Gumagawa at nagpapanatili ng component at UI test gamit ang Jest at React Testing Library.',
            aiAssistedDevelopment:
              'Gumagamit ng GitHub Copilot at AI-assisted workflow para sa pagbuo, pag-refactor, pag-debug, at paggawa ng test sa code.',
            teamCollaboration:
              'Nakikipagtulungan sa iba’t ibang team upang maghatid ng madaling panatilihing frontend solution na tugma sa mga requirement ng proyekto.',
          },
        },
        felix: {
          role: 'Frontend Developer',
          location: 'Remote',
          highlights: {
            reusableComponents:
              'Gumawa ng mga reusable na ReactJS component gamit ang React Hooks, Redux Toolkit, TypeScript, Tailwind CSS, at Sass.',
            figmaImplementation:
              'Isinalin ang mga disenyo sa Figma tungo sa responsive at reusable na UI component.',
            crossFunctionalDelivery:
              'Nakipagtulungan sa mga backend engineer, UI/UX designer, at product manager sa paghahatid ng mga feature.',
            performanceOptimization:
              'Sinuri at pinahusay ang performance gamit ang React Developer Tools, Redux DevTools, at browser debugging tool.',
            automatedTests:
              'Gumawa at nagpapanatili ng mga automated na component at UI test gamit ang Jest at React Testing Library.',
            codeReviews: 'Nagsagawa ng code review at nag-deploy ng mga feature sa production.',
            securityVulnerabilities:
              'Natukoy at inayos ang mga security vulnerability sa NPM package.',
            legacyMaintenance:
              'Nagmigrate ng data gamit ang Laravel at nagpapanatili ng mga legacy application sa pamamagitan ng pag-troubleshoot ng CodeIgniter.',
            userManagement:
              'Gumawa ng mga feature para sa pamamahala ng user at panel sa pamamagitan ng REST API para sa CRUD operations.',
            tenderRequests:
              'Gumawa ng Post Tender Request feature gamit ang REST API para kumuha at magsumite ng mga tender request.',
            semanticVersioning: 'Inilipat ang code repository sa Semantic Versioning.',
          },
        },
        fujitsu: {
          role: 'Application Systems Engineer',
          location: 'Cebu City, Pilipinas',
          highlights: {
            reusablePagesAndComponents:
              'Gumawa ng mga reusable na ReactJS page at UI component gamit ang class component, functional component, at React Hooks.',
            designImplementation:
              'Ginawang functional na ReactJS UI component ang mga disenyo mula sa Adobe XD.',
            performanceTroubleshooting:
              'Pinahusay ang performance ng application at inayos ang mga UI issue gamit ang React Developer Tools, Redux DevTools, at browser debugging tool.',
            teamLeadership:
              'Pinangunahan ang ReactJS project team at tumulong sa development, code review, testing, at paglilipat ng kaalaman.',
            testCases: 'Tumulong sa paggawa at pagpapatakbo ng mga program test case.',
            legacyAnalysis:
              'Sinuri ang mga legacy na VB.NET application at isinalin ang mga detalye ng implementation sa teknikal na specification.',
            reactProjects:
              'Tumulong sa paggawa ng dalawang ReactJS project: isa gamit ang class component, Redux, at Redux-Thunk; at isang proof of concept gamit ang hooks, Redux, at Redux-Saga.',
          },
        },
      },
      skills: {
        frontend: 'Frontend development',
        tools: 'Mga tool at pakikipagtulungan',
        ai: 'AI',
      },
      education: {
        university: { program: 'B.S. sa Computer Science' },
        completed: 'Natapos',
      },
      contact: {
        email: 'Email',
        phone: 'Telepono',
        linkedin: 'LinkedIn',
      },
    },
    shop: {
      pages: 'Mga pahina ng produkto {{position}}',
      previousPage: 'Nakaraang pahina',
      page: 'Pahina {{page}}',
      nextPage: 'Susunod na pahina',
      showing: 'Ipinapakita ang {{from}}–{{to}} sa {{total}} produkto',
      demoNotice: 'Demo lamang · hindi totoong tindahan',
      title: 'Sample na katalogo ng produkto',
      description:
        'Sample na pahina ito gamit ang datos ng produkto at cart mula sa DummyJSON. Walang totoong produktong ibinebenta at walang binibiling pinoproseso.',
      cartCount: '{{count}} item sa cart',
      loading: 'Naglo-load ng mga produkto...',
      error: 'Hindi ma-load ang katalogo ng produkto.',
      all: 'Lahat ng produkto',
      available: 'May stock',
      unavailable: 'Walang stock',
      qty: 'Dami',
      discount: '{{percent}}% bawas',
      maxReached: 'Naabot ang limitasyon',
      add: 'Idagdag sa cart',
      openCart: 'Buksan ang cart, {{count}} item',
      closeCart: 'Isara ang cart',
      cart: 'Cart',
      clear: 'Alisin lahat',
      empty: 'Walang laman ang iyong cart.',
      remove: 'Alisin',
      each: '${{price}} bawat isa',
      items: 'Mga item',
      total: 'Kabuuan',
      added: '{{name}} ay naidagdag sa cart',
    },
  },
};
