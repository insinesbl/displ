/**
 * Last item in cases move to grid cases
 */
export const moveLastItemCase = () => {
  const casesList = document.querySelector('[data-cases="list"]')
  const lastItem = document.querySelector('[data-cases="last-item"]')
  if (casesList) {
    lastItem.classList.remove('hide')
    casesList.appendChild(lastItem)
  }
}
