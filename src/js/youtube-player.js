// export const initYoutube = () => {
//   console.log(1)
//   let player
//   let currentVideoId = null
//   let isYouTubeAPILoaded = false
//   let isPlayerCreated = false
//   let currentButton = null

//   const videoButtons = document.querySelectorAll('[data-modal-open="youtube"]')

//   function loadYouTubeAPI() {
//     if (!isYouTubeAPILoaded) {
//       window.onYouTubeIframeAPIReady = function () {
//         isYouTubeAPILoaded = true
//         console.log('YouTube API загружен')
//         createPlayer(currentVideoId)
//       }

//       const tag = document.createElement('script')
//       tag.src = 'https://www.youtube.com/iframe_api'
//       const firstScriptTag = document.getElementsByTagName('script')[0]
//       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

//       isYouTubeAPILoaded = true
//     }
//   }

//   // Создание плеера YouTube
//   function createPlayer(videoId) {
//     if (!isPlayerCreated) {
//       player = new YT.Player('[data-youtube-player]', {
//         videoId: videoId,
//         playerVars: {
//           playsinline: 1,
//           autoplay: 1,
//           enablejsapi: 1,
//           origin: window.location.origin,
//           rel: 0,
//         },
//         events: {
//           onReady: onPlayerReady,
//         },
//       })

//       isPlayerCreated = true
//     } else if (videoId !== currentVideoId) {
//       player.loadVideoById(videoId)
//     } else {
//       player.playVideo()
//     }

//     currentVideoId = videoId
//   }

//   function onPlayerReady(event) {
//     console.log('Плеер готов и запущен')
//   }

//   // Функция открытия модального окна и инициализации плеера
//   function openModal(button) {
//     // Сохраняем текущую кнопку
//     currentButton = button

//     // Получаем ID видео из data-атрибута
//     const videoId = button.getAttribute('data-youtube')

//     // Показываем модальное окно
//     modal.classList.add('active')

//     // Если API еще не загружен, загружаем его
//     if (!isYouTubeAPILoaded) {
//       currentVideoId = videoId
//       loadYouTubeAPI()
//     } else if (isPlayerCreated) {
//       // Если API уже загружен и плеер создан
//       if (videoId === currentVideoId) {
//         // Если то же самое видео, просто воспроизводим
//         player.playVideo()
//       } else {
//         // Если другое видео, загружаем новое
//         player.loadVideoById(videoId)
//         currentVideoId = videoId
//       }
//     } else if (isYouTubeAPILoaded && !isPlayerCreated) {
//       // Если API загружен, но плеер еще не создан
//       createPlayer(videoId)
//     }
//   }

//   // Функция закрытия модального окна
//   function closeModal() {
//     modal.classList.remove('active')

//     // Ставим видео на паузу, если плеер существует
//     if (isPlayerCreated && player && player.pauseVideo) {
//       player.pauseVideo()
//     }
//   }

//   // Добавляем обработчики событий для кнопок
//   videoButtons.forEach(button => {
//     button.addEventListener('click', () => openModal(button))
//   })

//   // Обработчик для кнопки закрытия
//   closeButton.addEventListener('click', closeModal)

//   // Закрытие модального окна при клике за его пределами
//   modal.addEventListener('click', e => {
//     if (e.target === modal) {
//       closeModal()
//     }
//   })

//   // Закрытие модального окна при нажатии клавиши Escape
//   document.addEventListener('keydown', e => {
//     if (e.key === 'Escape' && modal.classList.contains('active')) {
//       closeModal()
//     }
//   })
// }
