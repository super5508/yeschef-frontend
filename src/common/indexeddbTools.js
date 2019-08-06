
const constants = {
    PLAYER_STATUS_STORE_NAME: 'playerStatus'
}

const getYCIndexedDB = (dbOpened) => {
    if ('indexedDB' in window) {
        const ycDBPromise = indexedDB.open("yc", 1);

        ycDBPromise.onupgradeneeded = (event) => {
            const db = event.target.result;
            let objectStore;
            if (!db.objectStoreNames.contains(constants.PLAYER_STATUS_STORE_NAME)) {
                objectStore = db.createObjectStore(constants.PLAYER_STATUS_STORE_NAME, { keyPath: 'videoId' });
            } else {
                objectStore = event.currentTarget.transaction.objectStore(constants.PLAYER_STATUS_STORE_NAME);
            }

            if (!objectStore.indexNames.contains("classId")) {
                objectStore.createIndex("classId", "classId", { unique: false });
            }
        };

        ycDBPromise.onsuccess = dbOpened;
    }
}

const getObject = (db, storeName, key) => {
    return new Promise((res, rej) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        store.get(key).onsuccess = (event) => {
            res(event.target.result);
        };
    });
};

const manipulateObject = (db, storeName, key, manipulate) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    store.get(key).onsuccess = (event) => {
        store.put(manipulate(event.target.result));
    };
};

export default {
    getObject,
    manipulateObject,
    constants,
    getYCIndexedDB
}