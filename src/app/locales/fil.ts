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
      switchToDark: 'Lumipat sa madilim na mode',
      switchToLight: 'Lumipat sa maliwanag na mode',
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
            'Tingnan ang takbo ng aking karera sa frontend, mula sa mga unang proyekto sa React hanggang sa trabaho sa mga product team.',
        },
        toolkit: {
          title: 'Mga gamit sa frontend',
          description:
            'Tuklasin ang mga teknolohiyang ginagamit ko sa paggawa ng mga interface, mula sa React at TypeScript hanggang sa mga testing tool.',
        },
        education: {
          title: 'Edukasyon at mga interes',
          description:
            'Tingnan ang aking edukasyon at mga interes sa labas ng frontend development.',
        },
        storefront: {
          title: 'Interactive na tindahan',
          description:
            'Mag-browse ng mga sample na produkto, i-filter ayon sa availability, at pamahalaan ang cart.',
        },
      },
    },
    home: {
      heroEyebrow: 'Frontend development',
      since2017: 'Mula 2017',
      currentlyAt: 'Kasalukuyang nasa',
      heroDescription:
        'Ginagawa kong responsive na React interface ang mga disenyo sa Figma at ikinokonekta ang mga ito sa REST API.',
      contact: 'Mag-email sa akin',
      aboutEyebrow: 'Profile',
      aboutTitle: 'Tungkol sa akin',
      experienceEyebrow: 'Mga naging trabaho',
      experienceTitle: 'Karanasan',
      aboutDescription:
        'Lumilikha ako ng mga digital na karanasan sa web na maingat na binuo at madaling gamitin.',
      education: 'Edukasyon',
      expertise: 'Kasanayang teknikal',
      technologies: 'Mga teknolohiya',
      contactTitle: 'Makipag-ugnayan',
      resumeLink: 'Tingnan ang PDF ng résumé',
      backToTop: 'Bumalik sa itaas',
    },
    portfolio: {
      profile: {
        role: 'Senior na Frontend Developer',
        summary:
          'Nakagawa ako ng mga de-kalidad na frontend experience sa mga moderno at legacy na application.',
        footerRole: 'Frontend Developer',
      },
      present: 'Kasalukuyan',
      experience: {
        kpmg: {
          role: 'Senior na Frontend Developer',
          location: 'Hybrid · Makati City, Pilipinas',
          highlights: {
            reusableComponents:
              'Bumubuo ng mga reusable na React component gamit ang TypeScript.',
            apiBackedFeatures:
              'Ikinokonekta ang mga feature ng produkto sa REST API gamit ang React Hooks at Redux Toolkit.',
            prototypeMigration:
              'Iniiaangkop ang mga prototype mula sa Lovable sa architecture at mga convention ng team.',
            aiWorkflows:
              'Gumagawa ng mga reusable na prompt at skill para mas mailapit sa production ang mga prototype na ginawa ng AI.',
            dataFetching:
              'Pinangangasiwaan ang pag-cache ng server state at mga asynchronous na request gamit ang TanStack Query.',
            clientState:
              'Pinamamahalaan ang client-side state gamit ang Redux Toolkit.',
            responsiveInterfaces:
              'Gumagawa ng mga responsive na layout gamit ang Tailwind CSS at Material UI.',
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
