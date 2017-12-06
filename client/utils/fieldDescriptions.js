const DESCRIPTIONS = {
  "input": {
    "GrossIncome": "This is your total income less IRA and 401k contributions. 529 contributions are not deductible from federal taxes.",
    "FilingStatus": "Whether you file as 'single' or 'married filing jointly'. We do not currently support other filing statuses such as 'married filing seperately' or 'head of household'.",
    "Itemize": "Whether you want to itemize your deductions or claim the standard deduction. Generally you will want to itemize your deductions if their combined amount exceeds the standard deduction. To see standard deduction amounts, look at expanded results.",
    "DependentChildren": "The number of chidren you claim as dependents (ages 0-16).",
    "PersonalExemptions": "All dependents inlcuding YOURSELF, spouse, seniors and dependent children of all ages. INCLUDE dependent children that were counted above.",
    "MortgageInterest": "The amount of interest you pay on your mortgage.",
    "Charity": "The amount of tax-deductible donations to charity.",
    "SALTProperty": "State and local property taxes.",
    "Medical": "Total out-of-pocket medical expenses. We'll work out whether they are deductible. These are only deductible if they exceed 10% of your gross income, and are never deductible under the House plan.",
    "SALTIncome": "State and local income taxes paid. For now enter this number manually. We are looking at calculating state tax automatically.",
  },
  "output": {
    "StandardDeduction": "The amount everyone is allowed to deduct. If you selected itemized deductions, those will be used instead of the standard deduction.",
    "MortgageInterest": "The amount of mortgage interest that can be deducted under a given tax plan.",
    "SALTProperty": "The amount of state and local property taxes that are allowable deductions for a given tax plan.",
    "SALTIncome": "The amount of state and local income taxes that are allowable deductions for a given tax plan.",
    "TotalDeductions": "The sum of all applicable deductions (SALT Property, SALT Income, Mortage Interest and Donations).",
    "PersonalExemptionAmount": "The total value of personal exemptions that you can claim under a given tax plan. Higher-income filers qualify for less of an exemption.",
    "TotalDeductionsAndExemptions": "The sum of total deductions and applicable exemptions.",
    "TaxableIncome": "The income on which you will be taxed, i.e. gross income less all deductions and exemptions.",
    "TotalTaxExAMT": "The amount of tax you will pay under a given plan, ignoring AMT rules.",
    "EffectiveTaxRate": "Your average tax bracket. This is your tax divided by your taxable income.",
    "ChildTaxCredit": "The amount of Child Tax Credits which are applicable to you. Higher income filers qualify for less of a credit.",
    "AMTIncome": "The income on which your AMT will be assessed, i.e. gross income less AMT exemption.",
    "AMT": "The minimum amount of tax you will pay based on AMT rules.",
    "AMTActive": "Whether or not your final tax payment is governed by AMT rather than regular tax rules.",
    "TotalTaxPreCredits": "The amount of tax you will pay under a given plan before tax credits are factored in.",
    "TotalTax": "The amount of tax you will pay under a given plan.",
    "EffectiveTaxRateOnGross": "Your effective tax rate based on your gross income."
  }
}

export function descriptionForField(type,field) {
  return DESCRIPTIONS[type][field]
}