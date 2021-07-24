import React, { Component } from "react";
class RegimeCard extends Component {
  state = {};
  render() {
    return (
      <div class="card col-6">
        <h6 class="card-header">{this.props.name}</h6>
        <div class="card-body">
          <h6 class="card-title">
            <span class="icz-currency-symbol">₹</span>
            <span class="cz-itr-old-regime-amount" />
          </h6>
          <p class="card-text">Tax payble</p>
        </div>
      </div>
    );
  }
}

export default RegimeCard;
