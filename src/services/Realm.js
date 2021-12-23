import Realm from 'realm';
import CategorySchema from '../schemas/CategorySchema';
import EntrySchema from '../schemas/EntrySchema';
import {getDefaultCategories} from './Categories';

export const getRealm = async () => {
  const realm = await Realm.open({
    schema: [CategorySchema, EntrySchema],
    schemaVersion: 1,
  });

  //dropDB(realm);
  initDB(realm);

  return realm;
};

export const initDB = (realm) => {
  const categoriesLength = realm.objects("Category").length;

  if (categoriesLength === 0) {
    const categories = getDefaultCategories();

    console.log(`Resultado do If: ${categories}`);

    try {
      realm.write(() => {
        categories.forEach(category => {
          console.log(
            `forEach: ${JSON.stringify(category)}`
          );

          realm.create("Category", category, true);
        });
      });
    } catch(error){};
  } else {};
};

export const dropDB = realm => {
  console.log("Banco de Dados DELETADO");
  realm.write(() => {
    realm.deleteAll();
  });
};