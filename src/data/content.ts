export interface Project {
  name: string;
  description: string;
  technologies: string[];
  links: {
    name: string;
    url: string;
    link_text?: string;
  }[];
}

export interface ContactLink {
  name: string;
  url: string;
}

export const projects: Project[] = [
  {
    name: 'Cognia Insightarium',
    description:
      'A bookmark / saved post management system for collecting, organizing, and tagging content from X, Reddit, LinkedIn, and other sources. Features multi-platform sync and LLM-powered tagging.',
    technologies: ['react', 'typescript', 'tailwind', 'node', 'postgresql', 'prisma', 'llm'],
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/tmnance/cognia-insightarium',
      },
    ],
  },
  {
    name: 'HabitPanda - iOS Habit Tracking App',
    description:
      'An iOS habit tracking app that helps users build and maintain healthy habits through daily check-ins and streak tracking. Available on the App Store.',
    technologies: ['swift', 'swiftui', 'ios'],
    links: [
      {
        name: 'Website',
        url: 'https://habitpanda.app',
      },
      {
        name: 'App Store',
        url: 'https://apps.apple.com/app/apple-store/id1466306659',
      },
      {
        name: 'SwiftUI Version (GitHub)',
        url: 'https://github.com/tmnance/habitpanda-swiftui-ios',
      },
      {
        name: 'Original Version (GitHub)',
        url: 'https://github.com/tmnance/habitpanda-ios',
      },
    ],
  },
  {
    name: 'iOS On-Device LLM Chat App',
    description:
      'An iOS app that leverages Apples\'s Foundation Models framework for on-device language model interactions.',
    technologies: ['swift', 'swiftui', 'ios', 'llm'],
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/tmnance/foundation-on-device-llm-test',
      },
    ],
  },
];

export const contactLinks: ContactLink[] = [
  {
    name: 'Github',
    url: 'https://github.com/tmnance',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tmnance',
  },
];
