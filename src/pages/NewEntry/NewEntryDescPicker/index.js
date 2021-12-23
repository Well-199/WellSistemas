import React, {useState} from 'react';
import {View, TouchableOpacity, Modal, Text, TextInput, StyleSheet} from 'react-native';
import ActionFooter, {ActionPrimaryButton, ActionSecondaryButton} from '../../../components/Core/ActionFooter';

import Colors from '../../../styles/Colors';

const NewEntryDescPicker = ({entry, value, setDescription}) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const openModal = () => {
    setModalVisible(true)
    if (value == "Descrição"){
      setDescription(value = "");
    } else {
      setDescription(value = entry.description);
    };
  };
  
  const onClosePress = () => {
    if (entry.id == null){
    setModalVisible(false);
    setDescription(value = "Descrição");

    }else {
      setModalVisible(false);
      setDescription(value = entry.description);

    };
  };

  const savePress =() => {
    if(value == ""){
      alert("Adicione uma Descrição ou Pressione Cancelar");
    }else{
      setModalVisible(false);
    };
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={openModal}>
        <Text style={styles.buttonText}>{value}</Text>
      </TouchableOpacity>
      
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modal}>

          <View style={styles.modalText}>
            <Text style={styles.modalTextA}>Adicione uma melhor descrição</Text>
            <Text style={styles.modalTextB}>para este Lançamento</Text>
          </View>

          <TextInput 
            style={styles.input} 
            maxLength={25}
            onChangeText={(text) => { 
              setDescription(text);
            }}
            value={value}
          >
          </TextInput>
        </View>

        <ActionFooter>
          <ActionPrimaryButton title="Adicionar"  onPress={savePress}/>
          <ActionSecondaryButton title="Cancelar" onPress={onClosePress}/>
        </ActionFooter>
      </Modal>    
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.asphalt,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,
  },
  buttonText: {
    fontSize: 28,
    color: Colors.white,
    textAlign: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.background,  
  },
  modalText: {
    marginBottom: 20,
  },
  modalTextA: {
    color: Colors.white,
    fontSize: 20,
    textAlign: "center",
  },
  modalTextB: {
    color: Colors.white,
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: Colors.asphalt,
    fontSize: 28,
    color: Colors.white,
    textAlign: 'center',
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,
  },
});

export default NewEntryDescPicker;