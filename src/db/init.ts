import { DailyCastData } from "../types";

// types for IndexedDB and store configuration
type ObjectStore = {
   name: string;
   keyPath: string;
};

export type IDBConfig = {
   dbName: string;
   dbVersion: number;
   objectStores: ObjectStore[];
};

// type for API configuration
export type APIConfig = {
   apiUrl: string;
   storeName: string;
};

const fetchAndSaveData = async (
   // fetch API data and save to IndexedDB
   apiConfig: APIConfig,
   db: IDBDatabase
): Promise<void> => {
   try {
      const { storeName, apiUrl } = apiConfig;
      const response = await fetch(apiUrl);
      const data = await response.json();

      const transaction = db.transaction(storeName, "readwrite");
      const objectStore = transaction.objectStore(storeName);

      // save the response data to the IndexedDB
      data.forEach((item: DailyCastData) => {
         objectStore.put(item);
      });

      transaction.oncomplete = () => {
         console.log(`Data saved to ${storeName} in IndexedDB`);
      };

      transaction.onerror = () => {
         console.error(`Failed to save data to ${storeName} in IndexedDB`);
      };
   } catch (error) {
      console.error(
         `Failed to fetch or save API data for ${apiConfig.storeName}:`,
         error
      );
   }
};

export const initIndexedDB = (
   // initialize IndexedDB with configuration and fetch API data
   dbConfig: IDBConfig,
   apiConfigList: APIConfig[]
): Promise<IDBDatabase> => {
   return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbConfig.dbName, dbConfig.dbVersion);

      request.onupgradeneeded = (event) => {
         const db = (event.target as IDBOpenDBRequest).result;

         // create object stores based on configuration
         for (const storeConfig of dbConfig.objectStores) {
            if (!db.objectStoreNames.contains(storeConfig.name)) {
               db.createObjectStore(storeConfig.name, {
                  keyPath: storeConfig.keyPath,
               });
            }
         }
      };

      request.onsuccess = (event) => {
         const db = (event.target as IDBOpenDBRequest).result;

         // fetch and save data for each API configuration
         const fetchPromises = apiConfigList.map((apiConfig) =>
            fetchAndSaveData(apiConfig, db)
         );

         Promise.all(fetchPromises)
            .then(() => {
               console.log("All data saved to IndexedDB");
               resolve(db);
            })
            .catch((error) => {
               console.error("Failed to save data to IndexedDB:", error);
               reject(error);
            });
      };

      request.onerror = (event) => {
         reject((event.target as IDBOpenDBRequest).error);
      };
   });
};
