import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

PostFiltersForm.propTypes = {
  onSubmit: PropTypes.func,
};
PostFiltersForm.defaultProps = {
  onSubmit: null,
};

function PostFiltersForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeOutRef = useRef(null);
  /*
  def: The useRef Hook is a function that returns a mutable ref object whose 
  def: .current property is initialized to the passed argument(initialValue).
  def: The returned object will persist for the full lifetime of the component.
    */
  function handleSearchTermChange(e) {
    const value = e.target.value;

    setSearchTerm(value);
    if (!onSubmit) {
      return;
    }
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    //DEF set -- 100 --clear, set -- 300 --> submit
    //CASE SỬ DỤNG KỸ THUẬT DEBOUNCE
    typingTimeOutRef.current = setTimeout(() => {
      const formValue = {
        searchTerm: value,
      };
      onSubmit(formValue);
    }, 300);
  }
  return (
    <form>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        name=""
        id=""
      />
    </form>
  );
}

export default PostFiltersForm;
