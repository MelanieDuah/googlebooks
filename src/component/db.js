class Db {
  constructor(dbName, storeName) {
    this.db = null;
    this.request = null;
    this.storeName = storeName;
    this.initializedb(dbName, storeName);
  }

  initializedb(dbName, storeName) {
    this.request = window.indexedDB.open(dbName, 1, (dd) => {
      debugger;
    });

    this.request.onupgradeneeded = (event) => {
      this.db = event.target.result;
      const objectStore = this.db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex(storeName, 'id');
    };

    this.request.onsuccess = (event) => {
      this.db = event.target.result;
    };

    this.request.onerror = (event) => {
      debugger;
      console.log("error" + event.target.errorCode);
    }
  }

  getAll(callback) {
    const transaction = this.db.transaction([this.storeName], "readwrite");

    const store = transaction.objectStore(this.storeName);
    const getAll = store.getAll();

    getAll.onsuccess = () => {
      debugger;
      callback(getAll.result);
    }
  }

  save(record) {
    const transaction = this.db.transaction([this.storeName], "readwrite");
    const store = transaction.objectStore(this.storeName);
    store.add(record);
  }

  delete(key) {
    const transaction = this.db.transaction([this.storeName], "readwrite");
    const store = transaction.objectStore(this.storeName);
    store.delete(key);
  }
}

Db.createDb = (dbName, storeName) => new Db(dbName, storeName);

export default Db;