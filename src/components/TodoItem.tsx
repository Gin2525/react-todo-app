import React, { FC } from "react";
import { Button, Checkbox, Grid, Segment } from "semantic-ui-react";
import { Item } from "utils/types";

const TodoItem: FC<{ item: Item; onCheck: any; deleteItem: any }> = ({ item, onCheck, deleteItem }) => {
  return (
    <Segment>
      <Grid columns={3}>
        <Grid.Column>
          <Checkbox toggle type="checkbox" defaultChecked={item.done} onClick={() => onCheck(item)} />
        </Grid.Column>
        <Grid.Column>
          <label>{item.text}</label>
        </Grid.Column>
        <Grid.Column className="todo-item-delete-button">
          <Button onClick={() => deleteItem(item)} color="red">
            delete
          </Button>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default TodoItem;
