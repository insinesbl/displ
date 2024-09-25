import { createArticleQuote } from './create-article-quote.js'

export const updateArticleContent = () => {
  const pathname = window.location.pathname

  if (pathname.includes('/blog/') || pathname.includes('/customer-projects/')) {
    document
      .querySelectorAll('[data-article="content"] p')
      .forEach(paragraph => {
        const text = paragraph.textContent

        if (text.includes('<<Quote')) {
          createArticleQuote(paragraph)
        }
      })
  }
}
