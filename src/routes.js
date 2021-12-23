import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Main from './pages/Main';
import NewEntry from './pages/NewEntry';
import Report from './pages/Report';

const Routes = createAppContainer( //Cria Container
  createSwitchNavigator( //Cria Interruptor de Navegacao
    {
      Main, 
      NewEntry, 
      Report
    },
    {
      initialRouteName: 'Main', //Nome da Rota Inicial
      backBehavior: 'history', //Comportamento da Volta
    },
  ),
);

export default Routes;