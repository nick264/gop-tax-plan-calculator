export const UI_REVEAL_RESULTS = 'UI_REVEAL_RESULTS'
export const UI_SHOW_DETAILS = 'UI_SHOW_DETAILS'

export function revealResults() {
  return({
    type: UI_REVEAL_RESULTS
  })
}

export function showDetails() {
  return({
    type: UI_SHOW_DETAILS
  })  
}