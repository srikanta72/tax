import { Component } from "react";
class Preference extends Component {
    state = {  }
    render() { 
        return ( <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div class="offcanvas-header">
              <h5 id="offcanvasRightLabel">Setting</h5>
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div class="offcanvas-body">
              <form class="needs-validation" novalidate id="preference-form">
                <div class="col-12">
                  <label for="budgetAmount" class="form-label">
                    Set a monthly budget
                  </label>
                  <div class="input-group has-validation">
                    <span class="input-group-text cz-currency-symbol">₹</span>
                    <input
                      type="number"
                      class="form-control"
                      id="budgetAmount"
                      min="1"
                      placeholder=""
                      value=""
                      required
                    />
                    <div class="invalid-feedback">
                      Valid amount is required.
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <button
                    class="w-100 mt-2 btn btn-primary btn-lg submit-btn save-preference-btn"
                    type="button"
                  >
                    &#10004; Save
                  </button>
                  <div class="mt-2 save-preference-msg" />
                </div>
              </form>
              <div class="clear-all-page-data">
                <hr />
                <h6 class="d-flex justify-content-between align-items-center mb-3">
                  <a
                    href="#all-transactions"
                    class="clear-all-page-data__a fw-bold see-all-transactions-wrapper__a"
                  >
                    <span class="text-secondary">
                      Delete all of my data present on this page.
                    </span>
                    <img src="../assets/icons/trash-fill.svg" alt="Delete" />
                  </a>
                </h6>
                <div class="text-danger">
                  <small>
                    <strong>Warning: </strong> Any data created on this page
                    will be deleted when you clear all of your data.
                  </small>
                </div>
                <hr />
              </div>
            </div>
          </div> );
    }
}
 
export default Preference;