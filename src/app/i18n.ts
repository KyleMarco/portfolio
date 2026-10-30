import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: {
      navigation: {
        label: 'Main navigation',
        work: 'Work',
        about: 'About',
        experience: 'Experience',
        contact: 'Get in touch',
        language: 'Language',
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
            description:
              'Explore my frontend development experience across product teams and different stages of my career.',
          },
          toolkit: {
            title: 'Frontend toolkit',
            description:
              'See the languages, frameworks, and tools I use to build responsive and maintainable web interfaces.',
          },
          education: {
            title: 'Education and interests',
            description:
              'Learn more about my education, areas of study, and interests beyond frontend development.',
          },
          storefront: {
            title: 'Interactive storefront',
            description:
              'The shop page demonstrates product browsing and cart interactions alongside the portfolio.',
          },
        },
      },
      home: {
        heroEyebrow: 'Frontend development',
        since2017: 'Since 2017',
        currentlyAt: 'Currently at',
        heroDescription:
          'I build React and TypeScript interfaces, from REST API features to reusable components and responsive layouts.',
        contact: 'Get in touch',
        selectedWork: 'View selected work',
        projectsEyebrow: 'Selected work',
        projectsTitle: 'Projects',
        aboutEyebrow: 'A bit about me',
        aboutTitle: 'Approach',
        experienceEyebrow: 'Where I’ve worked',
        experienceTitle: 'Experience',
        source: 'GitHub',
        aboutDescription:
          'My work has ranged from translating Figma designs into responsive React components to integrating REST APIs for user management and tender requests.',
        education: 'Education',
        expertise: 'Technical expertise',
        contactLabel: 'Contact',
        contactHeading: 'Let’s make something thoughtful.',
        emailMe: 'Email me',
        resumeNotice: 'Résumé available on request.',
        resumeLink: 'Request a copy',
        resumeSubject: 'Request for resume',
        backToTop: 'Back to top',
      },
      shop: {
        pages: 'Product pages {{position}}',
        previousPage: 'Previous page',
        page: 'Page {{page}}',
        nextPage: 'Next page',
        showing: 'Showing {{from}}–{{to}} of {{total}} products',
        demoNotice: 'Demo only · not a real shop',
        title: 'Sample product catalog',
        description:
          'This is a sample page using product and cart data from DummyJSON. No real products are sold and no purchases are processed.',
        cartCount: '{{count}} items in cart',
        loading: 'Loading products...',
        error: 'Unable to load the product catalog.',
        all: 'All products',
        available: 'Available',
        unavailable: 'Unavailable',
        qty: 'Qty',
        discount: '{{percent}}% off',
        maxReached: 'Maximum reached',
        add: 'Add to cart',
        openCart: 'Open cart, {{count}} items',
        closeCart: 'Close cart',
        cart: 'Cart',
        clear: 'Clear all',
        empty: 'Your cart is empty.',
        remove: 'Remove',
        each: '${{price}} each',
        items: 'Items',
        total: 'Total',
        added: '{{name}} added to cart',
      },
    },
  },
  fil: {
    translation: {
      navigation: {
        label: 'Pangunahing nabigasyon',
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
          'Gumagawa ako ng mga interface gamit ang React at TypeScript, mula sa mga REST API feature hanggang sa mga reusable component at responsive na layout.',
        contact: 'Makipag-ugnayan',
        selectedWork: 'Tingnan ang mga piling gawa',
        projectsEyebrow: 'Mga piling gawa',
        projectsTitle: 'Mga proyekto',
        aboutEyebrow: 'Tungkol sa akin',
        aboutTitle: 'Paraan ng paggawa',
        experienceEyebrow: 'Mga naging trabaho',
        experienceTitle: 'Karanasan',
        source: 'GitHub',
        aboutDescription:
          'Kabilang sa aking trabaho ang pagsasalin ng mga disenyo sa Figma tungo sa responsive na React component at pag-integrate ng REST API para sa pamamahala ng user at mga tender request.',
        education: 'Edukasyon',
        expertise: 'Kasanayang teknikal',
        contactLabel: 'Pakikipag-ugnayan',
        contactHeading: 'Gumawa tayo ng makabuluhang bagay.',
        emailMe: 'Mag-email sa akin',
        resumeNotice: 'Maaaring humingi ng résumé.',
        resumeLink: 'Humingi ng kopya',
        resumeSubject: 'Paghiling ng résumé',
        backToTop: 'Bumalik sa itaas',
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
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
