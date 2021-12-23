import {useEffect, useState} from 'react';

import {getEntriesCategoryCredit, saveEntry, deleteEntry} from '../services/Entries';

const useCategoryCredit = (days, category) => {
  const [entries, setEntries] = useState();

  useEffect(() => {
    async function loadEntries() {
      const data = await getEntriesCategoryCredit(days, category);
      setEntries(data);
    };

    loadEntries();
  }, [days, category]);

  return [entries, saveEntry, deleteEntry];
};

export default useCategoryCredit;