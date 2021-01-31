import React, { useEffect, useState } from "react";
import queryString from "query-string";
import "./App.scss";
import ColorBox from "./components/ColorBox";
import Pagination from "./components/Pagination";
import PostList from "./components/PostList";
import PostFiltersForm from "./components/PostFiltersForm";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Clock from "./components/Clock";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: "I love JS",
    },
    {
      id: 2,
      title: "I love ReactJS",
    },
    {
      id: 3,
      title: "I love nodeJS",
    },
  ]);
  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: "",
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        //?_limit=10&_page=1
        const paramString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("failed to fetch data", error.message);
      }
    }
    console.log("PostList Effect");
    fetchPostList();
  }, [filters]); //![]);  chay dung mot lan

  useEffect(() => {
    console.log("TodoList Effect");
  });

  function handlePageChange(newPage) {
    console.log("New page", newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }
  function handleTodoFormSubmit(formValue) {
    console.log(formValue);
    const newTodo = {
      id: todoList.length + 1,
      ...formValue,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }
  function handleFiltersChange(newFilters) {
    console.log("new filters: ", newFilters);
    setFilters({ ...filters, _page: 1, title_like: newFilters.searchTerm });
  }
  const [showClock, setShowClock] = useState(true);
  const switchClock = () => {
    showClock === true ? setShowClock(false) : setShowClock(true);
  };
  return (
    <div className="app">
      <h1>COLOR BOX</h1>
      <ColorBox />
      <h1>TODOList</h1>
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <h1>POSTLIST</h1>
      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
      <h1>Clock with react JS</h1>
      {showClock && <Clock />}
      <button onClick={switchClock}>
        {showClock ? `Hide Clock` : `Open Clock`}
      </button>
    </div>
  );
}

export default App;
