import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ContainerEntrySummary from '../Core/ContainerEntrySummary';
import EntrySummaryListReport from './EntrySummaryListReport';

import useBalanceSumCreditDebit from '../../hooks/useBalanceSumCreditDebit';

const EntrySummaryReport = ({days = 7, category, onPressActionButton}) => {
  const [balanceDebitCredit] = useBalanceSumCreditDebit(days, category)
   
  return(
    <ContainerEntrySummary 
      title={`Últimos ${days} dias`} 
      //actionLabelText={`Últimos ${days} dias`}
      //actionButtonText="Ver mais"
      onPressActionButton={onPressActionButton}
    >  
      <View style={styles.inner}>
        <View style={styles.container}>
        <FlatList 
            data={balanceDebitCredit}
            keyExtractor={item => item.category.id}
            renderItem={({item}) => 
              <EntrySummaryListReport entry={item}/>
            }
          />  
        </View>
      </View> 
    </ContainerEntrySummary>
  );
};

const styles = StyleSheet.create({  
  container: {
    flex: 1,
  },
  inner: {
    flexDirection: "row",
    paddingVertical: 10,
  },
});

export default EntrySummaryReport;