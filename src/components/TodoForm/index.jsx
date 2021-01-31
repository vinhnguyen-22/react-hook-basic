import React, { useState } from "react";

function TodoForm(props) {
  const { onSubmit } = props;
  const [value, setValue] = useState("");
  function handleValueChange(e) {
    setValue(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!onSubmit) return;
    const formValue = {
      title: value,
    };
    onSubmit(formValue);
    //TODO reset form value
    setValue("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleValueChange}
        value={value}
        name=""
        id=""
      />
    </form>
  );
}

TodoForm.propTypes = {};

export default TodoForm;
