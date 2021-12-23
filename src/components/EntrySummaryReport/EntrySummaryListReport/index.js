import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ModalCredit from './ModalCredit';
import ModalDebit from './ModalDebit';
import Svg, {Circle} from 'react-native-svg';
import Currency from '../../Core/Currency';
import Colors from '../../../styles/Colors';

const EntrySummaryListReport = ({entry}) => {

  const [modalCredit, setModalCredit] = useState(false);
  const [modalDebit, setModalDebit] = useState(false);

  const openModal = () => {
    if(entry.category.isCredit == true){
      setModalCredit(true);
    } else {
      setModalDebit(true);
    };    
  };

  const closeModal = () => {
    setModalCredit(false);
    setModalDebit(false);
  };
  
  if(entry.category.isCredit == true){
    entry.category.name = "Receitas";
    entry.category.color = Colors.green;
  }else {
    entry.category.name = "Despesas";
    entry.category.color = Colors.red;
  };
  
  const bulletColor = entry.category.color || Colors.white;
 
  return(
    <TouchableOpacity onPress={openModal}>
      
      <ModalCredit
        isVisible={modalCredit}
        onCancel={closeModal}
      />
      <ModalDebit
        isVisible={modalDebit}
        onCancel={closeModal}
      />
      <View style={styles.container}>
        <Svg height="20" width="22">
          <Circle 
            cx="10" 
            cy="10" 
            r="8" 
            stroke={Colors.background}
            strokeWidth="0.5"
            fill={bulletColor}
          />
        </Svg>

        <Text style={styles.name}>{entry.category.name}</Text>
        <Text style={styles.value}>
          <Currency value={entry.amount}/>
        </Text>
    
      </View>
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },  
  name: {
    flex: 1,
    fontSize: 14,
    color: Colors.white,
    marginTop: 1,
    marginLeft: 3,
    marginBottom: 10,
  },
  value: {
    fontSize: 14,
    color: Colors.white,
    marginTop: 1,
  },
});

export default EntrySummaryListReport;