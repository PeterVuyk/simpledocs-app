const allIndexOf = (text: string, textToHighlight: string): number[] => {
  const indices: number[] = [];
  for (
    let pos = text.toLowerCase().indexOf(textToHighlight);
    pos !== -1;
    pos = text.indexOf(textToHighlight, pos + 1)
  ) {
    if (pos >= text.indexOf('<article>') + 9) {
      indices.push(pos);
    }
  }
  return indices;
};

const filterIndexFromTagsAfterMatch = (
  text: string,
  indexes: number[],
): number[] => {
  return indexes.filter(matchIndex => {
    const textAfterMatch = text.substr(matchIndex, text.length);
    const firstClosingTag: number = textAfterMatch.indexOf('>');
    const firstOpeningTag: number = textAfterMatch.indexOf('<');
    return firstClosingTag > firstOpeningTag;
  });
};

const filterIndexFromTagsBeforeMatch = (
  text: string,
  indexes: number[],
): number[] => {
  return indexes.filter(matchIndex => {
    const textBeforeMatch = text.substr(0, matchIndex);
    const lastClosingTag: number = textBeforeMatch.lastIndexOf('>');
    const lastOpeningTag: number = textBeforeMatch.lastIndexOf('<');
    return lastClosingTag > lastOpeningTag;
  });
};

const highlightSearchWords = (
  text: string,
  searchText: string,
  indexes: number[],
): string => {
  let result: string = text;
  indexes
    .sort((a, b) => b - a)
    .forEach(index => {
      const searchSubstring = result.substr(index, searchText.length);
      result = `${text.substr(
        0,
        index,
      )}<mark>${searchSubstring}</mark>${result.substr(
        index + searchText.length,
        result.length,
      )}`;
    });
  return result;
};

/**
 * This is an ugly way to highlight words in html files by adding markup e.g. '<mark>word</mark>'.
 * For MVP usage it's acceptable because the HTML files is managed by ourself, two rules:
 * - It start searching after <article>
 * - It is not allowed to use characters '<' or '>' in the html text.
 */
const highlightWordsInHTMLFile = (
  text: string,
  textToHighlight: string,
): string => {
  if (
    textToHighlight.includes('<') ||
    textToHighlight.includes('>') ||
    text.indexOf('<article>') === -1
  ) {
    return text;
  }

  let indexOfAllMatches: number[] = allIndexOf(text, textToHighlight);
  indexOfAllMatches = filterIndexFromTagsBeforeMatch(text, indexOfAllMatches);
  indexOfAllMatches = filterIndexFromTagsAfterMatch(text, indexOfAllMatches);
  return highlightSearchWords(text, textToHighlight, indexOfAllMatches);
};

export default highlightWordsInHTMLFile;
