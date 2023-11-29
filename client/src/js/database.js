import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// add R.U.: Update, Get. 

// create an openDB - Database name, version.
// create a transaction - database name, readwrite, 
// create a store - store name, 
// put the store - content: {id, info }
// await the request
// export const putDb = async (content) => console.error('putDb not implemented');
export const putDb = async (id, content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, jate: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
// create an openDB - Database name, version.
// create a transaction - database name, readonly,
// create a store - store name,
// get the store NOTE: WE DO NOT NEED TO GET ALL ONLY ONE - 1, 
// await the request 
// return the result

// export const getDb = async (id) => console.error('getDb not implemented');
export const getDb = async (id) => {
  const jateDB = await openDB('jate',1);
  const tx = jateDB.transaction('jate', 'readonly ');
  const store = tx.objectStore('jate');
  const request = store.get(id);
  const result = await request;
  console.log('result');
  return result;
}

initdb();
