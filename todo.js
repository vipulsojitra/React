import React, { Component } from "react";
import "./todo.css";
import Todolist from "./todolist";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash);
export default class Todo extends Component {
  userData;
  state = {
    item: [],
    currentItem: {
      text: "",
      key: "",
    },
  };
  addButton = (e) => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const newitem = [...this.state.item, newItem];
      this.setState({
        item: newitem,
        currentItem: {
          text: "",
          key: "",
        },
      });
    }
  };
  handleInput = (e) => {
    this.setState({ currentItem: { text: e.target.value, key: Date.now() } });
  };
  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem("item"));
    if (localStorage.getItem("item")) {
      this.setState({
        item: this.userData.item,
        currentItem: {
          text: this.userData.currentItem.text,
          key: this.userData.currentItem.key,
        },
      });
    }
  }
  componentWillUpdate(props, state) {
    localStorage.setItem("item", JSON.stringify(state));
  }

  deleteItem = (key) => {
    const filtterItem = this.state.item.filter((item) => item.key !== key);
    this.setState({ item: filtterItem });
  };
  setUpdate = (text, key) => {
    const item = this.state.item;
    item.map((item) => {
      if (item.key === key) {
        return (item.text = text);
      }
    });
    this.setState({ item: item });
  };

  render() {
    const Total = this.state.item.map((item) => {
      return item.length;
    });
    return (
      <div className="to-do-list">
        <header>
          <form id="to-do-form" onSubmit={this.addButton}>
            <h1 className="totalItem">Total Item={Total.length}</h1>
            <input
              type="text"
              placeholder="Enter Item"
              onChange={this.handleInput}
              value={this.state.currentItem.text}
            ></input>
            <button type="submit">Add</button>
          </form>
        </header>
        <Todolist
          item={this.state.item}
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
        />
      </div>
    );
  }
}
