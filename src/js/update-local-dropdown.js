const LANG_MAP = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
}

export const updateLocalDropdown = () => {
  const lang = $('html').attr('lang')
  const currentLocalName = LANG_MAP[lang] || 'Unknown'

  $('[data-local-toggle]').text(currentLocalName)
}
