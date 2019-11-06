const resolutions = [
  { width: 1280, height: 800 },
  { width: 1024, height: 768 },
  { width: 640, height: 960 },
  { width: 480, height: 800 },
  { width: 414, height: 736 },
  { width: 375, height: 812 },
  { width: 375, height: 667 },
  { width: 320, height: 480 },
]

const colors = ['#3a3897', '#38973a', '#6a3897', '#87509c', '#eb7d4b', '#AD2B2D', '#d74680', '#3c5499', '#344b8e', '#F2902E', '#C44B23', '#751E44']
const randomColor = () => colors[Math.floor(colors.length * Math.random())]

const resolutionsBlock = document.querySelector('.adaptive-resolutions')
const form = document.querySelector('.adaptive-form')
const input = document.querySelector('.adaptive-form__input')
const iframe = document.querySelector('iframe')
const controlButtons = document.querySelectorAll('.adaptive__control')
const reload = document.querySelector('.adaptive__control_reload')
const reverse = document.querySelector('.adaptive__control_reverse')
const scrolling = document.querySelector('.adaptive__control_scrolling')
const str = `<style>button:hover,button.active{background:${randomColor()}!important;}</style>`

document.querySelector('body').insertAdjacentHTML('afterbegin', str)

function renderResolutions() {
  resolutionsBlock.innerHTML = ''
  const buttons = resolutions.map(item => `<button data-width="${item.width}" data-height="${item.height}" class="adaptive__resolution">${item.width}×${item.height}</button>`).join('\n')
  resolutionsBlock.insertAdjacentHTML('afterbegin', buttons)
  const resolutionsButtons = document.querySelectorAll('.adaptive__resolution')
  resolutionsButtons[0].classList.add('active')
}

function renderIframe(inputValue) {
  iframe.style.display = 'block'
  iframe.style.width = resolutions[0].width + 'px'
  iframe.style.height = resolutions[0].height + 'px'
  inputValue.indexOf('http') != -1
    ? iframe.setAttribute('src', inputValue)
    : iframe.setAttribute('src', `//${inputValue}`)
}

form.addEventListener('submit', event => {
  event.preventDefault()
  reverse.classList.remove('active')
  let inputValue = input.value
  renderResolutions()
  renderIframe(inputValue)
  controlButtons.forEach(item => item.removeAttribute('disabled'))
})

resolutionsBlock.addEventListener('click', event => {
  if (event.target.tagName = 'BUTTON') {
    const resolutionsButtons = document.querySelectorAll('.adaptive__resolution')
    resolutionsButtons.forEach(item => item.classList.remove('active'))
    event.target.classList.add('active')
    reverse.classList.remove('active')
    if (reload.classList.contains('active')) {
      let inputValue = input.value
      inputValue.indexOf('http') != -1
        ? iframe.setAttribute('src', inputValue)
        : iframe.setAttribute('src', '//' + inputValue)
    }
    iframe.style.width = event.target.dataset.width + 'px'
    iframe.style.height = event.target.dataset.height + 'px'
  }
})

reload.addEventListener('click', () => {
  reload.classList.contains('active')
    ? reload.classList.remove('active')
    : reload.classList.add('active')
})

reverse.addEventListener('click', () => {
  reverse.classList.contains('active')
    ? reverse.classList.remove('active')
    : reverse.classList.add('active')
  let width = iframe.offsetWidth
  let height = iframe.offsetHeight
  iframe.style.width = height + 'px'
  iframe.style.height = width + 'px'
})

scrolling.addEventListener('click', () => {
  scrolling.classList.contains('active')
    ? (scrolling.classList.remove('active'), iframe.setAttribute('scrolling', 'yes'), scrolling.textContent = 'Отключить прокрутку')
    : (scrolling.classList.add('active'), iframe.setAttribute('scrolling', 'no'), scrolling.textContent = 'Включить прокрутку')
})
