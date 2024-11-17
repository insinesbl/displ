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

$(() => {
  updateBlogGrid()
  updateArticleContent()
  updateCasesContent()

  checkCookie()
  setRefUrl()
  setUTMCookies()
  sendParamsToPlatform()
  addFormInputs() // add hide inputs in form
  addAllListiners() // add all listiners
  fixAnchorLinks() // fix anchor links
  moveLastItemCase() // Last item in cases move to grid cases

  if (document.querySelectorAll('[data-dropdown]').length > 0) {
    addDropDownListeners()
  }

  if (window.location.pathname === '/resources/data-room') {
    addActiveFromScrollDataRoom()
  }
})
