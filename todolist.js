import React, { Component } from "react";
import "./todolist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class Todolist extends Component {
  render() {
    const {
      item,
      onCheck,
      setUpdate,
      deleteItem,
      valueDisplay,
      clearItem,
      Total,
    } = this.props;
    const listItem = item.map((i) => {
      const isChecked = {
        textDecoration: i.isChecked ? "line-through" : "none",
      };
      return (
        <div className="list" key={i.key}>
          <p>
            <input
              className="chkbox"
              type="checkbox"
              checked={i.isChecked}
              onChange={() => onCheck(i.key)}
            ></input>
            <input
              className="inputText"
              type="text"
              style={isChecked}
              key={i.key}
              value={i.text.trim(1)}
              onChange={(e) => {
                setUpdate(e.target.value, i.key);
              }}
            />

            <span>
              <FontAwesomeIcon
                className="faicon"
                icon="trash"
                onClick={() => deleteItem(i.key)}
              />
            </span>
          </p>
        </div>
      );
    });
    return (
      <div>
        <div className="maindiv">{listItem}</div>
        <div className="itemAndButton">
          <h1 className="totalItem">Total Item:{Total.length}</h1>
          <button
            className="allbutton"
            onClick={() => {
              valueDisplay("All");
            }}
          >
            All
          </button>
          <button
            className="allbutton"
            onClick={() => {
              valueDisplay("Active");
            }}
          >
            Active
          </button>
          <button
            className="allbutton"
            onClick={() => {
              valueDisplay("Completed");
            }}
          >
            Completed
          </button>
          <button
            className="allbutton"
            onClick={() => {
              clearItem();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}
