import React, { FC, useState } from 'react';
import { Tab, ThemeProvider } from 'react-native-elements';
import {
  ARTICLE_TYPE_INSTRUCTION_MANUAL,
  ARTICLE_TYPE_REGULATIONS,
  ArticleType,
} from '../../model/ArticleType';

interface Props {
  handleArticleTypeTabChange: (articleType: ArticleType) => void;
}

const theme = {
  Tab: {
    theme: {
      colors: { secondary: '#154594' },
    },
  },
  TabItem: {
    titleStyle: { textTransform: 'none', color: '#154594' },
    theme: { colors: { secondary: '#fff' } },
  },
};

const SearchTab: FC<Props> = ({ handleArticleTypeTabChange }) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (clickedTab: number): void => {
    setTab(clickedTab);
    handleArticleTypeTabChange(
      clickedTab === 1
        ? ARTICLE_TYPE_REGULATIONS
        : ARTICLE_TYPE_INSTRUCTION_MANUAL,
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Tab value={tab} onChange={handleTabChange}>
        <Tab.Item title="Handboek" />
        <Tab.Item title="Regelgeving" />
      </Tab>
    </ThemeProvider>
  );
};

export default SearchTab;
