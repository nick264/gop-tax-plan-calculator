function calc_tax(amount, brackets) {
  var tax = 0
    var last_bracket = 0
    for (var j = 0; j < brackets.length; j+=1) { 
    if (brackets[j][0] < amount ) {
          tax += (brackets[j][0] - last_bracket) * brackets[j][1] * .01;
            last_bracket= brackets[j][0];
        }
        else {
          tax += (amount - last_bracket) * brackets[j][1] * .01;
            break
        }
  }

  return tax;
  
    

}

var current_single = [
  [9325, 10],
  [37950, 15],
  [91900, 25],
  [191650, 28],
  [416700, 33],
  [418400, 35],
  [1e20, 39.6]
];

var current_married = [
  [18650, 10],
  [75900, 15],
  [153100, 25],
  [233350, 28],
  [416700, 33],
  [470700, 35],
  [1e20, 39.6]
];

var house_single = [
  [45000, 12],
  [200000, 25],
  [500000, 35],
  [1e20, 39.6]
];

var house_married = [
  [90000, 12],
  [260000, 25],
  [1000000, 35],
  [1e20, 39.6]
];

var senate_single = [
  [9525, 10],
  [38700, 12],
  [70000, 22],
  [160000, 24],
  [200000, 32],
  [500000, 35],
  [1e20, 38.5]
];

var senate_married = [
  [19050, 10],
  [77400, 12],
  [140000, 22],
  [320000, 24],
  [400000, 32],
  [1000000, 35],
  [1e20, 38.5]
];

var rules = {
 "Current": {
  "Single":{
  "Brackets":current_single,
  "StandardDeduction":6350,
  "PersonalExemption":4050,
  "PersonalExemptionPhaseOut":266700,
  "ChildTaxCredit":1000,
  "ChildTaxCreditPhaseOut":75000,
  "AMTExemption":54300,
  "AMTPhaseOut":120700,
  "AMTHighThreshold":187800,
  "AMTRelevant":true,
  "MedicalExpenseThreshold":10,
  "AMTMedicalExpenseThreshold":7.5,
  
  },
  "Married":{
  "Brackets":current_married,
  "StandardDeduction":12700,
  "PersonalExemption":4050,
  "PersonalExemptionPhaseOut":320000,
  "ChildTaxCredit":1000,
  "ChildTaxCreditPhaseOut":115000,
  "AMTExemption":84500,
  "AMTPhaseOut":160900,
  "AMTHighThreshold":187800,
  "AMTRelevant":true,
  "MedicalExpenseThreshold":10,
  "AMTMedicalExpenseThreshold":7.5,

  }},
 "House": {
  "Single":{
  "Brackets":house_single,
  "StandardDeduction":12000,//NPR
  "PersonalExemption":0,
  "PersonalExemptionPhaseOut":320000,
  "ChildTaxCredit":1600,
  "ChildTaxCreditPhaseOut":115000, //https://www.cbpp.org/research/federal-tax/house-tax-bills-child-tax-credit-increase-excludes-thousands-of-children-in-low
  "AMTRelevant":false,
  "MedicalExpenseThreshold":1e7,
  "AMTMedicalExpenseThreshold":1e6,
 },
  "Married":{
  "Brackets":house_married,
  "StandardDeduction":24000, //NPR
  "PersonalExemption":0,
  "PersonalExemptionPhaseOut":320000,
  "ChildTaxCredit":1600,
  "ChildTaxCreditPhaseOut":230000,
  "AMTRelevant":false,
  "MedicalExpenseThreshold":1e6,
  "AMTMedicalExpenseThreshold":1e6,
  }},
 "Senate": {
  "Single":{
  "Brackets":senate_single,
  "StandardDeduction":12000,
  "PersonalExemption":0, //https://www.npr.org/2017/11/02/561639579/chart-how-the-tax-overhaul-would-affect-you
  "PersonalExemptionPhaseOut":320000, //unused
  "ChildTaxCredit":2000,
  "ChildTaxCreditPhaseOut":500000, //https://www.cbpp.org/research/federal-tax/senate-tax-bills-child-tax-credit-increase-provides-only-token-help-to-millions
  "AMTExemption":70300,
  "AMTPhaseOut":156300,
//  "AMTExemption":54300/50600 * 70300,
//  "AMTPhaseOut":120700/112500 * 156300,  "AMTHighThreshold":187800,
  "AMTRelevant":true,
  "MedicalExpenseThreshold":10,
  "AMTMedicalExpenseThreshold":7.5,
  },
  "Married":{
  "Brackets":senate_married,
  "StandardDeduction":24000,
  "PersonalExemption":0,
  "PersonalExemptionPhaseOut":320000,
  "ChildTaxCredit":2000,
  "ChildTaxCreditPhaseOut":500000,
  "AMTExemption":109400,
  "AMTPhaseOut":208400,
//  "AMTExemption":84500/78750*109400,
//  "AMTPhaseOut":160900/150000 * 208400,
  "AMTHighThreshold":187800,
  "AMTRelevant":true,
  "MedicalExpenseThreshold":10,
  "AMTMedicalExpenseThreshold":7.5,
  }},
  
}

function calc_amt(amt_notional, exemption, phaseout, threshold){
  var adjusted_exemption = reduce(exemption, amt_notional, phaseout, 1, .25, true)
  var taxable_amt_income = amt_notional - adjusted_exemption
  return {"Income": taxable_amt_income, "Tax":calc_tax(taxable_amt_income, [[threshold,26],[1e20,28]])}
}

function reduce(total_amount, income, threshold, derate_step, derate, dollars_not_percent) {
  var diff =income-threshold
  if (diff <= 0)
    return total_amount
  var steps = Math.floor(diff / derate_step)
  if (dollars_not_percent)
    return Math.max(0, total_amount - derate * steps)
  else
    return Math.max(0, total_amount * (1 - derate/100 * steps))

}

function calc_taxes(inputs) {
  var amount = inputs.Amount;
  var outputs={};
  var sum_deductions=0
  var relevant_rules = rules[inputs.Plan][inputs.FilingStatus]
  if (inputs.Itemize){
    outputs.MortgageInterest = inputs.MortgageInterest
    outputs.Charity = inputs.Charity
    outputs.Medical = Math.max(0, inputs.Medical - inputs.GrossIncome * relevant_rules.MedicalExpenseThreshold / 100 )
    if (inputs.Plan == 'Senate') {
      outputs.SALTProperty = Math.min(inputs.SALTProperty, 10000) //NPR
      outputs.SALTIncome = 0
    } else if (inputs.Plan == 'House') {
      outputs.SALTProperty = Math.min(inputs.SALTProperty, 10000) //NPR
      outputs.SALTIncome = 0
    } else if (inputs.Plan == 'Current') {
      outputs.SALTProperty = inputs.SALTProperty
      outputs.SALTIncome = inputs.SALTIncome
    }
    outputs.TotalDeductions = outputs.SALTIncome+outputs.SALTProperty+outputs.Charity+outputs.MortgageInterest+outputs.Medical

  }
  else {
    outputs.TotalDeductions = relevant_rules.StandardDeduction 
  }
  outputs.StandardDeduction = relevant_rules.StandardDeduction 
  
  outputs.PersonalExemptions = inputs.PersonalExemptions
  var pe =  inputs.PersonalExemptions * relevant_rules.PersonalExemption
  outputs.PersonalExemptionAmount = reduce(pe, inputs.GrossIncome, relevant_rules.PersonalExemptionPhaseOut, 2500, 2, false)
  outputs.TotalDeductionsAndExemptions = outputs.TotalDeductions+outputs.PersonalExemptionAmount

  outputs['GrossIncome']=inputs.GrossIncome;
  outputs.TaxableIncome = Math.max(0, outputs.GrossIncome - outputs.TotalDeductionsAndExemptions);
  outputs.TotalTaxExAMT = calc_tax(outputs.TaxableIncome, relevant_rules.Brackets);
  if (outputs.TaxableIncome == 0){
    outputs.EffectiveTaxRate = 0  
  }
  else{
    outputs.EffectiveTaxRate = outputs.TotalTaxExAMT / outputs.TaxableIncome;
  }
  var ctc =  inputs.DependentChildren * relevant_rules.ChildTaxCredit
  outputs.ChildTaxCredit = reduce(ctc, inputs.GrossIncome, relevant_rules.ChildTaxCreditPhaseOut, 1000, 50 * inputs.DependentChildren, true)

  if (relevant_rules.AMTRelevant ) {
    outputs.AMTMedical = Math.max(0, inputs.Medical - inputs.GrossIncome * relevant_rules.AMTMedicalExpenseThreshold / 100 )
    var amt_notional = inputs.GrossIncome - inputs.MortgageInterest - inputs.Charity - outputs.AMTMedical
    var exemption = relevant_rules.AMTExemption
    var amt_returns = calc_amt(amt_notional, relevant_rules.AMTExemption, relevant_rules.AMTPhaseOut, relevant_rules.AMTHighThreshold)
    outputs.AMTIncome = amt_returns.Income
    outputs.AMT = amt_returns.Tax
  } 
  else  {
    outputs.AMTMedical = 0
    outputs.AMTIncome = 0
    outputs.AMT = 0
  }
  
  if ( outputs.AMT > outputs.TotalTaxExAMT ){
    outputs.AMTActive = true
    outputs.TotalTaxPreCredits = outputs.AMT
  }
  else {
    outputs.AMTActive = false
    outputs.TotalTaxPreCredits = outputs.TotalTaxExAMT  
  }
  outputs.TotalTax = outputs.TotalTaxPreCredits - outputs.ChildTaxCredit
  outputs.EffectiveTaxRateOnGross = outputs.TotalTax / outputs.GrossIncome;
  
  return outputs;
}

// //var res = calc_tax(4184000, fed_single);
// var inputs = {}
// inputs.GrossIncome = 200000
// inputs.FilingStatus = 'Single'
// inputs.Itemize = true
// inputs.DependentChildren = 2
// inputs.PersonalExemptions = 4
// inputs.MortgageInterest = 30000
// inputs.Charity = 5000
// inputs.SALTProperty = 25000
// inputs.SALTIncome = inputs.GrossIncome * .06
// inputs.Plan = 'Current'

function capitalizeFirstLetter(string) {
    if(string == null) {
      return null
    }
  
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function calculateFromInputs({grossIncome, filingStatus, itemize, dependentChildrenCount, mortgageInterest, charitableDonations, stateLocalPropertyTaxes, stateLocalIncomeTaxes, personalExemptions }, plan) {
  return calc_taxes({
    GrossIncome: parseInt(grossIncome),
    FilingStatus: capitalizeFirstLetter(filingStatus),
    Itemize: itemize,
    DependentChildren: parseInt(dependentChildrenCount),
    PersonalExemptions: parseInt(personalExemptions),
    MortgageInterest: parseInt(mortgageInterest),
    Charity: parseInt(charitableDonations),
    SALTProperty: parseInt(stateLocalPropertyTaxes),
    SALTIncome: parseInt(stateLocalIncomeTaxes),
    Plan: plan
  })
}