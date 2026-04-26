export type ProductStatus = 'live' | 'soon';

export type ProductIcon =
  | { kind: 'brand'; src: string }
  | { kind: 'bzhu' }
  | { kind: 'symbol'; value: string; color?: string };

export interface Product {
  slug: string;
  name: string;
  url: string;
  status: ProductStatus;
  tag: string;
  glow: string;
  icon: ProductIcon;
  terminalLabel: string;
  description: {
    uk: string;
    en: string;
  };
}

export const products: Product[] = [
  {
    slug: 'opodatkuvayco',
    name: 'Opodatkuvayco',
    url: 'https://opodatkuv.ayco.group',
    status: 'live',
    tag: 'Taxes · Finance',
    glow: 'rgba(0,255,163,.5)',
    icon: { kind: 'brand', src: '/brand/opodatkuvayco-mark.svg' },
    terminalLabel: 'opodatkuvayco',
    description: {
      uk: 'Автоматичний розрахунок податків для ФОП та фрилансерів. Без Excel, без болю.',
      en: 'Automatic tax calculations for sole proprietors and freelancers. No Excel, no pain.',
    },
  },
  {
    slug: 'daruvayco',
    name: 'Daruvayco',
    url: 'https://daruv.ayco.group',
    status: 'soon',
    tag: 'Gifts · AI',
    glow: 'rgba(255,78,205,.5)',
    icon: { kind: 'symbol', value: '🎁', color: 'var(--accent-3)' },
    terminalLabel: 'daruvayco',
    description: {
      uk: 'AI-сервіс підбору подарунків. Розкажи про людину — отримай ідеї, які зачеплять.',
      en: 'AI-powered gift picker. Describe the person — get ideas that actually land.',
    },
  },
  {
    slug: 'bzhuvayco',
    name: 'BZhUVayco',
    url: 'https://bzhuv.ayco.group',
    status: 'soon',
    tag: 'Nutrition · Health',
    glow: 'rgba(124,92,255,.5)',
    icon: { kind: 'bzhu' },
    terminalLabel: 'bzhuvayco',
    description: {
      uk: 'Калькулятор КБЖВ. Рахуй білки, жири та вуглеводи — тіло подякує.',
      en: 'A macro calculator. Track protein, fat and carbohydrates — your body will thank you.',
    },
  },
  {
    slug: 'planuvayco',
    name: 'Planuvayco',
    url: 'https://planuv.ayco.group',
    status: 'soon',
    tag: 'Planning · Tasks',
    glow: 'rgba(124,92,255,.4)',
    icon: { kind: 'symbol', value: '◇', color: 'var(--accent-2)' },
    terminalLabel: 'planuvayco',
    description: {
      uk: 'Персональний планер, який перетворює хаос у спокійний тиждень. У розробці.',
      en: 'A personal planner that turns chaos into a calm week. In the works.',
    },
  },
  {
    slug: 'investuvayco',
    name: 'Investuvayco',
    url: 'https://investuv.ayco.group',
    status: 'soon',
    tag: 'Invest · Finance',
    glow: 'rgba(0,255,163,.4)',
    icon: { kind: 'symbol', value: '📈', color: 'var(--accent)' },
    terminalLabel: 'investuvayco',
    description: {
      uk: 'Дашборд інвестицій з автозаливом угод, аналітикою та KPI портфеля.',
      en: 'An investment dashboard with auto-import, analytics and portfolio KPIs.',
    },
  },
  {
    slug: 'bazhayco',
    name: 'Bazhayco',
    url: 'https://bazh.ayco.group',
    status: 'soon',
    tag: 'Wishlist · Social',
    glow: 'rgba(255,78,205,.4)',
    icon: { kind: 'symbol', value: '✦', color: 'var(--accent-3)' },
    terminalLabel: 'bazhayco',
    description: {
      uk: 'Вішлист нового покоління: ділись бажаннями, закривай разом, не дублюй подарунки.',
      en: 'A next-gen wishlist: share wishes, fulfil them together, no duplicate gifts.',
    },
  },
];
