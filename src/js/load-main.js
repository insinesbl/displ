const localDev = localStorage.getItem('local-dev')
const script = document.createElement('script')
const host =
  localDev === '1'
    ? 'http://localhost:5500'
    : 'https://cdn.jsdelivr.net/gh/insinesbl/displ@v1.0.42'
script.type = 'module'
script.async = true
script.src = `${host}/src/js/index.js`
document.body.appendChild(script)
