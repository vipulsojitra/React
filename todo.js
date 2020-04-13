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
    isDispaly: "All",
    allCheck: false,
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
    this.setState({
      currentItem: { text: e.target.value, key: Date.now(), isChecked: false },
    });
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

  onCheck = (key) => {
    const item = this.state.item;
    item.map((item) => {
      if (item.key === key) {
        if (item.isChecked === true) {
          return (item.isChecked = false);
        } else {
          return (item.isChecked = true);
        }
      }
    });
    this.setState({ item: item });
  };

  valueDisplay = (e) => {
    this.setState({ isDispaly: e });
  };
  clearItem = () => {
    const filtterItem = this.state.item.filter((item) => !item.isChecked);
    this.setState({ item: filtterItem });
  };
  onAllCheck = (e) => {
    let checked = e.target.checked;
    console.log("a", checked);
    const item = this.state.item;
    item.map((item) => {
      item.isChecked = checked;
    });
    this.setState({ item: item, allCheck: checked });
    console.log(this.state.allCheck);
  };
  render() {
    let array = [];

    if (this.state.isDispaly === "All") {
      array = this.state.item;
      console.log("kem", array);
    } else if (this.state.isDispaly === "Active") {
      array = this.state.item.filter((item) => !item.isChecked);
      console.log("kem1", array);
    } else if (this.state.isDispaly === "Completed") {
      array = this.state.item.filter((item) => item.isChecked);
    }

    let Total = [];
    Total = this.state.item.filter((item) => !item.isChecked);
    return (
      <div className="to-do-list">
        <header>
          <form id="to-do-form" onSubmit={this.addButton}>
            <input
              className="allcheckbox"
              type="checkbox"
              checked={this.state.allCheck}
              onChange={this.onAllCheck}
            ></input>
            <input
              className="txtbox"
              type="text"
              placeholder="Enter Item"
              onChange={this.handleInput}
              value={this.state.currentItem.text}
            ></input>
            <button type="submit">Add</button>
          </form>
        </header>
        <Todolist
          item={array}
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
          onCheck={this.onCheck}
          valueDisplay={this.valueDisplay}
          clearItem={this.clearItem}
          Total={Total}
        />
      </div>
    );
  }
}
