import { DailyCastData } from "../types";
import { DB_STORE_NAME_LIST, DB_NAME } from "../const";
import { APIConfig, IDBConfig, initIndexedDB } from "./init";

// generate API URL based on store name
const getAPIUrl = (storeName: string) => `/hystorical_data/${storeName}.json`;

// configuration for IndexedDB database
const dbConfig: IDBConfig = {
   dbName: DB_NAME,
   dbVersion: 1,
   objectStores: DB_STORE_NAME_LIST.map((name) => ({
      name,
      keyPath: "time",
   })),
};

// configuration for fetching data from APIs
const apiConfigList: APIConfig[] = DB_STORE_NAME_LIST.map((storeName) => ({
   apiUrl: getAPIUrl(storeName),
   storeName,
}));

// fetch historical cast data from IndexedDB
export const getCastData = async () => {
   // initialize IndexedDB and fetch data
   const db = await initIndexedDB(dbConfig, apiConfigList);
   let data: DailyCastData[] = [];

   // loop through each store to retrieve data
   for (const storeName of DB_STORE_NAME_LIST) {
      // create a read-only transaction for the store
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      // retrieve data from the store
      const result: DailyCastData[] = await new Promise((resolve) => {
         request.onsuccess = (event) => {
            resolve((event.target as IDBRequest).result);
         };
      });

      // add retrieved data to main 'data' array
      data = data.concat(result);
   }

   return data;
};
