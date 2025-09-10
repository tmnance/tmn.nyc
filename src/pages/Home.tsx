import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Hi, I'm{' '}
            <span className="text-primary-600">Tim Nance</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
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
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
            <img
              src="/images/profile.jpg"
              alt="Tim Nance"
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
