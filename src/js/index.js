import { addAllListiners } from './listiners.js'
import { moveLastItemCase } from './move-last-case.js'

import { fixAnchorLinks } from './fix-anchor-links.js'

import {
  checkCookie,
  setRefUrl,
  setUTMCookies,
  sendParamsToPlatform,
  addFormInputs,
} from './cookies-manager.js'

import { updateBlogGrid } from './recources/update-blog-grid.js'
import { updateArticleContent } from './recources/update-article-content.js'
import { updateCasesContent } from './recources/update-cases-content.js'
import { addDropDownListeners } from './add-dropdown-listeners.js'
import { addActiveFromScrollDataRoom } from './add-class-from-scroll.js'
import { updateLocalDropdown } from './update-local-dropdown.js'
// import { initYoutube } from './youtube-player.js'

$(() => {
  updateBlogGrid()
  updateArticleContent()
  updateCasesContent()

  updateLocalDropdown()
  checkCookie()
  setRefUrl()
  setUTMCookies()
  sendParamsToPlatform()
  addFormInputs() // add hide inputs in form
  addAllListiners() // add all listiners
  fixAnchorLinks() // fix anchor links
  moveLastItemCase() // Last item in cases move to grid cases

  // initYoutube()

  if (document.querySelectorAll('[data-dropdown]').length > 0) {
    addDropDownListeners()
  }

  if (window.location.pathname === '/resources/data-room') {
    addActiveFromScrollDataRoom()
  }

  // "Say about us" slider
  const sliderAboutUs = document.querySelector('[data-slider="about-us"]')
  if (sliderAboutUs) {
    new Swiper(sliderAboutUs, {
      spaceBetween: 10,
      slidesPerView: 'auto',
      grabCursor: true,
      navigation: {
        disabledClass: 'disabled',
        nextEl: '[data-slider-arrow="next"]',
        prevEl: '[data-slider-arrow="prev"]',
      },
    })
  } else {
    console.warn('Swiper slider [data-slider="about-us"] not found.')
  }

  // "Say about us" slider
  const sliderUseCases = document.querySelector('[data-slider="use-cases"]')
  if (sliderUseCases) {
    new Swiper(sliderUseCases, {
      spaceBetween: 20,
      slidesPerView: 'auto',
      navigation: {
        disabledClass: 'disabled',
        nextEl: '[data-slider-arrow="next"]',
        prevEl: '[data-slider-arrow="prev"]',
      },
      breakpoints: {
        767: {
          spaceBetween: 30,
        },
      },
    })
  } else {
    console.warn('Swiper slider [data-slider="use-cases"] not found.')
  }
})
