import React, {useState} from 'react';
import {View, Modal, Text, FlatList, StyleSheet} from 'react-native';
import ContainerEntryListItem from '../../../Core/ContainerEntryListItem';
import EntryListItemModal from '../../../EntryListReport/EntryListItemModal';
import RelativeDaysModal from '../../../RelativeDaysModal';
import ActionFooter, {ActionPrimaryButton} from '../../../Core/ActionFooter';
import useCategoryDebit from '../../../../hooks/useCategoryDebit';
import Colors from '../../../../styles/Colors';

const ModalDebit = ({days, category, isVisible, onEntryPress, onCancel}) => {
  const [entries] = useCategoryDebit(days, category);
  const [relativeDaysModalVisible, setRelativeDaysModalVisible] = useState(false);
  const [relativeDays, setRelativeDays] = useState(7);

  const openModal = () => {
    setRelativeDaysModalVisible(true);
  }

  const onRelativeDaysPress = (item) => {
    setRelativeDays(item);
    console.log("onRelativeDaysPress: ", JSON.stringify(item));
    onRelativeDaysClosePress();
  };

  const onRelativeDaysClosePress = () => {
    setRelativeDaysModalVisible(false);
  };
  
  return(
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <View style={styles.modal}>
        <ContainerEntryListItem>
          <Text style={styles.modalTitle}>Todas as Despesas</Text>
          <FlatList
            data={entries}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <EntryListItemModal
                entry={item}
                isFirstItem={index === 0}
                isLastItem={index === entries.length - 1}
                onEntryPress={onEntryPress}
              />
            )}
          />
        </ContainerEntryListItem>
      </View>
      <ActionFooter>
          <ActionPrimaryButton title="Fechar"  onPress={onCancel}/>
            <RelativeDaysModal
              isVisible={relativeDaysModalVisible}
              onConfirm={onRelativeDaysPress}
              onCancel={onRelativeDaysClosePress}
            />
        </ActionFooter>
    </Modal>
  )
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalTitle: {
    color: Colors.white,
    paddingBottom: 5,
    textAlign: "center",
  },
});

export default ModalDebit;