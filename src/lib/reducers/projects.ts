interface ProjectI {
  id: string;
  user_id: string;
  name: string;
  description: string;
  stacks: any[] | string;
  images?: any[];
  github: string;
  website: string;
  figma: string;
  created_at: Date;
}

export interface ProjectImage {
  id: string;
  project_id?: string;
  secure_url: string;
  public_id: string;
  created_at: Date;
}

export class Project {
  id: string;
  user_id: string;
  name: string;
  description: string;
  stacks: any[] | string;
  images?: ProjectImage[];
  github: string;
  website: string;
  figma: string;
  created_at: Date;

  constructor(project: ProjectI, images: ProjectImage[]) {
    this.id = project.id;
    this.user_id = project.user_id;
    this.name = project.name;
    this.description = project.description;
    this.stacks = JSON.parse(project.stacks as string);
    this.created_at = project.created_at;
    this.website = project.website;
    this.github = project.github;
    this.figma = project.figma;
    this.images = images.map((item) => {
      delete item.project_id;
      return item;
    });
  }
}
