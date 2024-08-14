import { loadScript } from './utils/load-script.js'

/**
 * Phone mask with flags
 */
export const phoneMask = async () => {
  await loadScript(
    'https://cdn.jsdelivr.net/npm/intl-tel-input@20.0.3/build/js/utils.min.js'
  )

  const phoneInputs = document.querySelectorAll('input[type="tel"]')
  phoneInputs.forEach(input => {
    input.setAttribute('name', 'phone-2')
    input.setAttribute('data-name', 'phone-2')

    const inputWrap = input.closest('.input__wrap')
    if (inputWrap) {
      inputWrap.style.zIndex = '3'
    }

    const iti = window.intlTelInput(input, {
      autoInsertDialCode: true,
      countrySearch: true,
      preferredCountries: ['us', 'gb'],
      separateDialCode: true,
      placeholderNumberType: 'MOBILE',
      nationalMode: true,
      initialCountry: 'us',
      formatOnDisplay: true,
      showSelectedDialCode: true,
      hiddenInput: function (telInputName) {
        return {
          phone: 'phone',
        }
      },
    })

    input.addEventListener('countrychange', () => {
      const form = input.closest('form')
      const siblingCountry = form.querySelector('input[data-name="country"]')
      if (siblingCountry) {
        siblingCountry.value = iti.getSelectedCountryData().name
      }
    })

    input.addEventListener('blur', () => {
      const errorClass = 'input--error'
      const form = input.closest('form')
      const errorText = form.querySelector('.input__text-error')

      input.classList.remove(errorClass)
      if (errorText) errorText.classList.add('hidden')

      if (!iti.isValidNumber()) {
        input.classList.add(errorClass)
        const submitButton = form.querySelector('input[type="submit"]')
        if (submitButton) submitButton.disabled = true
        input.value = ''

        if (!errorText) {
          const errorDiv = document.createElement('div')
          errorDiv.classList.add('input__text-error', 'hidden')
          errorDiv.textContent = 'Incorrect phone number'
          input.insertAdjacentElement('afterend', errorDiv)
        }

        form.querySelector('.input__text-error').classList.remove('hidden')
      } else {
        input.classList.remove(errorClass)
        const submitButton = form.querySelector('input[type="submit"]')
        if (submitButton) submitButton.disabled = false
        input.value = iti.getNumber()
      }
    })

    input.addEventListener('keypress', event => {
      const keyCode = event.keyCode || event.which
      if (keyCode < 48 || keyCode > 57) {
        if (
          keyCode !== 0 &&
          keyCode !== 8 &&
          keyCode !== 13 &&
          !event.ctrlKey
        ) {
          event.preventDefault()
        }
      }
    })
  })
}
