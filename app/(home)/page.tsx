import Hero from './sections/Hero';
import { Navbar } from './components/navbar';
import Features from './sections/Features';
import CodeSection from './sections/Code';

export default function HomePage() {

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <CodeSection />
    </>
  );
}
