import Hero from './components/Hero';
import { MouseFollowContent, MouseFollowItem } from '@/demo/components/follow-mouse/mouse-follow';
import HomeMouseFollowItem from './components/home-mouse-follow-item';
import { Navbar } from './components/navbar';
import { BGGrid } from './components/beam-bg';

export default function HomePage() {

  return (
    <MouseFollowContent className='hero-content'>
      <Navbar />
      <div className='relative h-svh w-full bg-background overflow-hidden flex flex-col justify-center text-center z-20'>
        <Hero />
        <BGGrid />
      </div>
      <MouseFollowItem offsetX={10} offsetY={20}>
        <HomeMouseFollowItem />
      </MouseFollowItem>
    </MouseFollowContent>
  );
}
