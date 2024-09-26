import { createArticleQuote } from './create-article-quote.js'

export const updateCasesContent = () => {
  if (window.location.pathname.includes('/customer-projects/')) {
    document.querySelectorAll('p').forEach(paragraph => {
      const text = paragraph.textContent

      if (text.includes('{{Quote') || text.includes('<<Quote')) {
        createArticleQuote(paragraph)
      }
    })

    // Add icons to titles
    const headerClasses = {
      Goals: 'goals',
      'Work process': 'work-process',
      Results: 'results',
    }

    // Находим все элементы h2
    document
      .querySelector('[data-article="content"]')
      .querySelectorAll('h2')
      .forEach(h2 => {
        const text = h2.textContent.trim()
        if (headerClasses[text]) {
          h2.classList.add(
            'resources-cases__title-and-icon',
            headerClasses[text]
          )
        }
      })
  }
}
