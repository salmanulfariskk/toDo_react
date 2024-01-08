import React from "react";
import "./App.css";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import Edit from "./components/edit";

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");

  function addToDo() {
    if (toDo.trim() === "") return;
    setToDos([
      ...toDos,
      { id: Date.now(), text: toDo, status: false, isEditing: false },
    ]);
    setToDo("");
  }

  function deleteToDo(id) {
    setToDos((prev) => prev.filter((t) => t.id !== id));
  }

  function handleUpdate(e, id, text) {
    e.preventDefault();

    if (text.trim() === "") return;

    setToDos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text, isEditing: false } : t))
    );
  }

  function toggleEditToDo(id) {
    setToDos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isEditing: !t.isEditing } : t))
    );
  }

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addToDo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setToDos(
                      toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj.status = e.target.checked;
                        }
                        return obj;
                      })
                    );
                  }}
                  value={obj.status}
                />
                {obj.isEditing ? (
                  <Edit todo={obj} onSubmit={handleUpdate} />
                ) : (
                  <p>{obj.text}</p>
                )}
              </div>

              <button
                title="click to toggle edit"
                onClick={() => toggleEditToDo(obj.id)}
              >
                <CiEdit />
              </button>
              <button className="right" onClick={() => deleteToDo(obj.id)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          );
        })}
        {toDos.map((obj) => {
          if (obj.status) {
            return <h1 key={obj.id}>{obj.text}</h1>;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
