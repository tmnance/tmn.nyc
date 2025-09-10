import usePageTitle from '../hooks/usePageTitle';
import type { PageMetadata } from '../types/page';

export const metadata: PageMetadata = {
  title: 'About',
  path: '/about',
};

const About = () => {
  usePageTitle(metadata.title);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
        <p className="text-xl text-gray-600">
          Engineering leader with a passion for building great products and leading teams
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Engineering Experience</h2>
          <p className="text-gray-600 mb-4">
            I'm a senior engineering manager with extensive experience building diverse products
            and platform infrastructure at companies like Betterment, The New York Times, WeWork,
            and Facebook. I've led teams creating everything from consumer mobile apps to enterprise
            web applications, often taking projects from zero to one and scaling them to serve
            millions of users.
          </p>
          <p className="text-gray-600">
            My technical expertise spans full-stack development, mobile app development (iOS/Swift),
            platform engineering, and product development with a focus on user experience,
            performance optimization, and rapid iteration.
          </p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Leadership & Impact</h2>
          <p className="text-gray-600 mb-4">
            I've led engineering teams across multiple companies, focusing on
            product development, platform engineering, user experience, and rapid iteration.
            I've successfully launched new products from concept to market, built scalable
            infrastructure, and created solutions that serve millions of users.
          </p>
          <p className="text-gray-600">
            I'm passionate about mentoring engineers, building inclusive teams, and creating
            products that solve real problems for users while empowering teams to move fast
            and iterate quickly without sacrificing quality.
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Areas of Expertise</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Product & Platform Development</h3>
            <p className="text-gray-600">
              Building consumer and enterprise products from concept to launch, plus platform
              infrastructure that enables team velocity and rapid iteration.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Team Leadership</h3>
            <p className="text-gray-600">
              Building and mentoring engineering teams, improving processes, and scaling organizations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Performance & Scale</h3>
            <p className="text-gray-600">
              Optimizing systems for high-traffic scenarios, reducing latency, and improving reliability.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Mobile Development</h3>
            <p className="text-gray-600">
              iOS app development with Swift and SwiftUI, from concept to App Store deployment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
