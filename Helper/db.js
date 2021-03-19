import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Places.db");

const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists Places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL,imageURI TEXT NOT NULL, address TEXT NOT NULL , lat REAL NOT NULL, lng REAL NOT NULL)",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (title,imageURI,address,lat,lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        " insert into Places (title,imageURI ,address,lat,lng)  values(?,?,?,?,?)",
        [title,imageURI,address,lat,lng],
        (_,result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          " select * from Places",
          [],
          (_,result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
  
    return promise;
  };


export default init;
