import React, { FC, useEffect, useState } from 'react';
import { Tab, ThemeProvider } from 'react-native-elements';
import { ScrollView } from 'react-native';
import configHelper from '../../helper/configHelper';
import { BookInfo } from '../../model/ConfigInfo';

interface Props {
  handleBookTypeTabChange: (bookType: string) => void;
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

const SearchTab: FC<Props> = ({ handleBookTypeTabChange }) => {
  const [tab, setTab] = useState(0);
  const [bookTypes, setBookTypes] = useState<BookInfo[]>([]);

  useEffect(() => {
    configHelper.getBookTypes().then(value => setBookTypes(value));
  }, []);

  const handleTabChange = (clickedTab: number): void => {
    const result = bookTypes.find(value => value.index === clickedTab);
    if (result === undefined || tab === result.index) {
      return;
    }
    setTab(clickedTab);
    handleBookTypeTabChange(result ? result.bookType : '');
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
