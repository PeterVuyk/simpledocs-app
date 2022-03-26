import { ContentType } from '../ContentType';

export interface StandalonePage {
  standalonePageType: string;
  title: string;
  content: string;
  contentType: ContentType;
}
