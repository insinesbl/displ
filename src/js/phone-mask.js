import { loadScript } from './utils/load-script.js'
import { loadStyles } from './utils/load-styles.js'

/**
 * Phone mask with flags
 */
export const phoneMask = async () => {
  loadStyles(
    'https://cdn.jsdelivr.net/npm/intl-tel-input@20.0.3/build/css/intlTelInput.min.css'
  )
  await loadScript(
    'https://cdn.jsdelivr.net/npm/intl-tel-input@20.0.3/build/js/intlTelInput.min.js'
  )

  await loadScript(
    'https://cdn.jsdelivr.net/npm/intl-tel-input@20.0.3/build/js/utils.min.js'
  )

  $('input[type=tel]').each((index, input) => {
    const $input = $(input)
    $input.attr('name', 'phone-2')
    $input.attr('data-name', 'phone-2')

    $input.parents('.input__wrap').css('z-index', '3')

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
    $input.on('countrychange', () => {
      const $siblingCountry = $input
        .parents('form')
        .find('input[data-name="country"]')
      $siblingCountry.val(iti.getSelectedCountryData().name)
    })
    $input.on('blur', () => {
      $input.removeClass('input--error')
      $input.parents('form').find('.input__text-error').addClass('hidden')

      if (!iti.isValidNumber()) {
        $('input[name="phone"]').attr('data-name', 'phone')
        $input.addClass('input--error')
        $input
          .parents('form')
          .find('input[type="submit"]')
          .prop('disabled', true)
        $('input[name="phone"]').val('')

        if ($input.parents('form').find('.input__text-error').length === 0) {
          $input.after(
            `<div data-error="input-text" class="input__text-error hidden">incorrect phone number</div>`
          )
        }

        $input.parents('form').find('.input__text-error').removeClass('hidden')

        $input.addClass('input--error')
      } else {
        $input.removeClass('input--error')
        $input
          .parents('form')
          .find('input[type="submit"]')
          .prop('disabled', false)

        $('input[name="phone"]').val(iti.getNumber())
      }
    })

    $input.on('keypress', function (event) {
      const keyCode = window.event ? event.keyCode : event.which
      if (keyCode < 48 || keyCode > 57) {
        if (keyCode != 0 && keyCode != 8 && keyCode != 13 && !event.ctrlKey) {
          event.preventDefault()
        }
      }
    })

    $input.prop('disabled', false)
  })
}
