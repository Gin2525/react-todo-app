import React, { FormEvent, KeyboardEvent, useState } from "react";
import { FC } from "react";
import { Button, Icon } from "semantic-ui-react";

const EntryForm: FC<{ addItem: (text: string) => void }> = ({ addItem }) => {
  const [text, setText] = useState("");
  const [composing, setComposing] = useState(true);

  const reloadText = (event: FormEvent<HTMLInputElement>) => setText(event.currentTarget.value);

  const createTodo = () => {
    if (!text) return;
    addItem(text);
    setText("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && composing) {
      createTodo();
      setText("");
    }
  };

  return (
    <>
      <input
        className="todo-input"
        type="text"
        value={text}
        onChange={reloadText}
        onKeyDown={handleKeyDown}
        onCompositionStart={(_e) => setComposing(false)}
        onCompositionEnd={(_e) => setComposing(true)}
        placeholder="Do you have task?"
      />

      <Button animated onClick={createTodo} color="blue">
        <Button.Content visible>Todo</Button.Content>
        <Button.Content hidden>
          <Icon name="archive" />
        </Button.Content>
      </Button>
    </>
  );
};

export default EntryForm;
