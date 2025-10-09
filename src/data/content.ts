export interface Project {
  name: string;
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
    name: 'HabitPanda - iOS Habit Tracking App',
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
