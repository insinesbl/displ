export const downloadFile = url => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.blob()
      }
      throw new Error('Network response was not ok.')
    })
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob)
      const downloadLink = document.createElement('a')
      downloadLink.href = blobUrl
      downloadLink.download = url.split('/').pop() // set file name

      // add link to DOM
      document.body.appendChild(downloadLink)
      downloadLink.click()

      // remove link to DOM
      document.body.removeChild(downloadLink)
      window.URL.revokeObjectURL(blobUrl)
    })
    .catch(error => console.error('Fetch error:', error))
}

$('[data-download-file]').on('click', ({ currentTarget }) => {
  const host = 'https://cdn.jsdelivr.net/gh/insinesbl/displ/data'
  const url = $(currentTarget).attr('data-download-file')
  downloadFile(`${host}/${url}`)
})
