import React from 'react';
import { FlatList } from 'react-native';
import ContainerEntryListItem from '../Core/ContainerEntryListItem';
import EntryListItem from './EntryListItem';
import useEntries from '../../hooks/useEntries';

const EntryList = ({days = 7, category, onEntryPress, onPressActionButton}) => {
  const [entries] = useEntries(days, category); 

  return (
    <ContainerEntryListItem
      title="Últimos lançamentos"
      actionLabelText={`Últimos ${days} dias`}
      actionButtonText="Ver mais"
      onPressActionButton={onPressActionButton}>
      <FlatList
        data={entries}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <EntryListItem
            entry={item}
            isFirstItem={index === 0}
            isLastItem={index === entries.length - 1}
            onEntryPress={onEntryPress}
          />
        )}
      />
    </ContainerEntryListItem>
  );
};

export default EntryList;