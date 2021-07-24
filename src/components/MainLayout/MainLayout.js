import React, { Component } from "react";
import BetaInvite from "../BetaInvite/BetaInvite";
import Heading from "../Heading/Heading";
import Preference from "../Preference/Preference";
import SignInCard from "../SignInCard/SignInCard";
import TaxForm from "../TaxForm/TaxForm";
class MainLayout extends Component {
  state = {};
  render() {
    return (
      <main class="container" id="main">
        <Heading />
        <BetaInvite />
        <Preference />
        <SignInCard />
        <TaxForm />
      </main>
    );
  }
}

export default MainLayout;
