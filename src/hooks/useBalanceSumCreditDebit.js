import {useEffect, useState} from 'react';

import {getBalanceSumByCategoryCreditDebit} from '../services/Balance';

const useBalanceSumCreditDebit = (days = 7, category) => {
  const [balanceDebitCredit , setBalanceDebitCredit] = useState([]);

  useEffect(() => {
    async function loadBalanceDebitCredit() {
      const data = await getBalanceSumByCategoryCreditDebit(days, category);
      setBalanceDebitCredit([...data]);
      
    } 
    loadBalanceDebitCredit();  
    
  }, [days, category]);

  return [balanceDebitCredit];
};

export default useBalanceSumCreditDebit;