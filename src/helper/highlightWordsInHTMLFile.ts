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
      )}<mark style="background-color: yellow; color: black">${searchSubstring}</mark>${result.substr(
        index + searchText.length,
        result.length,
      )}`;
    });
  return result;
};

/**
 * Because we know the html-structure by validate and adjusting it in our own CMS,
 * we know the html files are and highlight can be applied by adding markup e.g. '<mark>word</mark>'.
 * - It is not allowed to use characters '<' or '>' in the html text, use instead &gt; and &lt;.
 */
const highlightWordsInHTMLFile = (
  text: string,
  highLightText: string,
): string => {
  let textToHighlight = highLightText.replace('<', '&lt;');
  textToHighlight = textToHighlight.replace('>', '&gt;');

  let indexOfAllMatches: number[] = allIndexOf(
    text,
    textToHighlight.toLowerCase(),
  );
  indexOfAllMatches = filterIndexFromTagsBeforeMatch(text, indexOfAllMatches);
  indexOfAllMatches = filterIndexFromTagsAfterMatch(text, indexOfAllMatches);
  return highlightSearchWords(
    text,
    textToHighlight.toLowerCase(),
    indexOfAllMatches,
  );
};

export default highlightWordsInHTMLFile;
