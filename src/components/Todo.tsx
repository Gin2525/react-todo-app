import React, { FC } from "react";
import TodoItem from "Organisms/TodoItem";
import EntryForm from "Organisms/EntryForm";
import { Container, Divider } from "semantic-ui-react";
import { Item } from "utils/types";
import useTodo from "hooks/use-todo";
import Spinner from "../Atoms/Spinner";

const Todo: FC = () => {
  const [items, isLoading, addItem, checkItem, deleteItem] = useTodo();

  return (
    <Container>
      <h1>⚛️ React ToDo</h1>
      <EntryForm addItem={addItem} />
      <Divider />
      {isLoading ? (
        <Spinner />
      ) : (
        items.map((item: Item) => (
          <TodoItem
            // keyがないとwarning
            key={item.key}
            item={item}
            onCheck={checkItem}
            deleteItem={deleteItem}
          />
        ))
      )}

      <div>{items.length} items</div>
    </Container>
  );
};

export default Todo;
