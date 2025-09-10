import { contactLinks } from '../data/content';
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import usePageTitle from '../hooks/usePageTitle';
import type { PageMetadata } from '../types/page';

export const metadata: PageMetadata = {
  title: 'Contact',
  path: '/contact',
};

const Contact = () => {
  usePageTitle(metadata.title);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 font-sans">
          Get In <span className="text-neon-cyan neon-text font-mono">Touch</span>
        </h1>
        <p className="text-xl text-gray-300 font-light">
          I'm always interested in hearing about new opportunities and interesting projects.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card group">
          <h2 className="text-2xl font-semibold text-neon-pink mb-6 font-mono group-hover:text-neon-cyan transition-colors duration-300">Let's Connect</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            If you'd like to chat about technology, discuss projects, or just connect, I'd love to hear from you.
          </p>

          <div className="space-y-4">
            <div className="flex items-center group/contact">
              <EnvelopeIcon className="h-5 w-5 text-neon-cyan mr-3 group-hover/contact:text-neon-pink transition-colors duration-300" />
              <a
                href="mailto:tmnance@gmail.com"
                className="text-gray-300 hover:text-neon-cyan transition-colors duration-300 font-mono"
              >
                tmnance@gmail.com
              </a>
            </div>
            <div className="flex items-center group/contact">
              <MapPinIcon className="h-5 w-5 text-neon-cyan mr-3 group-hover/contact:text-neon-pink transition-colors duration-300" />
              <span className="text-gray-300 font-mono">New York, NY</span>
            </div>
          </div>
        </div>

        <div className="card group">
          <h2 className="text-2xl font-semibold text-neon-cyan mb-6 font-mono group-hover:text-neon-pink transition-colors duration-300">Find Me Online</h2>
          <div className="space-y-4">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-neon-purple/30 hover:border-neon-pink/50 hover:bg-dark-700/50 transition-all duration-300 group/link"
              >
                <span className="font-medium text-white group-hover/link:text-neon-pink transition-colors duration-300 font-mono">
                  {link.name}
                </span>
                <svg
                  className="h-4 w-4 text-neon-cyan group-hover/link:text-neon-pink group-hover/link:rotate-45 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
