import { modalWindow } from './modal-window.js'
import { phoneMask } from './phone-mask.js'
import { topBannerToggle } from './top-banner-toggle.js'

/**
 * Add all listeners
 */
export const addAllListiners = () => {
  document
    .querySelector('[data-top-banner="close"]')
    ?.addEventListener('click', event => {
      event.stopPropagation()
      event.preventDefault()

      Cookies.set(`top-banner`, 'hide', { expires: 10 })
      topBannerToggle('hide')
    })

  // Play button / Hover
  document.querySelectorAll('[data-play-button="button"]').forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.setAttribute('data-play-button-theme', 'grape')
    })

    button.addEventListener('mouseleave', () => {
      button.removeAttribute('data-play-button-theme')
    })
  })

  // disabled scroll after open menu hamburger mobile
  document.querySelector('[data-menu-icon]')?.addEventListener('click', () => {
    document.body.classList.toggle('overflow-hidden')
  })

  // listener open modal
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', ({ currentTarget }) => {
      if (!(currentTarget instanceof HTMLElement)) {
        return
      }

      const modal = currentTarget.getAttribute('data-modal-open')
      const youtubeId = currentTarget.getAttribute('data-youtube')

      if (!modal) {
        console.log('The type is not specified')
        return
      }

      modalWindow.open(modal, youtubeId)

      if (modal === 'cookie-preferences') {
        document.querySelector('[data-cookie="wrapper"]').style.display = 'none'
      }
    })
  })

  // listener modal close
  document
    .querySelectorAll('[data-modal-close], [data-window-close]')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        modalWindow.close()
      })
    })

  // listener modal close "Esc"
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') modalWindow.close()
  })

  // Listeners event 'mouseover' & 'mouseout' from tag video
  const videosNotWf = document.querySelectorAll('video:not([data-wf-ignore])')
  if (videosNotWf && window.innerWidth > 767) {
    videosNotWf.forEach(video => {
      if (!$(video).attr('src')) return

      $(video)
        .parents('[data-case="trigger"], [data-video="trigger"]')
        .on('mouseover', ({ currentTarget }) => {
          $(currentTarget).find('[data-video-icon]').addClass('video--active')
          $(currentTarget).find('[data-case="poster"]').hide()
          video.play().catch(error => {
            if (error.name === 'AbortError') {
              console.log('play() was interrupted by pause().')
            } else {
              console.error(
                'Error occurred while trying to play the video:',
                error
              )
            }
          })
        })
      $(video)
        .parents('[data-case="trigger"],  [data-video="trigger"]')
        .on('mouseout', ({ currentTarget }) => {
          $(currentTarget)
            .find('[data-video-icon]')
            .removeClass('video--active')

          if (!video.paused) {
            video.pause()
          }
        })
    })
  }

  // Listeners event 'mouseover' & 'mouseout' from WF video element
  $('video:is([data-wf-ignore])').parent().find('button').hide() // hide control from WF

  const videosWf = $('video:is([data-wf-ignore])')

  videosWf.each((index, video) => {
    const videoWrap = $(video).parent()
    const videoControl = $(videoWrap).find('button')

    videoWrap.on('mouseover', ({ currentTarget }) => {
      $(currentTarget).find('[data-video-icon]').addClass('video--active')
      videoControl.trigger('click')
    })
    videoWrap.on('mouseout', ({ currentTarget }) => {
      $(currentTarget).find('[data-video-icon]').removeClass('video--active')
      videoControl.trigger('click')
    })
  })

  // Phone input
  $('input[type=tel]').each((index, input) => {
    const $input = $(input)
    $input.prop('disabled', true) // start disabled
  })
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        phoneMask()
        observer.unobserve(entry.target)
      }
    })
  }, {})
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    observer.observe(input)
  })

  // IntersectionObserver video play
  const videos = document.querySelectorAll('video[data-play-observer]')
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (
            entry.isIntersecting &&
            entry.target instanceof HTMLVideoElement
          ) {
            entry.target.play()
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.3,
      }
    )

    videos.forEach(video => {
      observer.observe(video)
    })
  } else {
    videos.forEach(video => {
      video.play()
    })
  }
}
