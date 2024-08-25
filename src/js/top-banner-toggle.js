export const topBannerToggle = state => {
  const topBanner = document.querySelector('[data-top-banner="wrap"]')

  if (topBanner) {
    if (state === 'hide') {
      topBanner.style.display = 'none'
    } else {
      topBanner.style.display = 'flex'
    }
  }
}
