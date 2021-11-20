import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyle from '../../../styling/globalStyle';

const styles = StyleSheet.create({
  noResultsTextSize: {
    ...globalStyle.typography.h4,
  },
  noResultContainer: { flex: 1, margin: 20 },
});

const NoSearchResultView: FC = () => {
  return (
    <View style={styles.noResultContainer}>
      <Text style={styles.noResultsTextSize}>
        Geen zoekresultaten.{`\n\n`}
        <Text>Suggesties:{`\n`}</Text>
        <Text>- Zorg ervoor dat de zoekopdracht goed gespeld is.{`\n`}</Text>
        <Text>- Gebruik andere trefwoorden.{`\n`}</Text>
        <Text>- Zoek in een andere categorie.{`\n`}</Text>
      </Text>
    </View>
  );
};

export default NoSearchResultView;
