import Hero from '@/components/Hero';
import WhyStudyAbroad from '@/components/WhyStudyAbroad';
import About from '@/components/About';
import ExploreDestinations from '@/components/ExploreDestinations';
import Scholarships from '@/components/Scholarships';
import Testimonials from '@/components/Testimonials';
import FromOurBlog from '@/components/FromOurBlog';
import UpcomingEvents from '@/components/UpcomingEvents';
import GetInTouch from '@/components/GetInTouch';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <WhyStudyAbroad />
      <About />
      <ExploreDestinations />
      <Scholarships />
      <Testimonials />
      <FromOurBlog />
      <UpcomingEvents />
      <GetInTouch />
      <Footer />
    </div>
  );
}
