function calc_tax_old(amount, brackets) {
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

function calc_tax(amount, brackets) {
  var tax = 0
  for (var j = 0; brackets[j][0] < amount; j+=1)
    tax += ( brackets[j][0] - ((j == 0 ) ? 0 : brackets[j-1][0])) * brackets[j][1] * .01;
  tax += ( amount - ((j == 0 ) ? 0 : brackets[j-1][0])) * brackets[j][1] * .01;
  return tax;
}


var current_single = [
  [9525, 10],
  [38700, 15], //Forbes latest 2018 I think
  [93700, 25],
  [195450, 28],
  [424950, 33],
  [426700, 35],
  [1e20, 39.6]
];

var current_married = [
  [19050, 10],
  [77400, 15],
  [156150, 25],
  [237950, 28], //Forbes latest 2018 I think
  [424950, 33],
  [480050, 35],
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

var eitc_single ={
'IncomeAtMaxCredit':[6800,10200,14320,14320], //https://taxfoundation.org/2018-tax-brackets
'MaxCredit':[520,3468,5728,6444],//https://taxfoundation.org/2018-tax-brackets
'PhaseoutBegins':[8510,18700,18700,18700],//https://taxfoundation.org/2018-tax-brackets
'PhaseoutEnds':[15310,40402,45898,49298],//https://taxfoundation.org/2018-tax-brackets
}
var eitc_married ={
'IncomeAtMaxCredit':[6800,10200,14320,14320],//https://taxfoundation.org/2018-tax-brackets
'MaxCredit':[520,3468,5728,6444],//https://taxfoundation.org/2018-tax-brackets
'PhaseoutBegins':[14200,24400,24400,24400],//https://taxfoundation.org/2018-tax-brackets
'PhaseoutEnds':[21000,46102,51598,54998],//https://taxfoundation.org/2018-tax-brackets
}

var rules = {
 "Current": {
  "Single":{
  "Brackets":current_single,
  "StandardDeduction":6350,
  "PersonalExemption":4150,
  "PersonalExemptionPhaseOut":266700,
  "ChildTaxCredit":1000,
  "ChildTaxCreditPhaseOut":75000,
  "FamilyTaxCredit":0,
  "AMTRelevant":true,
  "AMTExemption":55400, //https://taxfoundation.org/2018-tax-brackets
  "AMTPhaseOut":123100,//https://taxfoundation.org/2018-tax-brackets
  "AMTHighThreshold":191500,//https://taxfoundation.org/2018-tax-brackets
  "MedicalExpenseThreshold":10,
  "AMTMedicalExpenseThreshold":7.5,
  "StudentLoanDeductible":true,
  "StudentLoanPhaseOutStart":65000, //https://www.huffingtonpost.com/aryea-aranoff/student-loan-interest-ded_b_7486888.html
  "StudentLoanPhaseOutEnd":80000, //https://www.irs.gov/publications/p970#en_US_2016_publink1000178230
  "PeaseLimitation":true,
  "PeaseThreshold":258250, //https://www.scottkays.com/article/2015/04/09/pease-limitation-explained
  "EITCData":eitc_single,
  },
  "Married":{
  "Brackets":current_married,
  "StandardDeduction":12700,
  "PersonalExemption":4150,
  "PersonalExemptionPhaseOut":320000,
  "ChildTaxCredit":1000,
  "ChildTaxCreditPhaseOut":115000,
  "FamilyTaxCredit":0,
  "AMTRelevant":true,
  "AMTExemption":86200,//https://taxfoundation.org/2018-tax-brackets
  "AMTPhaseOut":164100,//https://taxfoundation.org/2018-tax-brackets
  "AMTHighThreshold":191500,//https://taxfoundation.org/2018-tax-brackets
  "MedicalExpenseThreshold":10,
  "AMTMedicalExpenseThreshold":7.5,
  "StudentLoanDeductible":true,
  "StudentLoanPhaseOutStart":130000,
  "StudentLoanPhaseOutEnd":160000,
  "PeaseLimitation":true,
  "PeaseThreshold":309000, //https://www.scottkays.com/article/2015/04/09/pease-limitation-explained
  "EITCData":eitc_married,
  
  }},
 "House": {
  "Single":{
  "Brackets":house_single,
  "StandardDeduction":12000,//NPR
  "PersonalExemption":0,
  "PersonalExemptionPhaseOut":320000,
  "ChildTaxCredit":1600,
  "ChildTaxCreditPhaseOut":115000, //https://www.cbpp.org/research/federal-tax/house-tax-bills-child-tax-credit-increase-excludes-thousands-of-children-in-low
  "FamilyTaxCredit":300,
  "AMTRelevant":false,
  "MedicalExpenseThreshold":1e7,
  "AMTMedicalExpenseThreshold":1e6,
  "PeaseLimitation":false,
  "EITCData":eitc_single,
 },
  "Married":{
  "Brackets":house_married,
  "StandardDeduction":24000, //NPR
  "PersonalExemption":0,
  "PersonalExemptionPhaseOut":320000,
  "ChildTaxCredit":1600,
  "ChildTaxCreditPhaseOut":230000,
  "FamilyTaxCredit":300,
  "AMTRelevant":false,
  "MedicalExpenseThreshold":1e6,
  "AMTMedicalExpenseThreshold":1e6,
  "StudentLoanDeductible":false,
  "PeaseLimitation":false,
  "EITCData":eitc_married,
  }},
 "Senate": {
  "Single":{
  "Brackets":senate_single,
  "StandardDeduction":12000,
  "PersonalExemption":0, //https://www.npr.org/2017/11/02/561639579/chart-how-the-tax-overhaul-would-affect-you
  "PersonalExemptionPhaseOut":320000, //unused
  "ChildTaxCredit":2000,
  "ChildTaxCreditPhaseOut":500000, //https://www.cbpp.org/research/federal-tax/senate-tax-bills-child-tax-credit-increase-provides-only-token-help-to-millions
  "FamilyTaxCredit":0,
  "AMTExemption":70300,
  "AMTPhaseOut":156300,
//  "AMTExemption":54300/50600 * 70300,
//  "AMTPhaseOut":120700/112500 * 156300,  "AMTHighThreshold":187800,
  "AMTRelevant":true,
  "MedicalExpenseThreshold":10,
  "AMTMedicalExpenseThreshold":7.5,
  "StudentLoanDeductible":false,
  "PeaseLimitation":false,
  "EITCData":eitc_single,
  },
  "Married":{
  "Brackets":senate_married,
  "StandardDeduction":24000,
  "PersonalExemption":0,
  "PersonalExemptionPhaseOut":320000,
  "ChildTaxCredit":2000,
  "ChildTaxCreditPhaseOut":500000,
  "FamilyTaxCredit":0,
  "AMTExemption":109400,
  "AMTPhaseOut":208400,
//  "AMTExemption":84500/78750*109400,
//  "AMTPhaseOut":160900/150000 * 208400,
  "AMTHighThreshold":187800,
  "AMTRelevant":true,
  "MedicalExpenseThreshold":10,
  "AMTMedicalExpenseThreshold":7.5,
  "StudentLoanDeductible":false,
  "PeaseLimitation":false,
  "EITCData":eitc_married,
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
  outputs.StandardDeduction = relevant_rules.StandardDeduction 
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

    if (relevant_rules.StudentLoanDeductible) {
      outputs.StudentLoanDeduction = Math.min(2000, inputs.StudentLoanInterest ) + Math.max(0, Math.min(500, (inputs.StudentLoanInterest - 2000)*.25 ) )   
      outputs.StudentLoanDeduction *= Math.max(0,Math.min(1, (relevant_rules.StudentLoanPhaseOutEnd - inputs.GrossIncome) / (relevant_rules.StudentLoanPhaseOutEnd - relevant_rules.StudentLoanPhaseOutStart)))
    }
    else
      outputs.StudentLoanDeduction = 0
    outputs.NonExemptDeductions = outputs.SALTIncome+outputs.SALTProperty+outputs.Charity+outputs.MortgageInterest+outputs.StudentLoanDeduction
    outputs.ItemizedDeductionsPrePease = outputs.NonExemptDeductions + outputs.Medical
    if (relevant_rules.PeaseLimitation) {
      outputs.PeaseAdjustment = Math.min(.03 * Math.max(0,inputs.GrossIncome - relevant_rules.PeaseThreshold ), .8 * outputs.NonExemptDeductions )
    }
    else{
      outputs.PeaseAdjustment = 0

    }    
    outputs.ItemizedDeductions = outputs.ItemizedDeductionsPrePease - outputs.PeaseAdjustment
  
    outputs.TotalDeductions = Math.max(relevant_rules.StandardDeduction, outputs.ItemizedDeductions )
  }
  else {
    outputs.TotalDeductions = relevant_rules.StandardDeduction;
  }

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
  
  // Tax credits
  var ctc =  inputs.DependentChildren * relevant_rules.ChildTaxCredit
  var ftc =  (inputs.PersonalExemptions - inputs.DependentChildren) * relevant_rules.FamilyTaxCredit
  var kids = Math.min(inputs.DependentChildren,3)
  var eitc_data = relevant_rules.EITCData
  outputs.ChildTaxCredit = reduce(ctc, inputs.GrossIncome, relevant_rules.ChildTaxCreditPhaseOut, 1000, 50, true)
  outputs.FamilyTaxCredit = reduce(ftc, inputs.GrossIncome, relevant_rules.ChildTaxCreditPhaseOut, 1000, 50, true)
  if (inputs.GrossIncome > eitc_data.PhaseoutBegins[kids]){
    outputs.EITC = eitc_data.IncomeAtMaxCredit[kids] * Math.max(0, eitc_data.PhaseoutEnds[kids] - inputs.GrossIncome ) / ( eitc_data.PhaseoutEnds[kids] - eitc_data.PhaseoutBegins[kids] )
  }
  else {
    outputs.EITC = eitc_data.IncomeAtMaxCredit[kids] * Math.min(1, inputs.GrossIncome / eitc_data.MaxCredit[kids] )
  }

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
  outputs.TotalTax = outputs.TotalTaxPreCredits - outputs.ChildTaxCredit - outputs.FamilyTaxCredit - outputs.EITC
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

export function calculateFromInputs({grossIncome, filingStatus, itemize, dependentChildrenCount, mortgageInterest, charitableDonations, stateLocalPropertyTaxes, stateLocalIncomeTaxes, personalExemptions, medical, studentLoanInterest }, plan) {
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
    Medical: parseInt(medical),
    Plan: plan,
    StudentLoanInterest: parseInt(studentLoanInterest)
  })
}