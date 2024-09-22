export const createArticleQuote = paragraph => {
  const _temp = paragraph.textContent
  const parts = _temp.split('|')

  if ((parts.length = 4)) {
    const text = parts[1].trim().replace('>>', '')
    const author = parts[2] ? parts[2].trim() : ''
    const position = parts[3] ? parts[3].trim().replace('>>', '') : ''

    const quoteElement = document.querySelector('[data-article="quote"]')

    if (quoteElement && text) {
      if (quoteElement) {
        quoteElement.querySelector('[data-article="quote-text"]').textContent =
          text
        quoteElement.querySelector(
          '[data-article="quote-author"]'
        ).textContent = author
        quoteElement.querySelector(
          '[data-article="quote-position"]'
        ).textContent = position

        paragraph.parentNode?.insertBefore(quoteElement, paragraph)
      }
    }
  }

  paragraph.remove()
}
