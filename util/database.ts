import * as SQLite from 'expo-sqlite'

const database = SQLite.openDatabase('places.db')

export function init() {
  const promise = new Promise<void | SQLite.SQLError>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`,
        [],
        () => {
          resolve()
        },
        (_, error) => {
          reject(error)
          return true
        },
      )
    })
  })

  return promise
}

export function insertPlace(place: Place) {
  const promise = new Promise<SQLite.SQLResultSet | SQLite.SQLError>(
    (resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO places (title, imageUri, address, lat, lng) VALUES(?,?,?,?,?)`,
          [
            place.title,
            place.imageUri,
            place.address,
            place.location.lat,
            place.location.lng,
          ],
          (_, resultSet) => {
            console.log(resultSet)
            resolve(resultSet)
          },
          (_, error) => {
            reject(error)
            return true
          },
        )
      })
    },
  )

  return promise
}

export function fetchPlaces() {
  const promise = new Promise<SQLite.SQLResultSet | SQLite.SQLError>(
    (resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM places',
          [],
          (_, resultSet) => {
            resolve(resultSet)
          },
          (_, error) => {
            reject(error)
            return true
          },
        )
      })
    },
  )

  return promise
}
