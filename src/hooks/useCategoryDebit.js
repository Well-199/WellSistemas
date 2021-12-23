import {useEffect, useState} from 'react';

import {getEntriesCategoryDebit, saveEntry, deleteEntry} from '../services/Entries';

const useCategoryDebit = (days, category) => {
  const [entries, setEntries] = useState();

  useEffect(() => {
    async function loadEntries() {
      const data = await getEntriesCategoryDebit(days, category);
      setEntries(data);
    };

    loadEntries();
  }, [days, category]);

  return [entries, saveEntry, deleteEntry];
};

export default useCategoryDebit;