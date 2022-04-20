import { Component } from "react";
class Preference extends Component {
    state = {  }
    render() { 
        return ( <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h5 id="offcanvasRightLabel">Setting</h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <form className="needs-validation" noValidate id="preference-form">
                <div className="col-12">
                  <label htmlFor="budgetAmount" className="form-label">
                    Set a monthly budget
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text cz-currency-symbol">₹</span>
                    <input
                      type="number"
                      className="form-control"
                      id="budgetAmount"
                      min="1"
                      placeholder=""
                      defaultValue=""
                      required
                    />
                    <div className="invalid-feedback">
                      Valid amount is required.
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className="w-100 mt-2 btn btn-primary btn-lg submit-btn save-preference-btn"
                    type="button"
                  >
                    &#10004; Save
                  </button>
                  <div className="mt-2 save-preference-msg" />
                </div>
              </form>
              <div className="clear-all-page-data">
                <hr />
                <h6 className="d-flex justify-content-between align-items-center mb-3">
                  <a
                    href="#all-transactions"
                    className="clear-all-page-data__a fw-bold see-all-transactions-wrapper__a"
                  >
                    <span className="text-secondary">
                      Delete all of my data present on this page.
                    </span>
                    <img src="../assets/icons/trash-fill.svg" alt="Delete" />
                  </a>
                </h6>
                <div className="text-danger">
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