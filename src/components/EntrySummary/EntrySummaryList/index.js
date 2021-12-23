import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import EntrySummaryListItem from './EntrySummaryListItem';

const EntrySummaryList = ({data}) => {

  return(
    <View style={styles.container}>
      <FlatList 
        data={data}
          keyExtractor={item => item.category.id}
          renderItem={({item}) => 
            <EntrySummaryListItem entry={item}/>
          }>
      </FlatList>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EntrySummaryList;