import React, { Component } from "react";
import "./todolist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlipMove from "react-flip-move";
export default class Todolist extends Component {
  render() {
    const item = this.props.item;
    const listItem = item.map((i) => {
      return (
        <div className="list" key={i.key}>
          <p>
            <input
              type="text"
              id={i.key}
              value={i.text}
              onChange={(e) => {
                this.props.setUpdate(e.target.value, i.key);
              }}
            />

            <span>
              <FontAwesomeIcon
                className="faicon"
                icon="trash"
                onClick={() => this.props.deleteItem(i.key)}
              />
            </span>
          </p>
        </div>
      );
    });
    return (
      <div>
        <FlipMove duration={500} easing="ease-in-out">
          {listItem}
        </FlipMove>
      </div>
    );
  }
}
