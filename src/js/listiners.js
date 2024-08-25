import { modalWindow } from './modal-window.js'
import { topBannerToggle } from './top-banner-toggle.js'

/**
 * Add all listeners
 */
export const addAllListiners = () => {
  document
    .querySelector('[data-top-banner="close"]')
    ?.addEventListener('click', () => {
      Cookies.set(`top-banner`, 'hide', { expires: 10 })
      topBannerToggle('hide')
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
          video.play()
        })
      $(video)
        .parents('[data-case="trigger"],  [data-video="trigger"]')
        .on('mouseout', ({ currentTarget }) => {
          $(currentTarget)
            .find('[data-video-icon]')
            .removeClass('video--active')
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

    videoWrap.on('mouseover', ({ currentTarget }) => {
      $(currentTarget).find('[data-video-icon]').addClass('video--active')
      videoControl.trigger('click')
    })
    videoWrap.on('mouseout', ({ currentTarget }) => {
      $(currentTarget).find('[data-video-icon]').removeClass('video--active')
      videoControl.trigger('click')
    })
  })
}
