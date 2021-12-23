import React, { useState } from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import { TextInputMask } from 'react-native-masked-text';

import Colors from '../../../styles/Colors';

const NewEntryInput = ({
  value, 
  onChangeDebit, 
  onChangeValue
}) => {

  const [debit, setDebit] = useState(value <= 0 ? -1 : 1);
  const [
    debitPrefix, 
    setDebitPrefix] = useState(value <= 0 ? "-" : "");

  const onChangeDebitCredit = () => {
    if (debit < 0) {
      setDebit(1);
      setDebitPrefix("");
      onChangeDebit(false);

    } else {
      setDebit(-1);
      setDebitPrefix("-");
      onChangeDebit(true);
    };

    onChangeValue(value * -1);
  };

  return(
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.debitButton}
        onPress={onChangeDebitCredit}
      >
        <Text 
          style={styles.debitButtonPrefix}>{debitPrefix}
        </Text>
        <Text style={styles.debitButtonText}>R$</Text>
      </TouchableOpacity>
        <TextInputMask
          style={styles.input}
          type = {'money'}
          options = {{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: '',
            suffixUnit: '',
          }}
          value={value}
          includeRawValueInChangeText={true}
          onChangeText={(maskdValue, rawValue) => {
            onChangeValue(rawValue * debit);
          }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.asphalt,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10, 
  },
  debitButton: {
    backgroundColor: Colors.blue,
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.asphalt,
  },
  debitButtonPrefix: {
    fontSize: 28,
    color: Colors.white,
    minWidth: 8,
  },
  debitButtonText: {
    fontSize: 28,
    color: Colors.white,
  },
  input: {
    flex: 1,
    fontSize: 28,
    color: Colors.white,
    textAlign: "right",
    paddingLeft: 0,
    paddingRight: 20,
  },  
});

export default NewEntryInput;