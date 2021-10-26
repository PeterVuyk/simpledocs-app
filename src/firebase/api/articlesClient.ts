import Constants from 'expo-constants';
import { ArticlesResponse } from '../../model/ApiResponse';
import { Article } from '../../model/Article';
import Firebase from '../firebase';
import environment from '../../util/environment';

async function getArticles(bookType: string): Promise<Article[]> {
  const response = await Firebase.functions(process.env.FIREBASE_REGION)
    .httpsCallable('getArticles')({
      environment: environment.getEnvironment().envName,
      appVersion: Constants.manifest?.version,
      bookType,
    })
    .then(value => value.data as ArticlesResponse);
  if (!response.success) {
    throw new Error(
      `Failed collecting articles from server bookType ${bookType}, message server: ${response.message}`,
    );
  }
  return response.result!;
}

const articlesClient = {
  getArticles,
};

export default articlesClient;
