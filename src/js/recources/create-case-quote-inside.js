export const createCaseQuoteInside = paragraph => {
  const _temp = paragraph.textContent
  const parts = _temp.split('|')

  if (parts.length >= 3) {
    const srcPhoto = parts[1].trim().replace('}}', '')
    const text = parts[2].trim().replace('}}', '')

    const contentDiv = document.createElement('div')

    const quoteInsideElement = document.querySelector(
      '[data-case="quote-inside-wrap"]'
    )
    const copiedElement = quoteInsideElement?.cloneNode(true)

    const quotePhotoElement = copiedElement?.querySelector(
      '[data-case="quote-inside-photo"]'
    )
    const quoteTextElement = copiedElement?.querySelector(
      '[data-case="quote-inside-text"]'
    )

    if (copiedElement && quoteTextElement && quotePhotoElement) {
      quoteTextElement.textContent = text
      quotePhotoElement.src = srcPhoto

      paragraph.parentNode?.insertBefore(contentDiv, paragraph)
      contentDiv.appendChild(copiedElement)
    }
  }

  paragraph.remove()
}
