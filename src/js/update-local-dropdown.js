export const updateLocalDropdown = () => {
  const currentLocal = $('html').attr('data-wf-locale')
  const currentLocalName = $(`[data-local-item="${currentLocal}"]`).text()
  $('[data-local-toggle]').text(currentLocalName)
}
