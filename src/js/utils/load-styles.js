export const loadStyles = href => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve()
      return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href

    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to load styles: ${href}`))

    document.head.appendChild(link)
  })
}
