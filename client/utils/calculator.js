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
  [77400, 15],
  [140000, 25],
  [320000, 28],
  [400000, 33],
  [1000000, 35],
  [1e20, 39.6]
];

var rules = {
 "Current": {
  "Single":{
  "Brackets":current_single,
  "StandardDeduction":6350,
  "PersonalExemption":4050
  },
  "Married":{
  "Brackets":current_married,
  "StandardDeduction":12700,
  "PersonalExemption":8100
  }},
 "House": {
  "Single":{
  "Brackets":house_single,
  "StandardDeduction":12200,
  "PersonalExemption":0
  },
  "Married":{
  "Brackets":house_married,
  "StandardDeduction":24400,
  "PersonalExemption":0
  }},
 "Senate": {
  "Single":{
  "Brackets":senate_single,
  "StandardDeduction":12000,
  "PersonalExemption":0
  },
  "Married":{
  "Brackets":senate_married,
  "StandardDeduction":24000,
  "PersonalExemption":0
  }},
  
}


function calc_taxes(inputs) {
  var amount = inputs.Amount;
  var outputs={};
  var sum_deductions=0
  var relevant_rules = rules[inputs.Plan][inputs.FilingStatus]
  if (inputs.Itemize){
    outputs.MortgageInterest = inputs.MortgageInterest
    outputs.Charity = inputs.Charity
    if (inputs.Plan == 'Senate') {
      outputs.SALT = 0
    } else if (inputs.Plan == 'House') {
      outputs.SALT = Math.min(inputs.SALT, 10000)
    } else if (inputs.Plan == 'Current') {
      outputs.SALT = inputs.SALT
    }
    outputs.TotalDeductions = outputs.SALT+outputs.Charity+outputs.MortgageInterest

  }
  else {
    outputs.TotalDeductions = 12000 
  
  }
  outputs['GrossIncome']=inputs.GrossIncome;
  outputs.TaxableIncome = outputs.GrossIncome - outputs.TotalDeductions;
  outputs.TotalTax = calc_tax(outputs.TaxableIncome, relevant_rules.Brackets);
  outputs.EffectiveTaxRate = outputs.TotalTax / outputs.TaxableIncome;
  
  return outputs;
}

// //var res = calc_tax(4184000, fed_single);
// var inputs = {}
// inputs.GrossIncome = 551000
// inputs.FilingStatus = 'Single'
// inputs.Itemize = true
// inputs.DependentChildren = 2
// inputs.MortgageInterest = 30000
// inputs.Charity = 5000
// inputs.SALT = 50000
// inputs.Plan = 'Senate'


// var res = calc_taxes(inputs);

// console.log(res)

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function calculateFromInputs({grossIncome, filingStatus, itemized, dependentChildrenCount, mortgageInterest, charitableDonations, stateLocalPropertyTaxes }) {
  return calc_taxes({
    GrossIncome: parseInt(grossIncome),
    FilingStatus: capitalizeFirstLetter(filingStatus),
    Itemize: itemized,
    DependentChildren: parseInt(dependentChildrenCount),
    MortgageInterest: parseInt(mortgageInterest),
    Charity: parseInt(charitableDonations),
    SALT: parseInt(stateLocalPropertyTaxes),
    Plan: 'Senate'
  })
}