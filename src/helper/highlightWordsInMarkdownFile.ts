import matchAll from 'string.prototype.matchall';

const searchHitText = '`Zoek-hit: `';
const reservedCharacters = [
  '!',
  '\\',
  '|',
  '`',
  '>',
  '<',
  '@',
  '#',
  '[',
  '^',
  ']',
  '*',
  '-',
  '_',
  '+',
  '.',
  '{',
  '}',
];

const allIndexOf = (text: string, searchText: string): number[] => {
  const indices: number[] = [];
  for (
    let pos = text.toLowerCase().indexOf(searchText.toLowerCase());
    pos !== -1;
    pos = text.indexOf(searchText, pos + 1)
  ) {
    indices.push(pos);
  }
  return indices;
};

const addHighlighting = (
  text: string,
  highLightText: string,
  indexes: number[],
) => {
  let result: string = text;
  indexes
    .sort((a, b) => b - a)
    .forEach(index => {
      const searchSubstring = result.substr(index, highLightText.length);
      result = `${text.substr(0, index)}\`${searchSubstring}\`${result.substr(
        index + highLightText.length,
        result.length,
      )}`;
    });
  return result;
};

const filterLinksFromIndexes = (text: string, indexes: number[]): number[] => {
  if (!text.includes('](')) {
    return indexes;
  }
  let result = indexes;
  const linkMatches = [...matchAll(text, '!?\\[([^\\]]*)\\]\\(([^\\)]+)\\)')];
  linkMatches.forEach(value => {
    // A matched link could potentially occur multiple times
    const startLinkIndexes = allIndexOf(text, value[0]);
    result = result.filter(index => {
      return startLinkIndexes.every(startLinkIndex => {
        const totalLinkLength = value[1].length + value[2].length + 4;
        return !(
          index > startLinkIndex && index < startLinkIndex + totalLinkLength
        );
      });
    });
  });
  return result;
};

const prefixLineWithSearchHit = (text: string): string => {
  const line = text.trimLeft();
  if (line.startsWith('> ')) {
    return `${line.slice(0, 2)} ${searchHitText} ${line.slice(2)}`;
  }
  if (line.startsWith('###### ')) {
    return `${line.slice(0, 7)} ${searchHitText} ${line.slice(7)}`;
  }
  if (line.startsWith('##### ')) {
    return `${line.slice(0, 6)} ${searchHitText} ${line.slice(6)}`;
  }
  if (line.startsWith('#### ')) {
    return `${line.slice(0, 5)} ${searchHitText} ${line.slice(5)}`;
  }
  if (line.startsWith('### ')) {
    return `${line.slice(0, 4)} ${searchHitText} ${line.slice(4)}`;
  }
  if (line.startsWith('## ')) {
    return `${line.slice(0, 3)} ${searchHitText} ${line.slice(3)}`;
  }
  if (line.startsWith('# ')) {
    return `${line.slice(0, 2)} ${searchHitText} ${line.slice(2)}`;
  }
  const res = line.match('^\\d+\\. ');
  if (res !== null && res.length === 1) {
    return `${res[0]} ${searchHitText} ${line.slice(res[0].length)}`;
  }
  if (line.startsWith('- ')) {
    return `${line.slice(0, 2)} ${searchHitText} ${line.slice(2)}`;
  }
  if (line.startsWith('|')) {
    return `${line.slice(0, 1)} ${searchHitText} ${line.slice(2)}`;
  }
  if (line.startsWith('- [ ]') || line.startsWith('- [x]')) {
    return `${line.slice(0, 5)} ${searchHitText} ${line.slice(5)}`;
  }
  return `${searchHitText} ${line}`;
};

const highlightLine = (text: string, highLightText: string): string => {
  return addHighlighting(
    text,
    highLightText,
    filterLinksFromIndexes(text, allIndexOf(text, highLightText)),
  );
};

/**
 * I'm not a big fan of bigger functions, smaller are easier to read and with the function names you can say
 * explicit what you are doing. I tried to break it up in multiple functions but it didn't help the
 * readability because all the params I've to pass through each function, continue in certain circumstances.
 * I decided (for now) to keep it here in this function, parts of the code can later always
 * be moved to separate functions
 *
 * The search doesn't support the following syntax because the viewer doesn't support it: footnote, definition List and html tags.
 */
const highlightWordsInMarkdownFile = (
  text: string,
  highLightText: string,
): ContentView => {
  if (reservedCharacters.some(character => highLightText.includes(character))) {
    return { hasHighlightedText: false, content: text };
  }
  const lines = text.split('\n');
  const updatedLines: string[] = [];
  let codeBlock = false;
  const codeBlockLineIndexes: number[] = [];
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];

    // If the line is a code block and the block is not ended yet
    if (codeBlock && !line.includes('```')) {
      updatedLines.push(line);
      // check if the search word is found in the line.
      const matches = allIndexOf(line, highLightText);
      if (matches.length === 0) {
        continue;
      }
      // if the search word is found in the line, add the first block line index to an array
      for (let iterator = lineIndex - 1; ; iterator--) {
        if (lines[iterator].includes('```')) {
          codeBlockLineIndexes.push(iterator);
          break;
        }
      }
      continue;
    }

    const innerLines = line.split('```');
    // Check if a multi line code block start or ends
    if (line.trim().startsWith('```') && innerLines.length === 2) {
      if (codeBlock) {
        // The end of the code block, so everything after ``` we can highlight:
        updatedLines.push(
          `\`\`\`${highlightLine(line.split('```')[1], highLightText)}`,
        );
      } else {
        // The start of the code block, so everything before ``` we can highlight:
        updatedLines.push(
          `${highlightLine(line.split('```')[0], highLightText)}\`\`\``,
        );
      }
      codeBlock = !codeBlock;
      continue;
    }

    // If the line contains one or more inline codeblocks:
    if (innerLines.length > 2 && innerLines.length % 2 !== 0) {
      let updatedLine = '';
      let foundMatchInInnerCodeBlock = false;
      // iterate the inline code blocks and the text in between
      for (let iterator = 0; iterator < innerLines.length; iterator++) {
        if (iterator % 2 !== 0) {
          // The text in this iteration is a inline code block
          if (allIndexOf(innerLines[iterator], highLightText).length !== 0) {
            foundMatchInInnerCodeBlock = true;
          }
          updatedLine += innerLines[iterator];
        }

        if (iterator % 2 === 0) {
          // The text in this iteration is the text in between inline code blocks
          updatedLine += highlightLine(innerLines[iterator], highLightText);
        }
        updatedLine += '```';
      }
      // If one of the inline code blocks has a match, prefix the line with a search hit because we can't highlight inside the inner code block.
      if (foundMatchInInnerCodeBlock) {
        updatedLine = prefixLineWithSearchHit(updatedLine);
      }
      updatedLines.push(updatedLine.slice(0, -3));
      continue;
    }

    updatedLines.push(highlightLine(line, highLightText));
  }

  // We can't mark codeBlocks, so we prefix the codeBlock with a search-hit
  new Set(codeBlockLineIndexes).forEach(value => {
    updatedLines.splice(value, 0, `${searchHitText} `);
  });

  // join the lines and add a spacing for side by side matches
  const content = updatedLines.join('\n').replace(/\b`{2}\b/g, '` `');
  return {
    hasHighlightedText: content.replace(/```/g, '').includes('`'),
    content,
  };
};

export default highlightWordsInMarkdownFile;
