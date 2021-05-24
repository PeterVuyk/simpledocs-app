import { Buffer } from 'buffer';

function getHTMLBodyFromBase64(base64HTML: string): string {
  const base64String = base64HTML.split('data:text/html;base64,')[1];
  return Buffer.from(base64String, 'base64').toString('utf-8');
}

const htmlHelper = {
  getHTMLBodyFromBase64,
};

export default htmlHelper;
