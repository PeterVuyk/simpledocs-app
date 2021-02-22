import React from 'react';
import { Text } from 'react-native';
import { Chunk, findAll } from 'highlight-words-core';

interface Props {
  searchText: string;
  textToHighlight: string;
}

const HighlightWords: React.FC<Props> = ({ textToHighlight, searchText }) => {
  const chunks = findAll({
    textToHighlight,
    searchWords: [searchText],
    autoEscape: true,
  });

  return (
    <Text>
      {chunks.map((chunk: Chunk, index: number) => {
        const text = textToHighlight.substr(
          chunk.start,
          chunk.end - chunk.start,
        );

        return !chunk.highlight ? (
          text
        ) : (
          <Text
            key={index}
            style={chunk.highlight && { backgroundColor: 'yellow' }}
          >
            {text}
          </Text>
        );
      })}
    </Text>
  );
};

export default HighlightWords;
