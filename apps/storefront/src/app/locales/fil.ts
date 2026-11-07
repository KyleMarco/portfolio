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
      decreaseQuantity: 'Bawasan ang dami ng {{name}}',
      increaseQuantity: 'Dagdagan ang dami ng {{name}}',
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
