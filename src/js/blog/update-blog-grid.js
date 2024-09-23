export const updateBlogGrid = () => {
  if (!window.location.pathname.includes('blog')) return
  if (window.location.pathname.split('/')[2]) return

  setTimeout(() => {
    const mainArticlesList = document.querySelector(
      '[data-resources="main-list"]'
    )
    const firstItem = mainArticlesList.querySelector(
      '[data-resources="item"]:nth-child(1)'
    )
    const secondItem = mainArticlesList.querySelector(
      '[data-resources="item"]:nth-child(2)'
    )
    const thirdItem = mainArticlesList.querySelector(
      '[data-resources="item"]:nth-child(3)'
    )
    const fourthItem = mainArticlesList.querySelector(
      '[data-resources="item"]:nth-child(4)'
    )
    const subscribeTop = document.querySelector('[data-subscribe-first]')
    const cta = document.querySelector('[data-resources="cta"]')
    const windowWidth = window.innerWidth

    if (windowWidth > 992) {
      thirdItem.insertAdjacentElement('afterend', cta)
    }
    if (windowWidth > 480 && windowWidth < 992) {
      fourthItem.insertAdjacentElement('afterend', cta)
      secondItem.insertAdjacentElement('afterend', subscribeTop)
    }
    if (windowWidth < 480) {
      thirdItem.insertAdjacentElement('afterend', cta)
      firstItem.insertAdjacentElement('afterend', subscribeTop)
    }
  }, 500)
}
