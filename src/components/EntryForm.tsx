import React, { FormEvent, KeyboardEvent, useState } from "react";
import { FC } from "react";
import { Input } from "semantic-ui-react";

const EntryForm: FC<{ addItem: (text: string) => void }> = ({ addItem }) => {
  const [text, setText] = useState("");
  const [composing, setComposing] = useState(true);

  const reloadText = (event: FormEvent<HTMLInputElement>) =>
    setText(event.currentTarget.value);

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
    <Input
      type="text"
      value={text}
      onChange={reloadText}
      onKeyDown={handleKeyDown}
      onCompositionStart={() => setComposing(false)}
      onCompositionEnd={() => setComposing(true)}
      placeholder="Do you have task?"
      size="huge"
      action={{
        onClick: createTodo,
        color: "blue",
        labelPosition: "right",
        icon: "archive",
        content: "Todo!",
      }}
    />
  );
};

export default EntryForm;
