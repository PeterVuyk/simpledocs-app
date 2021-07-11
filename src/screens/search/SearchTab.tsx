import React, { FC, useState } from 'react';
import { Tab, ThemeProvider } from 'react-native-elements';
import { ScrollView } from 'react-native';
import {
  ARTICLE_TYPE_BRANCHE_RICHTLIJN_MEDISCHE_HULPVERLENING,
  ARTICLE_TYPE_INSTRUCTION_MANUAL,
  ARTICLE_TYPE_ONTHEFFING_GOEDE_TAAKUITVOERING,
  ARTICLE_TYPE_REGELING_OGS_2009,
  ARTICLE_TYPE_RVV_1990,
} from '../../model/ArticleType';

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

  const handleTabChange = (clickedTab: number): void => {
    setTab(clickedTab);
    switch (clickedTab) {
      case 0:
        handleArticleTypeTabChange(ARTICLE_TYPE_INSTRUCTION_MANUAL);
        break;
      case 1:
        handleArticleTypeTabChange(ARTICLE_TYPE_RVV_1990);
        break;
      case 2:
        handleArticleTypeTabChange(ARTICLE_TYPE_REGELING_OGS_2009);
        break;
      case 3:
        handleArticleTypeTabChange(
          ARTICLE_TYPE_ONTHEFFING_GOEDE_TAAKUITVOERING,
        );
        break;
      case 4:
        handleArticleTypeTabChange(
          ARTICLE_TYPE_BRANCHE_RICHTLIJN_MEDISCHE_HULPVERLENING,
        );
        break;
      default:
        handleArticleTypeTabChange(ARTICLE_TYPE_INSTRUCTION_MANUAL);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollView horizontal>
        <Tab value={tab} onChange={handleTabChange}>
          <Tab.Item title="Handboek" />
          <Tab.Item title="RVV 1990" />
          <Tab.Item title="Regeling OGS 2009" />
          <Tab.Item title="Ontheffing goede taakuitoefening" />
          <Tab.Item title="Brancherichtlijn medische hulpverlening" />
        </Tab>
      </ScrollView>
    </ThemeProvider>
  );
};

export default SearchTab;
