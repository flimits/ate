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
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
// create an openDB - Database name, version.
// create a transaction - database name, readonly,
//c reate a store - store name,
// get the store NOTE: WE DO NOT NEED TO GET ALL ONLY ONE - 1, 
// await the request 
// return the result

export const getDb = async () => console.error('getDb not implemented');

initdb();
