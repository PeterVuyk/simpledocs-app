import React, { FC, useEffect, useState } from 'react';
import { Tab, ThemeProvider } from 'react-native-elements';
import { ScrollView } from 'react-native';
import configHelper from '../../helper/configHelper';
import { BookInfo } from '../../model/AppConfigurations';

interface Props {
  onBookTypeTabChange: (bookType: string) => void;
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

const SearchTab: FC<Props> = ({ onBookTypeTabChange }) => {
  const [tab, setTab] = useState<number>(0);
  const [bookTypes, setBookTypes] = useState<BookInfo[]>([]);

  useEffect(() => {
    configHelper.getBookTypes().then(value => setBookTypes(value));
  }, []);

  const handleTabChange = (clickedTab: number): void => {
    const bookIndex = bookTypes.findIndex(
      (value, index) => index === clickedTab,
    );
    if (bookIndex === undefined || tab === bookIndex) {
      return;
    }
    setTab(clickedTab);
    onBookTypeTabChange(
      bookTypes[bookIndex] ? bookTypes[bookIndex].bookType : '',
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollView horizontal>
        {bookTypes.length !== 0 && (
          <Tab value={tab} onChange={handleTabChange}>
            {bookTypes.map(value => (
              <Tab.Item title={value.title} key={value.bookType} />
            ))}
          </Tab>
        )}
      </ScrollView>
    </ThemeProvider>
  );
};

export default SearchTab;
