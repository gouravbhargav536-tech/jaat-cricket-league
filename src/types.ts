export type TeamType = 'international' | 'domestic';

export interface Player {
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper' | 'Raider' | 'Defender';
  nationality: string;
  jerseyNo: number;
}

export interface TeamStats {
  played: number;
  won: number;
  lost: number;
  draws: number;
  points: number;
}

export interface Team {
  id: string;
  name: string;
  fullName: string;
  type: TeamType;
  mascot: string;
  logoColor: string; // Tailwind color class or hex
  primaryColor: string;
  secondaryColor: string;
  description: string;
  captain: string;
  coach: string;
  founded: string;
  stats: TeamStats;
  roster: Player[];
  tagline: string;
  logoSvgSeed: string; // Used to render a bespoke procedural-looking icon
}

export interface Match {
  id: string;
  teamAId: string;
  teamBId: string;
  teamAName: string;
  teamBName: string;
  teamALogoColor: string;
  teamBLogoColor: string;
  date: string;
  time: string;
  status: 'live' | 'upcoming' | 'completed';
  scoreA?: number;
  scoreB?: number;
  venue: string;
  round: string;
}

export interface Sponsor {
  id: string;
  name: string;
  category: 'Title Sponsor' | 'Powered By' | 'Digital Partner' | 'Associate Partner' | 'Media Partner';
  logoType: 'text' | 'combined' | 'symbol';
  accentColor: string;
  subtitle?: string;
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  views: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  date: string;
  category: string;
}

