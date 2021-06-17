import React, { useState } from 'react';
import { Tab, ThemeProvider } from 'react-native-elements';
import { ArticleType } from '../../database/model/ArticleType';

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

const SearchTab: React.FC<Props> = ({ handleArticleTypeTabChange }) => {
  const [tab, setTab] = useState(1);

  const handleTabChange = (clickedTab: number): void => {
    setTab(clickedTab);
    handleArticleTypeTabChange(
      clickedTab === 1 ? 'regulations' : 'instructionManual',
    );
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Tab value={tab} onChange={handleTabChange}>
          <Tab.Item title="Handboek" />
          <Tab.Item title="Regelgeving" />
        </Tab>
      </ThemeProvider>
    </>
  );
};

export default SearchTab;
