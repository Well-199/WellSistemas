import React, { useState } from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../styles/Colors';

const NewEntryDatePicker = ({value, onChange}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeValue = (date) => {
    onCancel(); 
    onChange(date);
    
    /* onCancel tem que vir primeiro 
      na funcao, se inverter o Modal vai abrir
      novamente quando clicar em ok, 
      Quando a funcao onChange e executada primeiro,
      ele atualiza a data e o modal não fecha,
      depois ele o (ok) tem que ser acionado de novo
      para executar a prossima funcao, talvez
      seja um erro de sincronia.
    */
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  return(
    <View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="today" size={30} color={Colors.white}/>
      </TouchableOpacity>

      <DateTimePicker 
        mode="date"
        datePickerModeAndroid="calendar"
        titleIOS="Data de vencimento"
        cancelTextIOS="Cancelar"
        confirmTextIOS="Ok"
        date={value}
        isVisible={modalVisible}
        onConfirm={onChangeValue}
        onCancel={onCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.asphalt,
    width: 59,
    height: 59,
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
});

export default NewEntryDatePicker;