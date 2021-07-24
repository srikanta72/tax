const ITR_SECTION = [
  {
    code: "80C",
    title: "80C - Investments",
    max: 150000,
    includes: [
      {
        code: "80C_EPF",
        title: "80C EPF - Employee's Provident Fund",
        max: 150000,
      },
      { code: "80CCC", title: "80CCC - Insurance Premium", max: 150000 },
      { code: "80CCD", title: "80CCD - Pension Contribution", max: 150000 },
      {
        code: "80CCD_1_",
        title: "80CCD(1) - NPS | Employee’s contribution",
        max: 150000,
      },
      {
        code: "80C_OTHER",
        title: "80C - Other Investments | ELSS, 5YR FD, etc.",
        max: 150000,
        comesUnder: "80C",
      },
    ],
    comesUnder: "EXEMPTS",
  },
  {
    code: "80CCD_1b_",
    title: "80CCD(1b) - NPS | Additional deduction",
    max: 50000,
  },
  {
    code: "80CCD_2_",
    title: "80CCD(2) - NPS | Employers contribution",
    max: 128129,
  },

  { code: "80D", title: "80D - Health Insurance", max: 100000 },
  { code: "PTSG", title: "Professional Tax for State Govt", max: 2500 },
  {
    code: "SD",
    title: "Standard Deduction",
    max: 50000,
    value: 50000,
    disabled: true,
  },
  { code: "LTA", title: "Leave travel Allowence" },
  { code: "FC", title: "Food Coupons", max: 26400 },
  {
    code: "OE",
    title: "Other Exempation",
    incldes: [
      "Leave Travel Allowance",
      "Car maintanance Allowance",
      "Uniform Allowance",
    ],
  },
  { code: "80TTA", title: "80TTA - Interest on Savings Account", max: 10000 },
  {
    code: "80GG",
    title: "80GG - House Rent Paid",
    placeholder: "PAN required if more than 1 Lakh",
    applicable: [
      "NO_HRA",
      "40%_OF_BASIC+DA_NON_METRO",
      "RENT_PAID_MINUS_10%_OF_BASIC+_DA",
    ],
  },
  { code: "80E", title: "80E - Interest on Education Loan" },
  { code: "80EE", title: "80EE - Interest on Home Loan", max: 50000 },
  { code: "24_b_", title: "24(b) - Interest on Home Loan", max: 200000 },
  {
    code: "80EEA",
    title: "80EE - Interest on Home Loan of affordable house",
    max: 150000,
  },
  {
    code: "80EEB",
    title: "80EEB - Interest on Loan of Electric Vehicle purchase",
    max: 150000,
  },
  { code: "80DD", title: "80DD - Disabled Dependent", max: 50000 },
  {
    code: "80DD_40P",
    title: "80DD - Disabled Dependent (40% and over disability)",
    max: 75000,
  },
  { code: "80DDB", title: "80DDB – Medical Expenditure", max: 125000 },
  { code: "80U", title: "80U – Physical Disability", max: 125000 },
  { code: "80G_50P", title: "80G – Donations 50%" },
  { code: "80G_100P", title: "80G – Donations 100%" },
  {
    code: "80GGA",
    title: "80GGA – Donations for scientific research and Rural developement",
  },
  { code: "80GGB", title: "80GGB – Company Contribution" },
  { code: "80GGC", title: "80GGC – Contribution to Political Parties" },
  { code: "80RRB", title: "80RRB – Royalty of a Patent" },
  {
    code: "80TTB",
    title: "80TTB – Interest Income | for Senior Citizens",
    max: 50000,
    comesUnder: "EXEMPTS",
  },
];
const SALARY_BREAKUP = [
  {
    code: "BASIC_PLUS_DA",
    title: "Basic + DA",
  },
  {
    code: "HRA",
    title: "HRA",
  },
  {
    code: "OTHER_ALLOWANCE",
    title: "Other allowances",
    comesUnder: "SALARY",
  },
];
const BUSINESS_AND_PROFESSION = [
  {
    code: "BUSINESS",
    title: "Income from Business",
  },
  {
    code: "PROFESSION",
    title: "Income from Profession",
    comesUnder: "BAP",
  },
];
const CAPITAL_GAINS = [
  {
    code: "STCG",
    title: "Short Term Capital Gain - Taxable at Normal rate",
  },
  {
    code: "STCG_10PERCENT",
    title: "Short Term Capital Gain - Taxable at 10%",
  },
  {
    code: "STCG_15PERCENT",
    title: "Short Term Capital Gain - Taxable at 15%",
  },
  {
    code: "STCG_20PERCENT",
    title: "Short Term Capital Gain - Taxable at 20%",
    comesUnder: "CAPITAL_GAIN",
  },
];
const OTHER_SOURCES = [
  {
    code: "SB_INTEREST",
    title: "Interest on Saving Account",
  },
  {
    code: "FD_INTEREST",
    title: "Interest on Fixed Deposits",
  },
  {
    code: "OTHER",
    title: "Other Sources",
    comesUnder: "OTHER_SOURCES",
  },
];
const INCOMES = [
  {
    code: "SALARY",
    title: "Salary",
    includes: SALARY_BREAKUP,
    comesUnder: "INCOMES",
  },
  {
    code: "OTHER_SOURCES",
    title: "Other Sources",
    includes: OTHER_SOURCES,
    comesUnder: "INCOMES",
  },
  {
    code: "BAP",
    title: "Business and Profession",
    includes: BUSINESS_AND_PROFESSION,
    comesUnder: "INCOMES",
  },
  {
    code: "CAPITAL_GAIN",
    title: "Capital Gain",
    includes: CAPITAL_GAINS,
    comesUnder: "INCOMES",
  },
];
const INCOMES_EXEMPTIONS = [
  {
    code: "INCOMES",
    title: "Income in total",
    includes: INCOMES,
    comesUnder: "ITRCALC",
  },
  {
    code: "EXEMPTS",
    title: "Exemptions in total",
    includes: ITR_SECTION,
    comesUnder: "ITRCALC",
  },
];

export { INCOMES_EXEMPTIONS as IncomeExmptionConstant };
