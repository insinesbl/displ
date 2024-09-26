import { createArticleQuote } from './create-article-quote.js'

export const updateArticleContent = () => {
  if (window.location.pathname.includes('/blog/')) {
    document.querySelectorAll('p').forEach(paragraph => {
      const text = paragraph.textContent

      if (text.includes('{{Quote') || text.includes('<<Quote')) {
        createArticleQuote(paragraph)
      }
    })
  }
}
