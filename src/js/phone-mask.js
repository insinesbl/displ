import { loadScript } from './utils/load-script.js'
import { loadStyles } from './utils/load-styles.js'

/**
 * Phone mask with flags
 */
export const phoneMask = async () => {
  try {
    await loadStyles(
      'https://cdn.jsdelivr.net/npm/intl-tel-input@20.0.3/build/css/intlTelInput.min.css'
    )
    await loadScript(
      'https://cdn.jsdelivr.net/npm/intl-tel-input@20.0.3/build/js/intlTelInput.min.js'
    )
    await loadScript(
      'https://cdn.jsdelivr.net/npm/intl-tel-input@20.0.3/build/js/utils.min.js'
    )

    if (!window.intlTelInput) {
      throw new Error('intlTelInput is not available')
    }

    $('input[type=tel]').each((index, input) => {
      const $input = $(input)

      if (!$input.length) {
        console.warn('Input element not found')
        return
      }

      if ($input.siblings('input[name="phone"]').length > 0) {
        return
      }

      $input.attr('name', `phone-${index}`)
      $input.attr('data-name', `phone-${index}`)
      $input.parents('.input__wrap').css('z-index', '3')

      let aditionalInput = 'phone'
      const isLeadNumber = $input.data('type-phone')
      if (isLeadNumber === 'lead') aditionalInput = 'phone-lead'

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
            phone: aditionalInput,
          }
        },
      })

      $input.on('countrychange', () => {
        const $siblingCountry = $input
          .parents('form')
          .find('input[data-name="country"]')
        $siblingCountry.val(iti.getSelectedCountryData().name)
      })

      $input.on('blur', el => {
        $input.removeClass('input--error')
        $input.parents('form').find('.input__text-error').addClass('hidden')

        const phoneNumber = iti.getNumber()
        if (!phoneNumber || !iti.isValidNumber()) {
          $input
            .siblings($(`input[name="${aditionalInput}"]`))
            .attr('data-name', 'phone')
          $input.addClass('input--error')
          $input
            .parents('form')
            .find('input[type="submit"]')
            .prop('disabled', true)
          $input.siblings($(`input[name="${aditionalInput}"]`)).val('')

          if ($input.parents('form').find('.input__text-error').length === 0) {
            $input.after(
              `<div data-error="input-text" class="input__text-error hidden">incorrect phone number</div>`
            )
          }

          $input
            .parents('form')
            .find('.input__text-error')
            .removeClass('hidden')
          $input.addClass('input--error')
        } else {
          $input.removeClass('input--error')
          $input
            .parents('form')
            .find('input[type="submit"]')
            .prop('disabled', false)
          $input.siblings($(`input[name="${aditionalInput}"]`)).val(phoneNumber)
        }
      })

      $input.on('keypress', function (event) {
        const keyCode = event.keyCode || event.which
        const allowedKeys = [8, 13, 37, 39] // Backspace, Enter, Left Arrow, Right Arrow
        const isCtrlKey = event.ctrlKey || event.metaKey // Ctrl, Cmd

        if (
          (keyCode < 48 || keyCode > 57) &&
          !allowedKeys.includes(keyCode) &&
          !isCtrlKey
        ) {
          event.preventDefault()
        }
      })

      $input.prop('disabled', false)
    })
  } catch (error) {
    console.error('Error in phoneMask:', error)
  }
}
