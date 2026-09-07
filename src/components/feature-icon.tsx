import {
  TicketCheck,
  GitCompare,
  Skull,
  NotebookPen,
  Trophy,
  TrendingUp,
  Map,
  Languages,
  CalendarClock,
  BookOpen,
  Users,
  UsersRound,
  Target,
  Wrench,
  Newspaper,
  HelpCircle,
} from 'lucide-react';

const MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'ticket-check': TicketCheck,
  'git-compare': GitCompare,
  skull: Skull,
  'notebook-pen': NotebookPen,
  trophy: Trophy,
  'trending-up': TrendingUp,
  map: Map,
  languages: Languages,
  'calendar-clock': CalendarClock,
  'book-open': BookOpen,
  users: Users,
  'users-round': UsersRound,
  target: Target,
  wrench: Wrench,
  newspaper: Newspaper,
};

export function FeatureIcon({ name }: { name: string }) {
  const Icon = MAP[name] ?? HelpCircle;
  return <Icon className="size-5" />;
}

export function NavIcon({ name, className }: { name: string; className?: string }) {
  const Icon = MAP[name] ?? BookOpen;
  return <Icon className={className} />;
}
