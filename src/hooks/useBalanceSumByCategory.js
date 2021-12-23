import {useEffect, useState} from 'react';

import {getBalanceSumByCategory} from '../services/Balance';

const useBalanceSumByCategory = (days = 7, category) => {
  const [balanceSum, setBalanceSum] = useState([]);

  useEffect(() => {
    async function loadBalanceSumByCategory() {
      const data = await getBalanceSumByCategory(days, category);
      setBalanceSum([...data]);
      
    } 
    loadBalanceSumByCategory();  
    
  }, [days, category]);

  return [balanceSum];
};

export default useBalanceSumByCategory;

