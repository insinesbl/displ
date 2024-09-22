import { createArticleQuote } from './create-article-quote.js'

export const updateArticleContent = () => {
  document.querySelectorAll('[data-article="content"] p').forEach(paragraph => {
    const text = paragraph.textContent

    if (text.includes('<<Quote')) {
      createArticleQuote(paragraph)
    }
  })
}
