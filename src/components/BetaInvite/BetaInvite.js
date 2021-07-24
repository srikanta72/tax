import { Component } from "react";

class BetaInvite extends Component {
    state = { emailToContact:'mailto:teamcutezero@gmail.com' }
    render() { 
        return ( <div>
            <p>
              <strong>[BETA]</strong> Get Beta invite{" "}
              <a href={this.state.emailToContact}>here</a>.
              <a
                class="btn float-end d-inline offcanvas_btn preference-btn"
                href="/"
                role="button"
                aria-controls="offcanvasRight"
              >
                {/* <img src="../assets/icons/three-dots-vertical.svg" alt="Menu" style="width: 20px"
                            data-bs-target="#offcanvasRight" data-bs-toggle="offcanvas" class="img-fluid hlogo rounded"/> */}
              </a>
            </p>
          </div> );
    }
}
 
export default BetaInvite;