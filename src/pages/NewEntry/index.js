import React, {useState} from 'react';
import {View, Alert, StatusBar, StyleSheet} from 'react-native';

import 
  ActionFooter, {
    ActionPrimaryButton, 
    ActionSecondaryButton
  } from '../../components/Core/ActionFooter';

import BalanceLabel from '../../components/BalanceLabel';
import NewEntryInput from './NewEntryInput';
import NewEntryCategoryPicker from './NewEntryCategoryPicker';
import NewEntryDatePicker from './NewEntryDatePicker';
import NewEntryCameraPicker from './NewEntryCameraPicker';
import NewEntryDeleteAction from './NewEntryDeleteAction';
import NewEntryDescPicker from './NewEntryDescPicker';
//import NewEntryAddressPicker from './NewEntryAddressPicker';

import useEntries from '../../hooks/useEntries';

import Colors from '../../styles/Colors';

const NewEntry = ({navigation}) => {
  
  const entry = navigation.getParam('entry', {
    id: null,            
    amount: 0,      
    entryAt: new Date(), 
    photo: null,
    category: { id: null, name: "Categorias" },
    description: "Descrição",
  });

  const [,saveEntry, deleteEntry] = useEntries();
  /* Sem a ( , ) antes do saveEntries que e o entries
     que nao e manipulado aqui da ERRO. */

  const [debit, setDebit] = useState(entry.amount <= 0);
  const [amount, setAmount] = useState(entry.amount);
  const [category, setCategory] = useState(entry.category);
  const [entryAt, setEntryAt] = useState(entry.entryAt);
  const [photo, setPhoto] = useState(entry.photo);
  const [description, setDescription] = useState(entry.description);
  

  const isValid = () => {
    if (parseFloat(amount) !== 0) {
      return true;
    }

    return false;
  };

  const onSave = () => {
    if (category.name == "Categorias") {
      Alert.alert("Selecione a Categoria")
    }
    else {
      const data = {
        amount: parseFloat(amount),
        category: category,
        description: description,
        entryAt: entryAt,
        photo: photo,
      };

      //console.log('NewEntry :: save ', data);
      saveEntry(data, entry);
      onClose();
      };
    };

  const onDelete = () => {
    deleteEntry(entry);
    onClose();
  };

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="line-content" backgroundColor={Colors.background}/>
      <BalanceLabel/>

      <View style={styles.formContainer}>
        <NewEntryInput 
          value={amount}
          onChangeValue={setAmount}
          onChangeDebit={setDebit}
        />

        <NewEntryCategoryPicker
          debit={debit} 
          category={category}
          onChangeCategory={setCategory}
        />

        <NewEntryDescPicker
          entry={entry}
          value={description}
          setDescription={setDescription}
        />

        <View style={styles.formActionContainer}>

          <NewEntryDatePicker 
            onChange={setEntryAt} value={entryAt}/>

          <NewEntryCameraPicker
            photo={photo}
            onChangePhoto={setPhoto}
          />
          
          <NewEntryDeleteAction 
            entry={entry}  onOkPress={onDelete}/>
        </View>

      </View>

      <ActionFooter>
          <ActionPrimaryButton 
            title={entry.id ? 'Salvar' : 'Adicionar'}
            onPress={() => {
              isValid() && onSave();
            }}/>
          <ActionSecondaryButton title="Cancelar"
            onPress={onClose}/>
      </ActionFooter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  formActionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default NewEntry;