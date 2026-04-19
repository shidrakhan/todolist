import "./App.css";
import { useState, useEffect } from "react";

function App() {

  // ✅ Load from localStorage
  const [todolist, setTodolist] = useState(() => {
    let saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);

  const saveToDoList = (event) => {
    event.preventDefault();
    let toname = event.target.toname.value.trim();

    if (toname === "") return;

    if (!todolist.includes(toname)) {
      setTodolist([...todolist, toname]);
    } else {
      alert("ToDo Name Already Exists...");
    }

    event.target.toname.value = "";
  };

  // ✅ FIXED map rendering
  let list = todolist.map((value, index) => {
    return (
      <ToDoListItems
        value={value}
        key={index}
        indexNumber={index}
        todolist={todolist}
        setTodolist={setTodolist}
      />
    );
  });

  return (
    <div className="App">
      <h1>ToDo List</h1>

      <form onSubmit={saveToDoList}>
        <input type="text" name="toname" placeholder="Enter task..." />
        <button>Save</button>
      </form>

      {/* ✅ ToDo List Display */}
      <div className="outerDiv">
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;


// ✅ Item Component
function ToDoListItems({ value, indexNumber, todolist, setTodolist }) {

  const [status, setstatus] = useState(false);

  const deletRow = (e) => {
    e.stopPropagation(); // prevent toggle when deleting
    let finalData = todolist.filter((v, i) => i !== indexNumber);
    setTodolist(finalData);
  };

  const checkStatus = () => {
    setstatus(!status);
  };

  return (
    <li
      className={status ? "completetodo" : ""}
      onClick={checkStatus}
    >
      {indexNumber + 1}. {value}
      <span onClick={deletRow}>&times;</span>
    </li>
  );
}