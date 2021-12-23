import React from 'react';
import {View, StyleSheet} from 'react-native';

import ContainerEntrySummary from '../Core/ContainerEntrySummary';

import EntrySummaryList from './EntrySummaryList';
import EntrySummaryChart from './EntrySummaryChart';

import useBalanceSumByCategory from '../../hooks/useBalanceSumByCategory';

const EntrySummary = ({days = 7, category, onPressActionButton}) => {
  const [balanceSum] = useBalanceSumByCategory(days, category);
  
  return(
    <ContainerEntrySummary 
      title="Categorias" 
      actionLabelText={`Últimos ${days} dias`}
      actionButtonText="Ver Mais"
      onPressActionButton={onPressActionButton}
    >  
      <View style={styles.inner}>
        <EntrySummaryChart data={balanceSum}/>
        <EntrySummaryList data={balanceSum}/> 
      </View>
    </ContainerEntrySummary>
  );
};

const styles = StyleSheet.create({  
  inner: {
    flexDirection: "row",
    paddingVertical: 10,
  },
});

export default EntrySummary;