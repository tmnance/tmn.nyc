import { projects } from '../data/content';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const Projects = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h1>
        <p className="text-xl text-gray-600">
          A collection of projects I've worked on across different technologies and platforms
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {project.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
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
                  className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                >
                  <span className="mr-2">{link.name}</span>
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="card max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Interested in seeing more?
          </h3>
          <p className="text-gray-600 mb-4">
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
