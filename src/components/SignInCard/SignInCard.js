import { Component } from "react";
class SignInCard extends Component {
    state = {  }
    render() { 
        return ( <div class="gmail-signin">
        <div class="card">
          <div class="card-body">
            <div>
              <div class="dropdown">
                <span class="gprofile-name">Hi there, </span>

                <span class="gprofile-icon d-none float-end">
                  <a
                    class="btn"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {/* <img class="rounded-circle" src="../assets/icons/person-circle.svg"
                                      alt="Not Signed in" style="height: 50px;width: 50px;"/> */}
                  </a>

                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <a id="signout_button" class="dropdown-item" href="#">
                        &#10149; Sign out
                      </a>
                    </li>
                    <li>
                      <a
                        id="rescan_all_email_button"
                        class="dropdown-item"
                        href="#"
                      >
                        &#8635; Sync again
                      </a>
                    </li>
                  </ul>
                </span>
              </div>
              <div>
                <span class="wc-wish-time">Sign in to learn more!</span>
                <span
                  id="g-signin_button"
                  class="float-end btn btn-sm btn-outline-secondary d-flex flex-row d-none"
                >
                  <img
                    src="../assets/icons/google.svg"
                    alt="Google Sign in"
                  />
                  <span>&nbsp; Sign in</span>
                </span>
              </div>
            </div>
          </div>
          <div class="card-body email-scan-card-body d-none">
            <div>
              Updating transaction takes time. You can wait or scroll down to
              see more.
            </div>
            <div class="progress email-scan-progress">
              {/* <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                          style="width: 2%" aria-valuenow="2" aria-valuemin="0" aria-valuemax="100">Updating
                          transactions... </div> */}
            </div>
          </div>
        </div>
        <hr />
      </div> );
    }
}
 
export default SignInCard;