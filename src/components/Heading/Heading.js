import { Component } from "react";
import barChartIconCustom from "./bar-chart-steps.svg"
class Heading extends Component {
  state = { heading: "headeing", title: "title", subTitle: "" };
  render() {
    return (
      <div class="py-5 text-center">
        <img
          class="d-block mx-auto mb-4"
          src={barChartIconCustom}
          alt=""
          width="72"
          height="57"
        />
        <h2>Annual Tax Preparation</h2>
        <p class="lead">
          You can check your annual tax amount you need to pay.
        </p>
        <hr />
      </div>
    );
  }
}

export default Heading;
