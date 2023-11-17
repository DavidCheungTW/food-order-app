import React from "react";
import "../styles/ShowFrontdesk.css";

const ShowFrontdesk = ({ todos, handleDelete, handleNext }) => {
  return (
    <div className="show-frontdesk">
      {todos.map((todo) => (
        <>
          {/* <h5>
            {todo.todoItem} : {todo.orderStatus}
          </h5> */}
          {/* <button onClick={() => handleDelete(todo)}>delete</button> */}
          <button className="btn-frontdesk" onClick={() => handleNext(todo)}>
            {todo.todoItem}
          </button>
        </>
      ))}
    </div>
  );
};

export default ShowFrontdesk;
