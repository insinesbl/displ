import { modalWindow } from './modal-window.js'
import { topBannerToggle } from './top-banner-toggle.js'

export const COOKIE_MARKETING = ['UserMatchHistory', 'webflowUTMs']
export const COOKIE_ANALYTICS = ['bcookie', 'bscookie', 'AnalyticsSyncHistory']

// Checks if the user has accepted cookies. If not, shows the cookie consent banner.
// Removes marketing or analytics cookies if user has denied consent.
export const checkCookie = () => {
  if (!Cookies.get('cookies_agreement')) {
    document.querySelector('[data-cookie="wrapper"]')?.style.display = 'block'
  }

  if (Cookies.get('cdispl_marketing') === 'deny') {
    COOKIE_MARKETING.forEach(cookie => Cookies.remove(cookie))
  }

  if (Cookies.get('cdispl_analytics') === 'deny') {
    COOKIE_ANALYTICS.forEach(cookie => Cookies.remove(cookie))
  }

  if (Cookies.get('top-banner') !== 'hide') {
    topBannerToggle('show')
  }
}
// Sets the referrer URL as a cookie if the referrer exists.
export const setRefUrl = () => {
  if (document.referrer.length > 0) {
    Cookies.set('refUrl', document.referrer, { expires: 31 })
  }
}

// Extracts UTM parameters from the URL and saves them as a cookie.
// If marketing cookies are denied, adds UTM parameters to links with a specific domain.
export const setUTMCookies = () => {
  const pageSearchParams = new URLSearchParams(window.location.search)
  let paramsStr = ''

  pageSearchParams.forEach((value, key) => {
    if (key.startsWith('utm_')) {
      paramsStr += `&${key}=${value}`
    }
  })

  const slicedParamsStr = paramsStr.slice(1)

  if (slicedParamsStr.length > 0) {
    if (Cookies.get('cdispl_marketing') === 'deny') {
      document.querySelectorAll('a').forEach(button => {
        if (button.href.includes('.displayforce.')) {
          button.href += `?${decodeURI(slicedParamsStr)}`
        }
      })
    } else {
      Cookies.set('webflowUTMs', slicedParamsStr, { expires: 31 })
    }
  }
}

// Appends UTM parameters stored in cookies to the href of specific links.
export const sendParamsToPlatform = () => {
  document.querySelectorAll('a').forEach(button => {
    if (button.href.includes('.displayforce.')) {
      const utmCookies = Cookies.get('webflowUTMs')
      if (utmCookies) {
        button.href += `?${decodeURI(utmCookies)}`
      }
    }
  })
}

// Creates a hidden input element for form submission with specified name and value.
export const createFormInput = (name, value) => {
  const hiddenInput = document.createElement('input')
  hiddenInput.style.display = 'none'
  hiddenInput.setAttribute('name', decodeURI(name))
  hiddenInput.setAttribute('data-name', decodeURI(name))
  hiddenInput.setAttribute('type', 'text')
  hiddenInput.value = decodeURI(value)
  return hiddenInput
}

// Adds hidden inputs to forms for the current page URL, referrer URL, and UTM parameters.
export const addFormInputs = () => {
  const siteForms = document.querySelectorAll('form')
  const utmsStr = Cookies.get('webflowUTMs')
  const refStr = Cookies.get('refUrl')

  siteForms.forEach(form => {
    const pageInput = createFormInput('page', window.location.href)
    form.append(pageInput)

    if (refStr) {
      const refInput = createFormInput('referrer_url', refStr)
      form.append(refInput)
    }

    if (utmsStr) {
      utmsStr.split('&').forEach(param => {
        const [key, value] = param.split('=')
        const utmInput = createFormInput(key, value)
        form.append(utmInput)
      })
    }
  })
}

// listener save user preference
document
  .querySelector('[data-cookie="accept"]')
  ?.addEventListener('click', () => {
    Cookies.set(`cdispl_marketing`, 'allow', { expires: 31 })
    Cookies.set(`cdispl_analytics`, 'allow', { expires: 31 })

    Cookies.set('cookies_agreement', 'accepted', { expires: 31 })
    document.querySelector('[data-cookie="wrapper"]')?.style.display = 'none'
  })

document
  .querySelector('[data-cookie="save"]')
  ?.addEventListener('click', ({ currentTarget }) => {
    if (!(currentTarget instanceof HTMLElement)) {
      return
    }

    Cookies.set(`cdispl_marketing`, 'deny', { expires: 31 })
    Cookies.set(`cdispl_analytics`, 'deny', { expires: 31 })

    document
      .querySelectorAll('input[type="checkbox"]:checked')
      .forEach(input => {
        const cookieType = input.getAttribute('data-cookie-type')
        if (cookieType !== 'essential') {
          Cookies.set(`cdispl_${cookieType}`, 'allow', { expires: 31 })
        }
      })

    Cookies.set('cookies_agreement', 'perference', { expires: 31 })

    checkCookie()
    modalWindow.close()
  })

// listener reject all cookies
document
  .querySelector('[data-cookie="reject-all"]')
  .addEventListener('click', ({ currentTarget }) => {
    if (!(currentTarget instanceof HTMLElement)) {
      return
    }

    Cookies.set(`cdispl_marketing`, 'deny', { expires: 31 })
    Cookies.set(`cdispl_analytics`, 'deny', { expires: 31 })
    Cookies.set('cookies_agreement', 'reject', { expires: 31 })

    checkCookie()
    modalWindow.close()
  })
