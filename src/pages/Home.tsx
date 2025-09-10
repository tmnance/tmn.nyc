import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import type { PageMetadata } from '../types/page';

export const metadata: PageMetadata = {
  title: 'Home',
  path: '/',
};

const Home = () => {
  usePageTitle(metadata.title);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl font-sans">
            Hi, I'm{' '}
            <span className="text-effect-4 font-mono">Tim Nance</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Feel free to take a look around!!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="btn-primary inline-flex items-center justify-center px-6 py-3"
            >
              View My Work
            </Link>
            <Link
              to="/contact"
              className="btn-secondary inline-flex items-center justify-center px-6 py-3"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-neon-purple/30" />
            </div>
            <div className="relative flex justify-center">
            <div className="relative group">
              <img
                src="/images/profile.jpg"
                alt="Tim Nance"
                className="h-32 w-32 rounded-full border-4 border-neon-cyan shadow-2xl object-cover animate-float transition-all duration-500 group-hover:scale-110"
                style={{
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)',
                }}
                loading="eager"
                width="128"
                height="128"
              />
              <div className="absolute inset-0 rounded-full border-4 border-neon-pink animate-pulse-slow opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-full border-2 border-neon-purple/30 animate-ping opacity-20"></div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
