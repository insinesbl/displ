export const createArticleQuote = paragraph => {
  const textContent = paragraph.textContent || ''
  const parts = textContent.split('|')

  if (parts.length === 4) {
    const quoteText = parts[1].trim().replace(/}}$/, '')
    const author = parts[2] ? parts[2].trim().replace(/}}$/, '') : ''
    const position = parts[3] ? parts[3].trim().replace(/}}$/, '') : ''

    const quoteTemplate = document.querySelector('[data-article="quote"]')

    if (quoteTemplate && quoteText) {
      const quoteElement = quoteTemplate.cloneNode(true)

      quoteElement.querySelector('[data-article="quote-text"]').textContent =
        quoteText
      quoteElement.querySelector('[data-article="quote-author"]').textContent =
        author
      quoteElement.querySelector(
        '[data-article="quote-position"]'
      ).textContent = position

      paragraph.parentNode?.insertBefore(quoteElement, paragraph)
    }
  }

  paragraph.remove()
}
