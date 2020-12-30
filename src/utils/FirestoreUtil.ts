import { Item } from "utils/types";
import { db } from "utils/Firebase";
import "firebase/firestore";

const ITEMS = "items";

const doc2Item = (doc: any): Item => ({
  key: doc.data().key,
  text: doc.data().text,
  done: doc.data().done,
});

const fireStoreUtils = {
  fetchAllItem: async () => {
    try {
      const docs = await db.collection(ITEMS).get();
      const items: Item[] = [];
      docs.forEach((doc) => items.push(doc2Item(doc)));
      return items;
    } catch (err) {
      console.log(err);
    }
  },
  insertItem: async (item: Item) => {
    try {
      await db.collection(ITEMS).add(item);
    } catch (err) {
      console.log(err);
    }
  },
  deleteItem: async (item: Item) => {
    try {
      const dItem = await db.collection(ITEMS).where('key', '==', item.key).get();
      await db.collection(ITEMS).doc(dItem.docs[0].id).delete();
      
    } catch (err) {
      console.log(err);
    }
  },
  updateItem: async (item: Item) => {
    try {
      const uItem = await db.collection(ITEMS).where('key', '==', item.key).get();
      await db.collection(ITEMS).doc(uItem.docs[0].id).update(item);
      
    } catch (err) {
      console.log(err);
    }
  }
};

export default fireStoreUtils;
