// import React, { Component } from "react";
// import "./style.css";
import "./itr.js";
import { Component } from "react";
import RegimeCard from "../RegimeCard/RegimeCard.js";
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import SimpleAccordion from "../Accordions/SimpleAccordion.js";
class TaxForm extends Component {
  state = {  };
    render() {
    return (
      <div class="container">
        <div class="row">
          <RegimeCard name="Old Regime" />
          <RegimeCard name="New Regime" />
        </div>
        <div>
          <hr />
          <form class="needs-validation" novalidate id="cz-itr-calc-form">
            <div class="row g-3">
              <div class="accordion p-0" id="heading-ITRCALC" />
            </div>
            {/* <SimpleAccordion/> */}
          </form>
        </div>
      </div>
    );
  }
}

export default TaxForm;
