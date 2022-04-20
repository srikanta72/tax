import $ from 'jquery';
import 'bootstrap';
import { IncomeExmptionConstant } from '../../models/constants/IncomeExemptions';
const INCOMES_EXEMPTIONS = IncomeExmptionConstant;
const EXEMPTED_INCOME_LIMIT = 250000;
const TERM_CZ_ITR = 'cz-itrsec-';
const SELECTOR_ACCRDION_ROOT_LEVEL_ID = '#heading-ITRCALC';

$(document).ready(async function() {
  await prepareItrForm(INCOMES_EXEMPTIONS, SELECTOR_ACCRDION_ROOT_LEVEL_ID);
});
async function prepareItrForm(jsonArray, parentSelector) {
  const inputHtml = `
    <div className="col-12 pt-2">
    
        <div className="form-floating mb-3">
        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
        <div className="invalid-feedback">
                            Valid amount is required.
                        </div>
        </div>
    </div>`;
  const accordianItemHtml = `<div className="accordion-item p-1">
        <h2 className="accordion-header">
            <button className="accordion-button collapsed p-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseITR80C" aria-expanded="false" aria-controls="collapseITR80C">
                <div className="col-5 label-title-alt"> Title </div>
                <div className="col-6">
                    <!-- <label for="" className="form-label"></label> -->
                    <div className="input-group has-validation">
                        <span className="input-group-text cz-currency-symbol bg-transparent border-0 p-0">₹</span>
                        <input type="number" className="form-control bg-transparent border-0" disabled>
                        <div className="invalid-feedback">
                            Valid amount is required.
                        </div>
                    </div>
                </div>
            </button>
        </h2>
        <div id="collapseITR80C" className="accordion-collapse collapse" aria-labelledby="headingITR80C" data-bs-parent="#headingExemptions">
            <div className="accordion-body p-2">
                <!-- Body -->
            </div>
        </div>
    </div>`;
  const buttonHtml = `<div className="col-12">
        <button className="btn btn-sm btn-outline-primary mt-2 next-btn" type="button">&#10142; Next</button>
    </div>`;
  for (let i = 0; i < jsonArray.length; i++) {
    const jsonObj = jsonArray[i];
    let isJsonArray = false;
    let htmlString = inputHtml;
    if (jsonObj.includes && jsonObj.includes.length > 1) {
      htmlString = accordianItemHtml;
      isJsonArray = true;
    }
    let accordianBodyElement = $('<div></div>', { html: htmlString });
    const elementId = TERM_CZ_ITR + jsonObj.code;
    let selector = '';
    let dataBsParent;
    selector = jsonObj.comesUnder
      ? '.cz-itr-' + jsonObj.comesUnder + '-' + jsonObj.code
      : '.cz-itr-' + jsonObj.code;
    let class_1 = jsonObj.comesUnder
      ? 'cz-itr-' + jsonObj.comesUnder + '-' + jsonObj.code
      : '.cz-itr-' + jsonObj.code;

    dataBsParent = jsonObj.comesUnder ? '#heading-' + jsonObj.comesUnder : '';
    let headingId = 'heading-' + jsonObj.code;
    let collapseId = 'collapse-' + jsonObj.code;
    if (isJsonArray) {
      accordianBodyElement
        .find('div h2.accordion-header')
        .attr({ id: headingId });
      accordianBodyElement
        .find('div.accordion-item div.accordion-collapse')
        .attr({
          id: collapseId,
          'aria-labelledby': headingId,
          'data-bs-parent': dataBsParent
        });
      accordianBodyElement
        .find('div h2.accordion-header button.accordion-button')
        .attr({
          'data-bs-target': '#' + collapseId,
          'aria-controls': collapseId
        });
      accordianBodyElement
        .find('div.accordion-item div.accordion-collapse div.accordion-body')
        .addClass(class_1);
      accordianBodyElement
        .find('h2 button div.label-title-alt')
        .html(jsonObj.title);
      accordianBodyElement.find('input').attr({
        id: elementId
      });
      $(parentSelector).append(accordianBodyElement.html());
      await prepareItrForm(jsonObj.includes, '.accordion-body' + selector);
    } else {
      accordianBodyElement.find('input').attr({
        id: elementId,
        min: jsonObj.min || 1,
        max: jsonObj.max,
        placeholder: jsonObj.max,
        value: jsonObj.value || '',
        disabled: jsonObj.disabled || false
      });
      accordianBodyElement.find('label').attr({ for: elementId });
      accordianBodyElement.find('label').html(jsonObj.title);
      $(parentSelector).append(accordianBodyElement.html());
    }

    if (
      i === jsonArray.length - 1 &&
      jsonArray[0].code !== INCOMES_EXEMPTIONS[0].code
    ) {
      let buttonElement = $('<div></div>', { html: buttonHtml });
      buttonElement.find('button').attr({
        'data-bs-target': '#collapse-' + jsonObj.comesUnder,
        'data-bs-toggle': 'collapse'
      });
      $(parentSelector).append(buttonElement.html());
      await nextBtnRegister();
    }
  }
}
async function nextBtnRegister() {
  $('.next-btn')
    .unbind()
    .on('click', async function() {
      let userInput = [];
      userInput = await jQueryInputValues(INCOMES_EXEMPTIONS);
      await calculateTaxPaybleOldRegime(userInput);
      await calculateTaxPaybleNewRegime(userInput);
    });
}
async function jQueryInputValues(jsonObj, isItrOption) {
  if (!jsonObj) {
    return;
  }
  let resultJsonArray = [];
  for (const jsonItem of jsonObj) {
    let resultJson = {};
    resultJson.code = jsonItem.code;
    if (jsonItem.includes && jsonItem.includes.length) {
      resultJson.includes = await jQueryInputValues(
        jsonItem.includes,
        isItrOption
      );
      resultJson.value = await calculateValuesSum(
        resultJson.includes,
        isItrOption
      );

      $('#' + TERM_CZ_ITR + jsonItem.code).val(resultJson.value);
    } else {
      resultJson.value = $('#' + TERM_CZ_ITR + jsonItem.code).val();
      if (isItrOption && resultJson.value > jsonItem.max) {
        resultJson.value = jsonItem.max;
      }
    }
    console.log('resultJson: ', resultJson);
    resultJsonArray.push(resultJson);
  }
  console.log('resultJsonArray: ', resultJsonArray);
  return resultJsonArray;
}

async function calculateValuesSum(jsonObj, isItrOption) {
  let totalSumOfJson = 0;
  if (!jsonObj) {
    return;
  }
  if (Array.isArray(jsonObj) && jsonObj.length > 0) {
    for (const item of jsonObj) {
      totalSumOfJson += parseFloat(item.value) || 0;
      console.log('totalSumOfJson: ', totalSumOfJson);
    }
  } else {
    for (var key in jsonObj) {
      if (jsonObj.hasOwnProperty(key)) {
        totalSumOfJson += parseFloat(jsonObj[key]);
      }
    }
  }
  if (isItrOption && totalSumOfJson > jsonObj.max) {
    totalSumOfJson = jsonObj.max;
  }
  return totalSumOfJson;
}

async function calculateTaxPaybleOldRegime(inputValues) {
  // const EXEMPTED_INCOME_LIMIT = 250000;
  const SLAB_1 = 250000;
  const SLAB_2 = 500000;
  const SLAB_1_TAX_IN_PERCENT = 0.05; // 5%
  const SLAB_2_TAX_IN_PERCENT = 0.2; // 20%
  const SLAB_3_TAX_IN_PERCENT = 0.3; // 30%
  const CESS_PERCENT = 0.04; // 4%
  // const SLAB_5PERCENT_TAX=SLAB_1*0.05;  //12500
  // const SLAB_20PERCENT_TAX=SLAB_2*0.2;  //100000 or 1 Lakh
  let proposedTax = 0;
  let totalAnnualIncome;
  let exemptAmount;
  if (
    inputValues &&
    inputValues[0] &&
    inputValues[0].code === INCOMES_EXEMPTIONS[0].code
  ) {
    totalAnnualIncome = inputValues[0].value;
  }
  if (
    inputValues &&
    inputValues[1] &&
    inputValues[1].code === INCOMES_EXEMPTIONS[1].code
  ) {
    exemptAmount = inputValues[1].value;
  }
  const netIncomeAfterExemption = totalAnnualIncome - exemptAmount;
  let taxableIncome = netIncomeAfterExemption - EXEMPTED_INCOME_LIMIT;
  if (taxableIncome < 0) {
    taxableIncome = 0;
  }
  if (taxableIncome <= SLAB_1) {
    proposedTax = taxableIncome * SLAB_1_TAX_IN_PERCENT;
  } else if (taxableIncome > SLAB_1 && taxableIncome <= SLAB_2) {
    proposedTax =
      SLAB_1 * SLAB_1_TAX_IN_PERCENT +
      (taxableIncome - SLAB_1) * SLAB_2_TAX_IN_PERCENT;
  } else if (taxableIncome > SLAB_2) {
    proposedTax =
      SLAB_1 * SLAB_1_TAX_IN_PERCENT +
      SLAB_2 * SLAB_2_TAX_IN_PERCENT +
      (taxableIncome - SLAB_1 - SLAB_2) * SLAB_3_TAX_IN_PERCENT;
  }
  proposedTax = await calculateAfterSurcharge(
    netIncomeAfterExemption,
    proposedTax
  );
  proposedTax = proposedTax + proposedTax * CESS_PERCENT;
  $('.cz-itr-old-regime-amount').html(proposedTax.toFixed(0));
  return proposedTax;
}
async function calculateTaxPaybleNewRegime(inputValues) {
  // const EXEMPTED_INCOME_LIMIT = 250000;

  const SLAB_1 = 250000;
  const SLAB_2 = 250000;
  const SLAB_3 = 250000;
  const SLAB_4 = 250000;
  const SLAB_5 = 250000;
  const SLAB_1_TAX_IN_PERCENT = 0.05; // 5%
  const SLAB_2_TAX_IN_PERCENT = 0.1; // 10%
  const SLAB_3_TAX_IN_PERCENT = 0.15; // 15%
  const SLAB_4_TAX_IN_PERCENT = 0.2; // 20%
  const SLAB_5_TAX_IN_PERCENT = 0.25; // 25%
  const SLAB_6_TAX_IN_PERCENT = 0.3; // 30%
  const CESS_PERCENT = 0.04; // 4%
  let proposedTax = 0;
  let totalAnnualIncome;
  let exemptAmount;
  if (
    inputValues &&
    inputValues[0] &&
    inputValues[0].code === INCOMES_EXEMPTIONS[0].code
  ) {
    totalAnnualIncome = inputValues[0].value;
  }
  if (
    inputValues &&
    inputValues[1] &&
    inputValues[1].code === INCOMES_EXEMPTIONS[1].code
  ) {
    exemptAmount = inputValues[1].value;
  }
  const netIncomeAfterExemption = totalAnnualIncome - exemptAmount;
  let taxableIncome = netIncomeAfterExemption - EXEMPTED_INCOME_LIMIT;
  if (taxableIncome < 0) {
    taxableIncome = 0;
  }
  if (taxableIncome <= SLAB_1) {
    proposedTax = taxableIncome * SLAB_1_TAX_IN_PERCENT;
  } else if (taxableIncome > SLAB_1 && taxableIncome <= SLAB_1 + SLAB_2) {
    proposedTax =
      SLAB_1 * SLAB_1_TAX_IN_PERCENT +
      (taxableIncome - SLAB_1) * SLAB_2_TAX_IN_PERCENT;
  } else if (
    taxableIncome > SLAB_1 + SLAB_2 &&
    taxableIncome <= SLAB_1 + SLAB_2 + SLAB_3
  ) {
    proposedTax =
      SLAB_1 * SLAB_1_TAX_IN_PERCENT +
      SLAB_2 * SLAB_2_TAX_IN_PERCENT +
      (taxableIncome - (SLAB_1 + SLAB_2)) * SLAB_3_TAX_IN_PERCENT;
  } else if (
    taxableIncome > SLAB_1 + SLAB_2 + SLAB_3 &&
    taxableIncome <= SLAB_1 + SLAB_2 + SLAB_3 + SLAB_4
  ) {
    proposedTax =
      SLAB_1 * SLAB_1_TAX_IN_PERCENT +
      SLAB_2 * SLAB_2_TAX_IN_PERCENT +
      SLAB_3 * SLAB_3_TAX_IN_PERCENT +
      (taxableIncome - (SLAB_1 + SLAB_2 + SLAB_3)) * SLAB_4_TAX_IN_PERCENT;
  } else if (
    taxableIncome > SLAB_1 + SLAB_2 + SLAB_3 + SLAB_4 &&
    taxableIncome <= SLAB_1 + SLAB_2 + SLAB_3 + SLAB_4 + SLAB_5
  ) {
    proposedTax =
      SLAB_1 * SLAB_1_TAX_IN_PERCENT +
      SLAB_2 * SLAB_2_TAX_IN_PERCENT +
      SLAB_3 * SLAB_3_TAX_IN_PERCENT +
      SLAB_4 * SLAB_4_TAX_IN_PERCENT +
      (taxableIncome - (SLAB_1 + SLAB_2 + SLAB_3 + SLAB_4)) *
        SLAB_5_TAX_IN_PERCENT;
  } else if (taxableIncome > SLAB_1 + SLAB_2 + SLAB_3 + SLAB_4 + SLAB_5) {
    proposedTax =
      SLAB_1 * SLAB_1_TAX_IN_PERCENT +
      SLAB_2 * SLAB_2_TAX_IN_PERCENT +
      SLAB_3 * SLAB_3_TAX_IN_PERCENT +
      SLAB_4 * SLAB_4_TAX_IN_PERCENT +
      SLAB_5 * SLAB_5_TAX_IN_PERCENT +
      (taxableIncome - (SLAB_1 + SLAB_2 + SLAB_3 + SLAB_4 + SLAB_5)) *
        SLAB_6_TAX_IN_PERCENT;
  }
  proposedTax =  calculateAfterSurcharge(
    netIncomeAfterExemption,
    proposedTax
  );
  proposedTax = proposedTax + proposedTax * CESS_PERCENT;
  $('.cz-itr-new-regime-amount').html(proposedTax.toFixed(0));
  return proposedTax;
}
async function calculateAfterSurcharge(netIncome, proposedTax) {
  const SURCHARGE_SLAB_1_MIN = 5000000;
  const SURCHARGE_SLAB_1_MAX = 10000000;
  const SURCHARGE_SLAB_2_MIN = 10000000;
  const SURCHARGE_SLAB_2_MAX = 20000000;
  const SURCHARGE_SLAB_3_MIN = 20000000;
  const SURCHARGE_SLAB_3_MAX = 50000000;
  const SURCHARGE_SLAB_4_MIN = 50000000;

  const SURCHARGE_SLAB_1_PERCENT = 0.1;
  const SURCHARGE_SLAB_2_PERCENT = 0.15;
  const SURCHARGE_SLAB_3_PERCENT = 0.25;
  const SURCHARGE_SLAB_4_PERCENT = 0.37;
  if (netIncome > SURCHARGE_SLAB_1_MIN && netIncome <= SURCHARGE_SLAB_1_MAX) {
    proposedTax = proposedTax + proposedTax * SURCHARGE_SLAB_1_PERCENT;
  } else if (
    netIncome > SURCHARGE_SLAB_2_MIN &&
    netIncome <= SURCHARGE_SLAB_2_MAX
  ) {
    proposedTax = proposedTax + proposedTax * SURCHARGE_SLAB_2_PERCENT;
  } else if (
    netIncome > SURCHARGE_SLAB_3_MIN &&
    netIncome <= SURCHARGE_SLAB_3_MAX
  ) {
    proposedTax = proposedTax + proposedTax * SURCHARGE_SLAB_3_PERCENT;
  } else if (netIncome > SURCHARGE_SLAB_4_MIN) {
    proposedTax = proposedTax + proposedTax * SURCHARGE_SLAB_4_PERCENT;
  }
  return proposedTax;
}
