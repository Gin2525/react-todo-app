import React, { FC } from "react";
import TodoItem from "components/TodoItem";
import EntryForm from "components/EntryForm";
import { Container, Divider, Segment } from "semantic-ui-react";
import { Item } from "utils/types";
import useTodo from "hooks/use-todo";
import Spinner from "./Spinner";

const Todo: FC = () => {
  const [items, isLoading, addItem, checkItem, deleteItem] = useTodo();

  return (
    <Container>
      <h1>⚛️ React ToDo</h1>
      <Segment>
        <EntryForm addItem={addItem} />
      </Segment>

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
