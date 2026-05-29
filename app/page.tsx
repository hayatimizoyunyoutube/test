import { GameGrid } from '@/components/game-grid';
import { Hero } from '@/components/hero';
import { ProHeader } from '@/components/pro-header';
import { RoadmapStrip } from '@/components/roadmap-strip';
import { StatsPanel } from '@/components/stats-panel';
import { getGames } from '@/lib/data/games';

export default async function HomePage() {
  const games = await getGames();

  return (
    <main className="site-shell">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <ProHeader />
      <Hero />
      <StatsPanel games={games} />
      <GameGrid games={games} />
      <RoadmapStrip />
    </main>
  );
}
