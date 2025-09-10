import { projects } from '../data/content';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import usePageTitle from '../hooks/usePageTitle';
import type { PageMetadata } from '../types/page';

export const metadata: PageMetadata = {
  title: 'Projects',
  path: '/projects',
};

const Projects = () => {
  usePageTitle(metadata.title);
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 font-sans">
          My <span className="text-neon-cyan neon-text font-mono">Projects</span>
        </h1>
        <p className="text-xl text-gray-300 font-light">
          A collection of projects I've worked on across different technologies and platforms
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div key={index} className="card group">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2 font-mono group-hover:text-neon-pink transition-colors duration-300">
                {project.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-700 text-neon-cyan border border-neon-cyan/30 hover:border-neon-pink/50 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {project.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-neon-cyan hover:text-neon-pink text-sm font-medium transition-all duration-300 group/link"
                >
                  <span className="mr-2 group-hover/link:translate-x-1 transition-transform duration-300">{link.name}</span>
                  <ArrowTopRightOnSquareIcon className="h-4 w-4 group-hover/link:rotate-45 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="card max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-2 font-mono">
            Interested in seeing more?
          </h3>
          <p className="text-gray-300 mb-4">
            Check out my GitHub profile for additional projects and contributions.
          </p>
          <a
            href="https://github.com/tmnance"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            View on GitHub
            <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
