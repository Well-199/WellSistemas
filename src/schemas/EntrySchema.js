const EntrySchema = {
  name: 'Entry',
  primaryKey: 'id',
  properties: {
    id: 'string',
    amount: 'double',
    description: 'string?',
    entryAt: 'date',
    latitude: 'float?',
    longitude: 'float?',
    address: 'string?',
    photo: 'string?',
    isInt: 'bool',
    category: 'Category',
  },
};

export default EntrySchema;