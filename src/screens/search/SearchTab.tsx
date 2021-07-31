import React, { FC, useEffect, useState } from 'react';
import { Tab, ThemeProvider } from 'react-native-elements';
import { ScrollView } from 'react-native';
import configHelper from '../../helper/configHelper';
import { ArticleInfo } from '../../model/ConfigInfo';

interface Props {
  handleArticleTypeTabChange: (articleType: string) => void;
}

const theme = {
  Tab: {
    theme: {
      colors: { secondary: 'transparent' },
    },
  },
  TabItem: {
    titleStyle: { textTransform: 'none', color: '#154594' },
    theme: { colors: { secondary: '#154594' } },
  },
};

const SearchTab: FC<Props> = ({ handleArticleTypeTabChange }) => {
  const [tab, setTab] = useState(0);
  const [articleTypes, setArticleTypes] = useState<ArticleInfo[]>([]);

  useEffect(() => {
    configHelper.getArticleTypes().then(value => setArticleTypes(value));
  }, []);

  const handleTabChange = (clickedTab: number): void => {
    const result = articleTypes.find(value => value.index === clickedTab);
    if (result === undefined || tab === result.index) {
      return;
    }
    setTab(clickedTab);
    handleArticleTypeTabChange(result ? result.articleType : '');
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollView horizontal>
        {articleTypes.length !== 0 && (
          <Tab value={tab} onChange={handleTabChange}>
            {articleTypes.map(value => (
              <Tab.Item title={value.title} key={value.articleType} />
            ))}
          </Tab>
        )}
      </ScrollView>
    </ThemeProvider>
  );
};

export default SearchTab;
