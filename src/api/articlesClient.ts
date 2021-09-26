import Constants from 'expo-constants';
import { ArticlesResponse } from '../model/ApiResponse';
import { Article } from '../model/Article';

async function getArticles(bookType: string): Promise<Article[]> {
  const url = new URL('getArticles', process.env.APP_SERVER_API_URL);
  url.searchParams.append('bookType', bookType);
  const articlesResponse = await fetch(url.toString(), {
    headers: {
      Accept: `application/json;api-version=${Constants.manifest?.version}`,
    },
  }).then(response => response.json() as Promise<ArticlesResponse>);

  if (!articlesResponse.success) {
    throw new Error(
      `Failed collecting articles from server, message server: ${articlesResponse.message}`,
    );
  }
  return articlesResponse.result;
}

const articlesClient = {
  getArticles,
};

export default articlesClient;
