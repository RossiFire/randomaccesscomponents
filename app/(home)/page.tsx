import Hero from './components/Hero';
import { MouseFollowContent, MouseFollowItem } from '@/demo/components/follow-mouse/mouse-follow';
import HomeMouseFollowItem from './components/home-mouse-follow-item';
import { Navbar } from './components/navbar';
import Features from './components/Features';

export default function HomePage() {

  return (
    <MouseFollowContent className='hero-content'>
      <Navbar />
      <Hero />
      <Features />
      <MouseFollowItem offsetX={10} offsetY={20}>
        <HomeMouseFollowItem />
      </MouseFollowItem>
    </MouseFollowContent>
  );
}
