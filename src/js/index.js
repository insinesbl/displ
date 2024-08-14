import { phoneMask } from './phone-mask.js'
import { modalWindow } from './modal-window.js'
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
  addFormInputs()

  addAllListiners() // add all listiners

  fixAnchorLinks() // fix anchor links

  moveLastItemCase() // Last item in cases move to grid cases

  // Listeners event 'mouseover' & 'mouseout' from tag video
  const videosNotWf = document.querySelectorAll('video:not([data-wf-ignore])')

  if (videosNotWf && window.innerWidth > 767) {
    videosNotWf.forEach(video => {
      if (!$(video).attr('src')) return

      console.log(video)
      $(video)
        .parents('[data-case="trigger"], [data-video="trigger"]')
        .on('mouseover', ({ currentTarget }) => {
          console.log('play')
          $(currentTarget).find('[data-video-icon]').addClass('video--active')
          video.play()
        })
      $(video)
        .parents('[data-case="trigger"],  [data-video="trigger"]')
        .on('mouseout', ({ currentTarget }) => {
          console.log('stop')
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
    console.log(video)

    videoWrap.on('mouseover', ({ currentTarget }) => {
      console.log('play')

      $(currentTarget).find('[data-video-icon]').addClass('video--active')
      videoControl.trigger('click')
    })
    videoWrap.on('mouseout', ({ currentTarget }) => {
      console.log('stop')

      $(currentTarget).find('[data-video-icon]').removeClass('video--active')
      videoControl.trigger('click')
    })
  })
})

export { modalWindow }
