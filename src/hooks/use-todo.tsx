import { useEffect, useState } from "react";
import "utils/FirestoreUtil";
import fireStore from "utils/FirestoreUtil";
import { genKey } from "utils/functionBox";
import { Item } from "utils/types";

const useTodo = (): [
  Item[],
  boolean,
  (newText: string) => void,
  (checkedItem: Item) => void,
  (deleteItem: Item) => void
] => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const createItem = (newText: string, done: boolean) => {
    const newItem: Item = {
      key: genKey(),
      text: newText,
      done: done,
    };
    return newItem;
  };

  const addItem = (newText: string) => {
    const newItem = createItem(newText, false);
    setItems((prevState) => prevState.concat(newItem));
    fireStore.insertItem(newItem);
  };

  const checkItem = (checkedItem: Item) => {
    checkedItem.done = !checkedItem.done;
    const newItems = items.map((item) => {
      if (item.key === checkedItem.key) return checkedItem;
      return item;
    });
    setItems(() => newItems);
    fireStore.updateItem(checkedItem);
  };

  const deleteItem = (selectedItem: Item) => {
    setItems(() => items.filter((item) => item.key !== selectedItem.key));
    fireStore.deleteItem(selectedItem);
  };

  useEffect(() => {
    (async () => {
      const items: Item[] = (await fireStore.fetchAllItem()) as Item[];
      setLoading(false);
      setItems(items);
    })();
  }, []);

  return [items, isLoading, addItem, checkItem, deleteItem];
};

export default useTodo;
