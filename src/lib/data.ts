export type UpdateEntry = {
  href: string;
  level: 'major' | 'minor';
  title: string;
  date: string;
};

// Update feed built from the verified research snapshot (2026-09-04).
export const latestUpdates: UpdateEntry[] = [
    {
      href: '/big-ambitions-1-0',
      level: 'major',
      title:
        'Big Ambitions 1.0 is out (Aug 28) — The Hamptons with a private mansion, Personal Driver, Food Delivery, HQ Pricing Manager, banking update and minigames',
      date: 'Aug 28',
    },
    {
      href: '/roadmap',
      level: 'minor',
      title:
        'Official living roadmap tracked — EA 0.8 through 1.0 "The Sky Is the Limit" plus the first DLC, Costa Del Sol (Malaga)',
      date: 'Since 2024',
    },
    {
      href: '/mods',
      level: 'minor',
      title:
        'Steam Workshop support (EA 0.11 "The Workshop Awakens") — mods enable from the main menu, blueprints via interior installation firms',
      date: 'EA 0.11',
    },
  ];

export type JourneyStep = {
  href: string;
  title: string;
  note: string;
};

export const journeySteps: JourneyStep[] = [
    {
      href: '/guide',
      title: 'Beginner Guide',
      note: 'Your first day in New York: the Uncle Fred story jobs, courses, permits and getting your first business off the ground.',
    },
    {
      href: '/best-business',
      title: 'Best Starting Business',
      note: 'Every business ranked by startup cost, profit margin and difficulty — the number one question new players ask.',
    },
    {
      href: '/cinema-layout',
      title: 'Store Layouts & Blueprints',
      note: 'Blueprint rules, proven cinema and retail layouts, essentials appliances and customer flow that actually converts.',
    },
    {
      href: '/factory',
      title: 'Factories & Warehousing',
      note: 'Advanced production: recipes, machines, pallet racks, delivery drivers and automating supply from warehouse to store.',
    },
  ];

export type CodeItem = {
  code: string;
  rewards: string;
  status: 'active' | 'expired';
  added: string;
};

// Big Ambitions has no redeem-code system — verified against official channels.
// Kept empty on purpose: never fabricate codes.
export const codes: CodeItem[] = [];

export type StatChip = { emoji: string; label: string };

export const heroChips: StatChip[] = [
    { emoji: '🚀', label: 'Full Release Aug 28, 2026' },
    { emoji: '👍', label: 'Very Positive on Steam' },
    { emoji: '💬', label: '14K+ Reviews' },
    { emoji: '📈', label: '10.9K Peak CCU' },
    { emoji: '🏬', label: '20+ Business Types' },
  ];

export type ExploreCard = {
  href: string;
  title: string;
  tag: string;
  image: string;
};

export const exploreCards: ExploreCard[] = [
    { href: '/guide', title: 'Beginner Guide', tag: 'Guide', image: '/images/card-guide.svg' },
    { href: '/best-business', title: 'Best Business Tier List', tag: 'Guide', image: '/images/card-business.svg' },
    { href: '/cinema-layout', title: 'Cinema Layout', tag: 'Store Setup', image: '/images/card-store.svg' },
    { href: '/price', title: 'Price & Sales Tracker', tag: 'Buy & Download', image: '/images/card-price.svg' },
    { href: '/mods', title: 'Mods & Steam Workshop', tag: 'Mods', image: '/images/card-mods.svg' },
    { href: '/factory', title: 'Factory Guide', tag: 'Industry', image: '/images/card-factory.svg' },
    { href: '/multiplayer', title: 'Multiplayer Status', tag: 'Multiplayer', image: '/images/card-multiplayer.svg' },
    { href: '/roadmap', title: 'Roadmap Tracker', tag: 'Updates', image: '/images/card-roadmap.svg' },
    { href: '/codes', title: 'Codes Snapshot', tag: 'Codes', image: '/images/card-codes.svg' },
  ];

export type Feature = { title: string; note: string; icon: string };

export const features: Feature[] = [
    {
      title: 'Checked against 1.0',
      note: 'Every page is written against the full-release build and shows its last-updated date, so EA-era advice never masquerades as current.',
      icon: 'calendar-clock',
    },
    {
      title: 'Multi-source verification',
      note: 'Key facts are cross-checked between official Hovgaard Games channels, Steam data, Reddit, the official forum and community guides before they ship.',
      icon: 'git-compare',
    },
    {
      title: 'Honest codes snapshot',
      note: 'Big Ambitions has no redeem-code system. When there is nothing to redeem, we say so instead of padding the page with fake codes.',
      icon: 'ticket-check',
    },
    {
      title: 'Business economics that add up',
      note: 'Startup costs, margins and staffing explained with the community numbers behind them — and flagged when a patch may have shifted them.',
      icon: 'trending-up',
    },
    {
      title: 'Layout-first store guides',
      note: 'Blueprint rules, bathroom requirements and customer flow explained per building size, so a plan survives contact with real premises.',
      icon: 'map',
    },
    {
      title: 'Mod and tool curation',
      note: 'Steam Workshop, Nexus Mods, trainers and multiplayer projects curated in one place, with install steps and risk notes.',
      icon: 'wrench',
    },
    {
      title: 'Four languages',
      note: 'Read the wiki in English, French, German or Portuguese. Guides fall back to English where a translation is not ready yet.',
      icon: 'languages',
    },
    {
      title: 'Roadmap tracking',
      note: 'The official living roadmap translated into a plain table — shipped, slipped, and still-to-come, so you know what to expect next.',
      icon: 'trophy',
    },
    {
      title: 'No fluff, answers first',
      note: 'Each page opens with the direct answer to the search, then the detail. Skim the headings, get the truth, get back to your empire.',
      icon: 'notebook-pen',
    },
  ];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
    {
      q: 'Is this wiki affiliated with Hovgaard Games?',
      a: 'No. Big Ambitions Wiki is a fan-made reference built and maintained by players. Big Ambitions and all related trademarks belong to Hovgaard Games ApS.',
    },
    {
      q: 'Does Big Ambitions have redeem codes?',
      a: 'No. The game has no code or coupon system, so there is nothing to redeem. Our codes page explains where official news actually lands — Steam announcements, the official Discord and the roadmap.',
    },
    {
      q: 'What is the best business to start with?',
      a: 'For a first store the community points to simple food and convenience retail. The biggest long-term earners are the so-called Big 4: jewelry, hair salons, clothing and electronics — with location in Midtown or Murray Hill mattering as much as the business itself.',
    },
    {
      q: 'Does Big Ambitions have multiplayer?',
      a: 'There is no official multiplayer. A fan project called Big Ambitions Online exists as an unofficial mod, but it carries save-corruption risks and is not supported by the developer.',
    },
    {
      q: 'Is Big Ambitions available on Mac or consoles?',
      a: 'The game sells on Steam for Windows and macOS. There is no console version. A DRM-free GOG release does not exist — the game only appears on GOGs wishlisted Dreamlist.',
    },
    {
      q: 'How do I contribute or report an error?',
      a: 'Every article shows its last-updated date. If something looks stale after a patch, reach us through the community channels in the footer and we will re-verify it against the current build.',
    },
  ];

export type OverviewPoint = { title: string; note: string };

export const overviewPoints: OverviewPoint[] = [
    {
      title: 'From empty pockets to an empire',
      note: 'You start with an empty bank account in a faithfully recreated New York City, work jobs and courses, then open small businesses and grow them into a city-dominating corporation.',
    },
    {
      title: 'Every business runs your way',
      note: 'Retail shops, offices, warehouses and factories — 20+ business types with deep interior design, blueprints, staffing, logistics and pricing under your control.',
    },
    {
      title: '1.0 keeps expanding the city',
      note: 'The August 28, 2026 full release adds The Hamptons with a private mansion, a personal driver, food delivery, a banking update and more — with the first DLC, Costa Del Sol, already on the official roadmap.',
    },
  ];
