import React from 'react';
import {Alert, View, TouchableOpacity, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geocoder from 'react-native-geocoding';
import Colors from '../../../styles/Colors';

const NewEntryAddressPicker = () => {
  //Recebe os parametros da getPosition e formata o endereço
  const getLocation = (latitude, longitude) => {
    // Inicia Serviço da API Google 
    Geocoder.init("AIzaSyCQ-fnvtHoy_pEcHyJbkBSyFiODMm-8JKI");

    Geocoder.from({latitude, longitude})
      .then(json => {
        console.log("API Google Retorna JSON: ", JSON.stringify(json));
        
        const formattedAddress = json.results[0].formatted_address; 
        
        Alert.alert("Endereço: ", formattedAddress);
      })
      .catch(error => {
        console.error("ERROR : ENDEREÇO: ", error);
        Alert.alert("Houve um Erro ao recuperar sua posição, por favor, tenha certeza que este aplicativo tenha recebido a permissão para acessa sua Localização");
      });
  };
  // Pega as latitude e longitude e passa para o getLocation
  const getPosition = () => {
    Geolocation.getCurrentPosition(pos => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;

      getLocation(latitude, longitude);
    }, error => {
      console.error("ERROR : COORDENADAS: ", error);
    });
  };

  const onButtonPress = () => {
    getPosition();
  };

  return(
    <View>
      <TouchableOpacity 
        style={styles.button}
        onPress={onButtonPress}
      >
        <Icon name="person-pin" size={30} color={Colors.white}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundColor: Colors.asphalt,
    width: 59,
    height: 59,
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
});

export default NewEntryAddressPicker;