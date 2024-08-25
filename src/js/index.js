import { phoneMask } from './phone-mask.js'
import { addAllListiners } from './listiners.js'
import { moveLastItemCase } from './move-last-case.js'
import {
  checkCookie,
  setRefUrl,
  setUTMCookies,
  sendParamsToPlatform,
  addFormInputs,
} from './cookies-manager.js'
import { fixAnchorLinks } from './fix-anchor-links.js'

$(() => {
  phoneMask()
  checkCookie()
  setRefUrl()
  setUTMCookies()
  sendParamsToPlatform()
  addFormInputs() // add hide inputs in form
  addAllListiners() // add all listiners
  fixAnchorLinks() // fix anchor links
  moveLastItemCase() // Last item in cases move to grid cases
})
