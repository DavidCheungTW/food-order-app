import React, { useState } from "react";
import "../styles/ShowKitchen.css";

const ShowKitchen = ({ todos, handleDelete, handleNext }) => {
  const [digitlist, setDigitlist] = useState("");
  const [message, setMessage] = useState("");

  const handleKeyin = (key) => {
    setMessage("");
    if (key === "Clear") {
      setDigitlist("");
    } else if (key === "Enter") {
      setDigitlist("");

      const selectTodo = todos.filter((todo) => {
        return todo.todoItem.toString() === digitlist;
      });

      if (selectTodo.length > 0) {
        handleNext(selectTodo[0]);
        setDigitlist("");
      } else {
        if (digitlist.length > 0) {
          setMessage(`${digitlist} Not Exist!`);
        }
      }
    } else if (digitlist.length < 3) {
      setDigitlist(digitlist + key);
    }
  };

  return (
    <div className="show-kitchen">
      <div className="keypad">
        <button className="keyButton" onClick={() => handleKeyin("7")}>
          7
        </button>
        <button className="keyButton" onClick={() => handleKeyin("8")}>
          8
        </button>
        <button className="keyButton" onClick={() => handleKeyin("9")}>
          9
        </button>
        <button className="keyButton" onClick={() => handleKeyin("4")}>
          4
        </button>
        <button className="keyButton" onClick={() => handleKeyin("5")}>
          5
        </button>
        <button className="keyButton" onClick={() => handleKeyin("6")}>
          6
        </button>
        <button className="keyButton" onClick={() => handleKeyin("1")}>
          1
        </button>
        <button className="keyButton" onClick={() => handleKeyin("2")}>
          2
        </button>
        <button className="keyButton" onClick={() => handleKeyin("3")}>
          3
        </button>
        <button className="keyButton" onClick={() => handleKeyin("Clear")}>
          Clear
        </button>
        <button className="keyButton" onClick={() => handleKeyin("0")}>
          0
        </button>
        <button className="keyButton" onClick={() => handleKeyin("Enter")}>
          Enter
        </button>
      </div>
      {digitlist && (
        <div className="display">
          <p>{digitlist}</p>
        </div>
      )}
      {message && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ShowKitchen;
