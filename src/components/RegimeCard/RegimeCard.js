import React, { Component } from "react";
class RegimeCard extends Component {
  state = {};
  render() {
    return (
      <div className="card col-6">
        <h6 className="card-header">{this.props.name}</h6>
        <div className="card-body">
          <h6 className="card-title">
            <span className="icz-currency-symbol">₹</span>
            <span className="cz-itr-old-regime-amount" />
          </h6>
          <p className="card-text">Tax payble</p>
        </div>
      </div>
    );
  }
}

export default RegimeCard;
