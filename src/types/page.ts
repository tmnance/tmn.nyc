export interface PageMetadata {
  title: string;
  path: string;
}

export interface PageComponent {
  default: React.ComponentType;
  metadata: PageMetadata;
}
