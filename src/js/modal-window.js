/**
 * Modals
 */
export const modalWindow = {
  open: (item, youtubeId) => {
    const modals = document.querySelectorAll('[data-modal]')
    modals.forEach(modal => {
      if (modal instanceof HTMLElement) {
        modal.style.display = 'none'
        modal.style.opacity = '0'
      }
    })
    const modalsWrap = document.querySelector('[data-modals]')
    const modalItem = document.querySelector(`[data-modal="${item}"]`)

    if (youtubeId) {
      const youtubePlayer = modalItem.querySelector('[data-youtube-player]')

      if (youtubePlayer) {
        const existingIframe = youtubePlayer.querySelector('iframe')

        if (existingIframe) {
          const currentSrc = existingIframe.getAttribute('src')
          const currentVideoId = currentSrc.match(/\/embed\/([^?&]+)/)?.[1]

          if (currentVideoId !== youtubeId) {
            existingIframe.setAttribute(
              'src',
              `https://www.youtube.com/embed/${youtubeId}?autoplay=1&enablejsapi=1`
            )
          } else {
            existingIframe.contentWindow.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              '*'
            )
          }
        } else {
          youtubePlayer.innerHTML = `
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&enablejsapi=1"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          `
        }
      }
    }

    const modalsWrapBg = modalItem.querySelector('[data-modal-bg]')

    if (modalsWrap) {
      modalsWrap.style.display = 'flex'
      modalsWrap.style.position = 'fixed'
      modalsWrap.style.left = '0'
      modalsWrap.style.top = '0'
      modalsWrap.style.right = '0'
      modalsWrap.style.bottom = '0'
    }

    if (modalsWrapBg) {
      modalsWrapBg.style.position = 'fixed'
    }

    if (modalItem) {
      modalItem.style.display = 'flex'
      setTimeout(() => {
        modalItem.style.opacity = '1'
      }, 50)
    }

    document.body.style.paddingRight = `${
      window.innerWidth - document.body.clientWidth
    }px`
    document.body.classList.add('overflow-hidden')
  },

  close: () => {
    const modals = document.querySelectorAll('[data-modal]')

    modals.forEach(modal => {
      if (modal instanceof HTMLElement) {
        const videos = modal.querySelectorAll('video')
        videos.forEach(video => {
          if (video.paused === false) {
            video.pause()
          }
        })

        const youtubePlayer = modal.querySelector('[data-youtube-player]')
        if (youtubePlayer) {
          const iframe = youtubePlayer.querySelector('iframe')

          if (iframe) {
            iframe.contentWindow.postMessage(
              '{"event":"command","func":"pauseVideo","args":""}',
              '*'
            )
          }
        }

        modal.style.opacity = '0'
        setTimeout(() => {
          modal.style.display = 'none'
        }, 300)
      }
    })

    const modalsWrap = document.querySelector('[data-modals]')
    if (modalsWrap) {
      setTimeout(() => {
        modalsWrap.style.display = 'none'
      }, 300)
    }

    document.body.style.paddingRight = ''
    document.body.classList.remove('overflow-hidden')
  },
}
