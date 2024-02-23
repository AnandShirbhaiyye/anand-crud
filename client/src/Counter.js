//import React, { useState } from "react";
import React, { Component } from "react";

import "./Counter.css";

class Counter extends React.Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }
  decrementCount = () => {
    if (this.state.count > 0) {
      this.setState({ count: this.state.count - 1 });
    }
  };
  render() {
    return (
      <>
        <div className="counter-section">
          <button
            onClick={() => this.setState({ count: this.state.count + 1 })}
          >
            Increment
          </button>
          <p className="counter">{this.state.count}</p>
          <button onClick={this.decrementCount}>Decrement</button>
        </div>
      </>
    );
  }
}
// function Counter() {
//   const [count, setCount] = useState(0);

//   const decrementCount = () => {
//     if (count > 0) {
//       setCount(count - 1);
//     }
//   };

//}
export default Counter;
