import React, {useState} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ActionFooter, {
  ActionPrimaryButton,
} from '../../components/Core/ActionFooter';

import BalanceLabel from '../../components/BalanceLabel';
import EntrySummaryReport from '../../components/EntrySummaryReport';
import EntryListReport from '../../components/EntryListReport';
import RelativeDaysModal from '../../components/RelativeDaysModal';
import CategoryModal from '../../components/CategoryModal';

import Colors from '../../styles/Colors';

const Report = ({navigation}) => {
  const [relativeDaysModalVisible, setRelativeDaysModalVisible] = useState(
    false,
  );
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [relativeDays, setRelativeDays] = useState(7);
  const [category, setCategory] = useState({
    id: null,
    name: 'Todas Categorias',
  });

  const onRelativeDaysPress = item => {
    setRelativeDays(item);
    onRelativeDaysClosePress();
  };

  const onCategoryPress = item => {
    setCategory(item);
    onCategoryClosePress();
  };

  const onRelativeDaysClosePress = () => {
    setRelativeDaysModalVisible(false);
  };

  const onAllCategoryPress = () => {
    setCategory({name: 'Todas Categorias'});
    onCategoryClosePress();
  };

  const onCategoryClosePress = () => {
    setCategoryModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="line-content" backgroundColor={Colors.background}/>
      <BalanceLabel />

      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setRelativeDaysModalVisible(true);
          }}>
          <Text
            style={
              styles.filterButtonText
            }>{`Últimos ${relativeDays} dias`}</Text>
          <Icon
            name="keyboard-arrow-down"
            size={20}
            color={Colors.champagneDark}
          />
        </TouchableOpacity>
        <RelativeDaysModal
          isVisible={relativeDaysModalVisible}
          onConfirm={onRelativeDaysPress}
          onCancel={onRelativeDaysClosePress}
        />

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setCategoryModalVisible(true);
          }}>
          <Text style={styles.filterButtonText}>{category.name}</Text>
          <Icon
            name="keyboard-arrow-down"
            size={20}
            color={Colors.champagneDark}
          />
        </TouchableOpacity>
        <CategoryModal
          categoryType="all"
          isVisible={categoryModalVisible}
          onConfirm={onCategoryPress}
          onAllCategory={onAllCategoryPress}
          onCancel={onCategoryClosePress}
        />
      </View>

      
        <EntrySummaryReport 
          days={relativeDays}
          category={category}/>

        <EntryListReport 
          days={relativeDays} 
          category={category}  
          onEntryPress={(entry) => {
            navigation.navigate("NewEntry", {entry: entry});
          }}/>
     

      <ActionFooter>
        <ActionPrimaryButton
          title="Fechar"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </ActionFooter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  filterButton: {
    flexDirection: 'row',
    borderColor: Colors.champagneDark,
    borderWidth: 1,
    borderRadius: 150,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  filterButtonText: {
    color: Colors.champagneDark,
  },
});

export default Report;