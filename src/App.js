import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";
import ShowCashier from "./components/ShowCashier";
import ShowKitchen from "./components/ShowKitchen";
import ShowFrontdesk from "./components/ShowFrontdesk";
import ShowBigtv from "./components/ShowBigtv";
import Login from "./components/Login";

function App() {
  const [todoItem, setTodoItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  // const handleReset = () => {
  //   setUsername("");
  // };

  const handleTodoChange = (e) => {
    setTodoItem(e.target.value);
  };

  //write
  const writeToDatabase = () => {
    const randNum = Math.floor(Math.random() * 899) + 100;

    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      todoItem: randNum,
      uuid: uuid,
      orderStatus: "placed",
    });
    setTodoItem("");
    setMessage("");
  };

  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          if (username === "kitchen" && todo.orderStatus === "placed") {
            setTodos((oldArray) => [...oldArray, todo]);
          }
          if (username === "frontdesk" && todo.orderStatus === "cooked") {
            setTodos((oldArray) => [...oldArray, todo]);
          }
          if (
            username === "bigtv" &&
            (todo.orderStatus === "placed" || todo.orderStatus === "cooked")
          ) {
            setTodos((oldArray) => [...oldArray, todo]);
          }
        });
      }
    });
  }, [username]);

  //delete
  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`));
  };

  const handleNext = (todo) => {
    let newStatus = todo.orderStatus;

    if (newStatus === "placed") {
      newStatus = "cooked";
      update(ref(db, `/${todo.uuid}`), {
        todo: todo.todoItem,
        uuid: todo.uuid,
        orderStatus: newStatus,
      });
    } else if (newStatus === "cooked") {
      // newStatus = "completed";
      remove(ref(db, `/${todo.uuid}`));
    }
    // update(ref(db, `/${todo.uuid}`), {
    //   todo: todo.todoItem,
    //   uuid: todo.uuid,
    //   orderStatus: newStatus,
    // });
    setTodoItem("");
  };

  return (
    <div className="App">
      {username !== "cashier" && (
        <>
          <div className="header">
            <h4>Welcome to Family Food Store</h4>
            {/* {username && (
              <>
                <button
                  onClick={() => {
                    handleReset();
                  }}
                >
                  X
                </button>
              </>
            )} */}
          </div>
        </>
      )}

      {username && (
        <div className="main-body">
          {username === "cashier" && (
            <ShowCashier
              location={username}
              todoItem={todoItem}
              handleTodoChange={handleTodoChange}
              writeToDatabase={writeToDatabase}
            />
          )}
          {username === "kitchen" && (
            <ShowKitchen
              todos={todos}
              handleDelete={handleDelete}
              handleNext={handleNext}
            />
          )}
          {username === "frontdesk" && (
            <ShowFrontdesk
              todos={todos}
              handleDelete={handleDelete}
              handleNext={handleNext}
            />
          )}
          {username === "bigtv" && (
            <ShowBigtv
              todos={todos}
              handleDelete={handleDelete}
              handleNext={handleNext}
            />
          )}
        </div>
      )}
      {!username && (
        <div className="login-box">
          <Login setUsername={setUsername} />
        </div>
      )}
    </div>
  );
}

export default App;
