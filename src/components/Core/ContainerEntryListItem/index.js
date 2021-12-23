import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../styles/Colors';

const ContainerEntryListItem = ({
  title, 
  actionLabelText, 
  actionButtonText, 
  onPressActionButton,
  children
}) => {
  return(
    <View style={styles.container}>
      {title && (
        <Text style={styles.title}>{title}</Text>
      )}

      {children}

      {(actionLabelText || actionButtonText) && (
      <View style={styles.actionContainer}>

        {actionLabelText && ( // Renderiza se for passado no componente
        <Text style={styles.actionLabel}>{actionLabelText}</Text>
        )}
        
        {actionButtonText && ( // Renderiza se for passado no componente
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onPressActionButton}>
          <Icon name="insert-chart" style={styles.actionButtonIcon}/>
          <Text style={styles.actionButtonText}>{actionButtonText}</Text>
        </TouchableOpacity>
        )}
      </View>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: Colors.asphalt,
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 10,
    margin: 5,
    padding: 8,
  },
  title: {
    fontSize: 12,
    color: Colors.white,
    marginBottom: 5,
  },
  actionContainer: {
    flexDirection: "row",
  },
  actionLabel: {
    flex: 1,
    fontSize: 12,
    color: Colors.white,
  },
  actionButton: {
    flexDirection: "row",
  },
  actionButtonIcon: {
    color: Colors.white,
    marginTop: 3,
    marginRight: 3,
  },
  actionButtonText: {
    fontSize: 12,
    color: Colors.white,
  },
});

export default ContainerEntryListItem;