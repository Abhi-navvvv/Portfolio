import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import GithubActivity from '@/components/GithubActivity';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 w-full min-h-screen flex flex-col">
        <Hero />
        <About />
        <GithubActivity />
        <Projects />
        <Certifications />
        <Footer />
      </main>
    </>
  );
}
