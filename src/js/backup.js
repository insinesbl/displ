<script>
  const loadScript = (url, async = true) =>
  new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script')
      script.src = url
      script.type = 'text/javascript'
      script.async = async

      script.addEventListener('load', () => {
        resolve({ status: true })
      })

      script.addEventListener('error', () => {
        reject({
          status: false,
          message: `Error load script ${url}`,
        })
      })

      document.body?.appendChild(script)
    } catch (error) {
      reject(error)
    }
  })

  $(() => {
    const phoneMask = async () => {
      await loadScript('https://cdn.jsdelivr.net/npm/intl-tel-input@20.0.3/build/js/utils.min.js')

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
          hiddenInput: function(telInputName) {
            return {
              phone: "phone",
            };
          }

        })
        $input.on('countrychange', () => {
          const $siblingCountry = $input.parents('form').find('input[data-name="country"]')
          $siblingCountry.val(iti.getSelectedCountryData().name)
        })
        $input.on('blur', () => {
          $input.removeClass('input--error')
          $input.parents('form').find('.input__text-error').addClass('hidden')

          if (!iti.isValidNumber()) {
            $('input[name="phone"]').attr('data-name', 'phone')
            $input.addClass('input--error')
            $input.parents('form').find('input[type="submit"]').prop('disabled', true)
            $('input[name="phone"]').val('')

            if ($input.parents('form').find('.input__text-error').length === 0) {
              $input.after(`<div data-error="input-text" class="input__text-error hidden">incorrect phone number</div>`)
            }

            $input.parents('form').find('.input__text-error').removeClass('hidden')

            $input.addClass('input--error')
          } else {
            $input.removeClass('input--error')
            $input.parents('form').find('input[type="submit"]').prop('disabled', false)

            $('input[name="phone"]').val(iti.getNumber())
          }
        })

        $input.on('keypress', function(event) {
          const keyCode = window.event ? event.keyCode : event.which;
          if (keyCode < 48 || keyCode > 57) {
            if (keyCode != 0 && keyCode != 8 && keyCode != 13 && !event.ctrlKey) {
              event.preventDefault();
            }
          }
        });
      });
    };
    phoneMask()
  })

</script>

<script async src="https://boost.allnetru.dev/js/embed/loader.js"></script>
<script>!function(n,u,t){n[u]||(n[u]={}),n[u][t]||(n[u][t]=function(){n[u].q||(n[u].q=[]),n[u].q.push(arguments)})}(window,"antc","run");</script>
<script>antc.run("antc.track.trackCode", 1);</script>

<script>
  $(() => {
    // modals
    const modalWindow = {
      open: (item) => {
        document.querySelectorAll('[data-modal]').forEach((modal) => {
          if (!(modal instanceof HTMLElement)) {
            return
          }
          modal.style.display = 'none'
          modal.style.opacity = '0'
        })

        const modalsWrap = document.querySelector('[data-modals]')
        const modalItem = document.querySelector(`[data-modal="${item}"]`)

        if (!modalItem) {
          return
        }

        if (modalsWrap) {
          modalsWrap.style.display = 'flex'
          modalsWrap.style.position = 'fixed'
          modalsWrap.style.left = '0%'
          modalsWrap.style.top = '0%'
          modalsWrap.style.right = '0%'
          modalsWrap.style.bottom = '0%'
        }

        if (modalItem) {
          modalItem.style.display = 'flex'
          setTimeout(() => {
            modalItem.style.opacity = '1'
          }, 50)
        }

        window.document.body.style.paddingRight = `${window.innerWidth - window.document.body.clientWidth}px`
        window.document.body.classList.add('overflow-hidden')
      },

      close: () => {
        document.querySelectorAll('[data-modal]').forEach((modal) => {
          if (!(modal instanceof HTMLElement)) {
            return
          }

          modal.style.opacity = '0'
          setTimeout(() => {
            modal.style.display = 'none'
          }, 300)
        })

        const modalsWrap = document.querySelector('[data-modals]')
        if (modalsWrap) {
          setTimeout(() => {
            modalsWrap.style.display = 'none'
          }, 300)
        }

        $(`[data-modal]`).find('video').trigger('pause')
        window.document.body.style.paddingRight = `${window.innerWidth - window.document.body.clientWidth}px`
        window.document.body.classList.remove('overflow-hidden')
      },
    }

    // listener open modal
    document.querySelectorAll('[data-modal-open]').forEach((btn) => {
      btn.addEventListener('click', ({ currentTarget }) => {
        if (!(currentTarget instanceof HTMLElement)) {
          return
        }

        const modal = currentTarget.getAttribute('data-modal-open')
        if (!modal) {
          console.log('The type is not specified')
          return
        }

        modalWindow.open(modal)

        if (modal === 'cookie-preferences') {
          document.querySelector('[data-cookie="wrapper"]').style.display = 'none'
        }
      })
    })

    // listener modal close
    document.querySelectorAll('[data-modal-close]').forEach((btn) => {
      btn.addEventListener('click', () => {
        modalWindow.close()
      })
    })

    document.onkeydown = function(event) {
      event = event || window.event;
      if (event.keyCode == 27) modalWindow.close()
    };
  })
</script>

<script>
  $(() => {
    const COOKIE_MARKETING = ['UserMatchHistory', 'webflowUTMs']
    const COOKIE_ANALYTICS = ['bcookie', 'bscookie', 'AnalyticsSyncHistory']

    const checkCookie = () => {
      if (!Cookies.get('cookies_agreement')) {
        document.querySelector('[data-cookie="wrapper"]').style.display = 'block'
      }

      if (Cookies.get(`cdispl_marketing`) === 'deny') {
        COOKIE_MARKETING.forEach((cookie) => {
          Cookies.remove(`${cookie}`)
        })
      }

      if (Cookies.get(`cdispl_analytics`) === 'deny') {
        COOKIE_ANALYTICS.forEach((cookie) => {
          Cookies.remove(`${cookie}`)
        })
      }
    }

    // save referrer
    const setRefUrl = () => {
      if (document.referrer.length > 0) {
        Cookies.set('refUrl', document.referrer, { expires: 31 })
      }
    }

    // save UTMs in webflowUTMs cookie
    const setUTMCookies = () => {
      const pageSearchParams = document.location.search.slice(1)
      let paramsStr = ''

      pageSearchParams.split('&').forEach((item) => {
        const arrOfParamsValue = item.split('=')
        if (arrOfParamsValue[0].includes('utm_')) {
          paramsStr += `&${arrOfParamsValue[0]}=${arrOfParamsValue[1]}`
        }
      })

      const slicedParamsStr = paramsStr.slice(1)

      if (slicedParamsStr.length > 0) {
        if (Cookies.get('cdispl_marketing') === 'deny') {
          document.querySelectorAll('a').forEach((button) => {
            if (button.href.includes('.displayforce.')) {
              button.href += `?${decodeURI(slicedParamsStr)}`
            }
          })
        } else {
          Cookies.set('webflowUTMs', slicedParamsStr, { expires: 31 })
        }
      }
    }

    // set UTMs to href links
    const sendParamsToPlatform = () => {
      document.querySelectorAll('a').forEach((button) => {
        if (button.href.includes('.displayforce.')) {
          const utmCookies = Cookies.get('webflowUTMs')

          if (utmCookies) {
            button.href += `?${decodeURI(utmCookies)}`
          }
        }
      })
    }

    document.querySelector('[data-cookie="accept"]')?.addEventListener('click', () => {
      Cookies.set(`cdispl_marketing`, 'allow', { expires: 31 })
      Cookies.set(`cdispl_analytics`, 'allow', { expires: 31 })

      Cookies.set('cookies_agreement', 'accepted', { expires: 31 })
      document.querySelector('[data-cookie="wrapper"]').style.display = 'none'
    })

    // listener save user preference
    document.querySelector('[data-cookie="save"]').addEventListener('click', ({ currentTarget }) => {
      if (!(currentTarget instanceof HTMLElement)) {
        return
      }

      Cookies.set(`cdispl_marketing`, 'deny', { expires: 31 })
      Cookies.set(`cdispl_analytics`, 'deny', { expires: 31 })

      document.querySelectorAll('input[type="checkbox"]:checked').forEach((input) => {
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
    document.querySelector('[data-cookie="reject-all"]').addEventListener('click', ({ currentTarget }) => {
      if (!(currentTarget instanceof HTMLElement)) {
        return
      }

      Cookies.set(`cdispl_marketing`, 'deny', { expires: 31 })
      Cookies.set(`cdispl_analytics`, 'deny', { expires: 31 })
      Cookies.set('cookies_agreement', 'reject', { expires: 31 })

      checkCookie()
      modalWindow.close()
    })

    const createFormInput = (name, value) => {
      const hiddenInput = document.createElement('input')
      hiddenInput.style.display = 'none'
      hiddenInput.setAttribute('name', decodeURI(name))
      hiddenInput.setAttribute('data-name', decodeURI(name))
      hiddenInput.setAttribute('type', 'text')
      hiddenInput.value = decodeURI(value)
      return hiddenInput
    }

    const addFormInputs = () => {
      const siteForms = document.querySelectorAll('form')
      const utmsStr = Cookies.get('webflowUTMs')
      const refStr = Cookies.get('refUrl')

      if (siteForms.length > 0) {
        siteForms.forEach((form) => {
          const purePhoneInput = document.createElement('input')
          purePhoneInput.setAttribute('type', 'text')
          purePhoneInput.setAttribute('data-name', 'phone-pure')

          const pageInput = createFormInput('page', window.location.href)
          form.append(pageInput)

          if (refStr) {
            const refInput = createFormInput('referrer_url', refStr)
            form.append(refInput)
          }

          if (utmsStr) {
            utmsStr.split('&').forEach((param) => {
              const arr = param.split('=')
              const utmInput = createFormInput(arr[0], arr[1])
              form.append(utmInput)
            })
          }
        })
      } else {
        return
      }
    }

    setUTMCookies()
    setRefUrl()
    sendParamsToPlatform()
    addFormInputs()

    checkCookie()


    // disabled scroll after open menu
    $('[data-menu-icon]').on('click', () => {
      $('body').toggleClass('overflow-hidden')
    })


    // fix anchor links
    $('a[href^="#"]').on('click', (event) => {
      const href = $(event.currentTarget).attr('href')
      if (href.length < 2 || href.includes('w-tabs')) {
        return
      }

      event.preventDefault()

      const top = window.innerWidth > 767 ? `${$(href).offset().top - 100}` : `${$(href).offset().top - 86}`
      $('html, body').animate({ scrollTop: top }, 800)
      window.location.hash = href

    })

    // Last item in cases move to grid cases
    if ($('[data-cases="list"]').length) {
      $('[data-cases="last-item"]').removeClass('hide')
      $('[data-cases="list"]').append($('[data-cases="last-item"]'))
    }
  })

</script>

<script>
  $(() => {
    // Listeners event 'mouseover' & 'mouseout' from tag video
    const videosNotWf = document.querySelectorAll('video:not([data-wf-ignore])')

    if (videosNotWf && window.innerWidth > 767) {
      videosNotWf.forEach((video) => {
        if (!$(video).attr('src')) return

        $(video).parents('[data-case="trigger"], [data-video="trigger"]').on('mouseover', ({currentTarget}) => {
          $(currentTarget).find('[data-video-icon]').addClass('video--active')
          video.play()
        })
        $(video).parents('[data-case="trigger"],  [data-video="trigger"]').on('mouseout', ({currentTarget}) => {
          $(currentTarget).find('[data-video-icon]').removeClass('video--active')
          video.pause()
        })
      })
    }

    // Listeners event 'mouseover' & 'mouseout' from WF video element
    $('video:is([data-wf-ignore])').parent().find('button').hide() // hide control from WF

    const videosWf = $('video:is([data-wf-ignore])')

    videosWf.each((index, video) => {
      const videoWrap = $(video).parent()
      const videoControl = $(videoWrap).find('button')
      videoWrap.on('mouseover', ({currentTarget}) => {
        $(currentTarget).find('[data-video-icon]').addClass('video--active')
        videoControl.trigger('click')
      })
      videoWrap.on('mouseout', ({currentTarget}) => {
        $(currentTarget).find('[data-video-icon]').removeClass('video--active')
        videoControl.trigger('click')
      })
    })
  })
</script>

<script>
  $(() => {
    const downloadFile = (url) => {
      fetch(url)
        .then((response) => {
        if (response.ok) {
          return response.blob()
        }
        throw new Error('Network response was not ok.')
      })
        .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob)
        const downloadLink = document.createElement('a')
        downloadLink.href = blobUrl
        downloadLink.download = url.split('/').pop() // Устанавливаем имя файла

        // Добавляем ссылку в DOM и кликаем по ней
        document.body?.appendChild(downloadLink)
        downloadLink.click()

        // Удаляем ссылку из DOM и освобождаем URL
        document.body?.removeChild(downloadLink)
        window.URL.revokeObjectURL(blobUrl)
      })
        .catch((error) => console.error('Fetch error:', error))
    }

    $('[data-download-file]').on('click', ({ currentTarget }) => {
      const host = 'https://cdn.jsdelivr.net/gh/insinesbl/displ/data'
      const url = $(currentTarget).attr('data-download-file')
      downloadFile(`${host}/${url}`)
    })

    // Close current window
    $('[data-window-close]').on('click', () => window.close())
  })

</script>
