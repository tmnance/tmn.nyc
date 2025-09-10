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
    name: 'Sudoku Puzzle Solver/Generator',
    technologies: ['python'],
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/tmnance/sudoku-puzzler',
      },
    ],
  },
  {
    name: 'Crossword Puzzle Generator',
    technologies: ['php'],
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/tmnance/crossword-generator',
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
