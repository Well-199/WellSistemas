import _ from 'lodash';
import moment from '../vendors/moment';

import { getRealm } from './Realm';
import { getUUID } from './UUID';

import Colors from '../styles/Colors';

export const getBalance = async () => {
  const realm = await getRealm();

  let entries = realm.objects("Entry");

  return entries.sum("amount");
};
// showOthers caso false renderiza todas as categorias a nao apenas 4
export const getBalanceSumByCategory = async (days, category, showOthers = true) => {
  const realm = await getRealm();

  let entries = realm.objects('Entry'); // entries recebe todos os lançamentos

  // Filtra por Data
  if (days > 0) { // if e para saber se existe a data, se for igual a zero nao tem como fazer o filtro porque nao existe
    const date = moment()
      .subtract(days, 'days')
      .toDate();

    entries = entries.filtered('entryAt >= $0', date);
  };
  // Filtra por Categoria
  if (category && category.id) { // if pergunta se o id da categoria existe ou se e null se existir fitra
    
    entries = entries.filtered('category.id == $0', category.id);
  };
  // Agrupa as categorias e faz a Soma dos Amount
  entries = _(entries)
    .groupBy(({category: {id}}) => id)
    .map(entry => ({
      category: _.omit(entry[0].category, 'entries'),
      amount: Math.abs(_.sumBy(entry, 'amount')),
    }))
    .filter(({amount}) => amount > 0)// Filtra por valores 
    .orderBy('amount', 'desc');// Retorna na ordem do maior para o menor

    // Cria um Limite de 3 Categorias por renderização
    // A Quarta Categoria e a soma das que nao sao renderizadas
    const othersLimit = 3;

    if(showOthers && _(entries).size() > othersLimit){// Se o array conter mais de 3 objetos cada objeto é um lançamento
      const data1 = _(entries).slice(0, othersLimit);//slice == fatia um array corta um array de 0 até 3 e mostra eles separadamente
      const data2 = [
        {
          category: {
            id: getUUID(), 
            name: "Outros", 
            color: Colors.metal
          },
          amount: // a nova categoria recebe a soma de todos os amount dos outros laçamentos
            _(entries)
            .slice(othersLimit)
            .map(({amount}) => amount)
            .sum(),
        }
      ];

      entries = [...data1, ...data2];
    };
  
  return entries;
};
/* 
  O Objeto data1 traz as um array com as tres categorias renderizadas na Main
  Ja Objeto data2 traz um array com todas a soma das categorias que nao foram renderizadas
  na Main, elas sao agrupadas na categoria Outros
*/

/*-------------------------------------------------------------------------------------*/
// Funçao de Teste para Soma e Agrupamento de Receitas isCretid e Despesas isDebit

export const getBalanceSumByCategoryCreditDebit = async (days, category) => {
  const realm = await getRealm();

  let creditCategory = realm.objects("Entry");// entries recebe todos os lançamentos

  // Filtra por Data
  if (days > 0) { // if e para saber se existe a data, se for igual a zero nao tem como fazer o filtro porque nao existe
    const date = moment()
      .subtract(days, 'days')
      .toDate();

      creditCategory = creditCategory.filtered('entryAt >= $0', date);
  };
  // Filtra por Categoria
  if(category && category.id) { // if pergunta se o id da categoria existe ou se e null se existir fitra
    
    creditCategory = creditCategory.filtered('category.id == $0', category.id);
  };
  // Agrupa as categorias e faz a Soma dos Amount
    
  creditCategory = _(creditCategory)
    .groupBy(({category: {isCredit}}) => isCredit) //Agrupa em um Por uma Chave do Objeto
    .map(entry => ({
      category: _.omit(entry[0].category, 'entries'),
      amount: Math.abs(_.sumBy(entry, 'amount')),
      
    }))
    
    .filter(({amount}) => amount > 0)// Filtra por valores 
    .orderBy('amount', 'desc');// Retorna na ordem do maior para o menor

  //console.log("1 - Novo Filtro Retorna: ", JSON.stringify(creditCategory));

  return creditCategory;
};
getBalanceSumByCategoryCreditDebit();