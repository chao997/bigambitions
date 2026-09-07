export type NavItem = {
  slug: string;
  labelKey: string;
  badge?: 'popular' | 'new';
};

export type NavCategory = {
  id: string;
  labelKey: string;
  icon: string; // lucide icon name (kebab)
  items: NavItem[]; // empty items => single link to overview slug
};

// Sidebar wiki navigation. Categories with a single page render as a plain
// link; the rest render as collapsible <details> groups with a count badge.
// Mirrors the keyword classification in keywords.json (12 categories, 20 pages).
export const wikiNav: NavCategory[] = [
  {
    id: 'guide',
    labelKey: 'cat.guide',
    icon: 'book-open',
    items: [
      { slug: 'guide', labelKey: 'item.guide', badge: 'popular' },
      { slug: 'best-business', labelKey: 'item.bestBusiness', badge: 'popular' },
      { slug: 'how-to-get-a-job', labelKey: 'item.getJob' },
      { slug: 'happiness', labelKey: 'item.happiness' },
    ],
  },
  {
    id: 'review',
    labelKey: 'cat.review',
    icon: 'star',
    items: [{ slug: 'review', labelKey: 'item.review' }],
  },
  {
    id: 'wiki',
    labelKey: 'cat.wiki',
    icon: 'library',
    items: [{ slug: 'wiki', labelKey: 'item.wikiPage' }],
  },
  {
    id: 'buy',
    labelKey: 'cat.buy',
    icon: 'shopping-cart',
    items: [
      { slug: 'steam-key', labelKey: 'item.steamKey', badge: 'popular' },
      { slug: 'price', labelKey: 'item.price' },
      { slug: 'download', labelKey: 'item.download' },
    ],
  },
  {
    id: 'updates',
    labelKey: 'cat.updates',
    icon: 'newspaper',
    items: [
      { slug: 'roadmap', labelKey: 'item.roadmap', badge: 'new' },
      { slug: 'big-ambitions-1-0', labelKey: 'item.onePointO', badge: 'new' },
    ],
  },
  {
    id: 'cheats',
    labelKey: 'cat.cheats',
    icon: 'target',
    items: [{ slug: 'cheats', labelKey: 'item.cheats' }],
  },
  {
    id: 'mods',
    labelKey: 'cat.mods',
    icon: 'wrench',
    items: [{ slug: 'mods', labelKey: 'item.mods' }],
  },
  {
    id: 'multiplayer',
    labelKey: 'cat.multiplayer',
    icon: 'users',
    items: [{ slug: 'multiplayer', labelKey: 'item.multiplayer' }],
  },
  {
    id: 'store',
    labelKey: 'cat.store',
    icon: 'store',
    items: [
      { slug: 'cinema-layout', labelKey: 'item.cinemaLayout', badge: 'popular' },
      { slug: 'where-to-buy-bathroom-stall', labelKey: 'item.bathroomStall' },
    ],
  },
  {
    id: 'industry',
    labelKey: 'cat.industry',
    icon: 'factory',
    items: [
      { slug: 'factory', labelKey: 'item.factory' },
      { slug: 'warehouse', labelKey: 'item.warehouse' },
    ],
  },
  {
    id: 'music',
    labelKey: 'cat.music',
    icon: 'music',
    items: [{ slug: 'music', labelKey: 'item.music' }],
  },
  {
    id: 'similar',
    labelKey: 'cat.similar',
    icon: 'gamepad-2',
    items: [{ slug: 'games-like-big-ambitions', labelKey: 'item.similarGames' }],
  },
];
