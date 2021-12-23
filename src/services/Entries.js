import {Alert} from 'react-native';
import moment from '../vendors/moment';
import {getRealm} from './Realm';
import {getUUID} from '../services/UUID';

//Pegar ou Consultar no Banco de Dados 

export const getEntries = async (days, category) => {
  let realm = await getRealm();

  realm = realm.objects('Entry');

  if(days > 0) {
    const date = moment() // date recebe moment com a data atual
    .subtract(days, 'days') // realiza uma subtraçao de acordo com (days) data do lançamento
    .toDate();

    realm = realm.filtered('entryAt >= $0', date);
  };

  if (category && category.id) {
    
    realm = realm.filtered('category.id == $0', category.id);
  };

  const entries = realm.sorted('entryAt', true);
  //console.log("Sorted: ", JSON.stringify(realm.sorted('entryAt', true)))

  return entries;
};

// Salvar no Banco de Dados

export const saveEntry = async (value, entry = {}) => {
  const realm = await getRealm();
  let data = {};
  // const { amount } = value
  // o mesmo que const amount  = value.amount
  // { } desconstroi todo objeto value tira o valor e joga pra const amount

  try {
    realm.write(() => {
      data = {
        id: value.id || entry.id || getUUID(),  // Quando trago dados de um 
        amount: value.amount || entry.amount,   //novo lancamento carrego dados
        entryAt: value.entryAt || entry.entryAt,//do value e quando e uma alteração 
        description: value.description || entry.description,
        photo: value.photo,   
        isInt: false,                           //carrego os dados do entry
        category: value.category || entry.category,
      };
      //console.log(data);
  
      realm.create('Entry', data, true)
    });
  
    //console.log('Save: ' , JSON.stringify(data));
  } catch(error) {
    console.error(
      'saveEntry :: error on save object',
      JSON.stringify(data)
    );
    Alert.alert("Erro ao Salvar os Lançamentos.");
  }

  return data;
};

// Excluir dados do Banco de Dados

export const deleteEntry = async entry => {
  const realm = await getRealm();

  try {
    realm.write(() => {
      realm.delete(entry);
    });
      //console.log("Delete: ", JSON.stringify(entry));
  } catch (error) {
    console.error(
      'deleteEntry :: error on save object',
      JSON.stringify(entry)
    );
    Alert.alert("Erro ao Excluir este Lançamento.");
  }
};

export const getEntriesCategoryCredit = async (days, category) => {
  let realm = await getRealm();

  realm = realm.objects('Entry');

  if(days > 0) {
    const date = moment() // date recebe moment com a data atual
    .subtract(days, 'days') // realiza uma subtraçao de acordo com (days) data do lançamento
    .toDate();

    realm = realm.filtered('entryAt >= $0', date);
  };

  //Filtro Por Lançamento de receitas
  realm = realm.filtered("category.isCredit == true", category);

  const entries = realm.sorted('entryAt', true);

  //console.log("RETORNA: ", JSON.stringify(entries));
  return entries;
};

export const getEntriesCategoryDebit = async (days, category) => {
  let realm = await getRealm();

  realm = realm.objects('Entry');

  if(days > 0) {
    const date = moment() // date recebe moment com a data atual
    .subtract(days, 'days') // realiza uma subtraçao de acordo com (days) data do lançamento
    .toDate();

    realm = realm.filtered('entryAt >= $0', date);
  };

  //Filtro Por Lançamento de Despesas
  realm = realm.filtered("category.isDebit == true", category);

  const entries = realm.sorted('entryAt', true);

  //console.log("RETORNA: ", JSON.stringify(entries));
  return entries;
};