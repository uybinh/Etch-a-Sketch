
function createBox (num) {
  document.documentElement.style.setProperty('--row', `${num}`)
  document.documentElement.style.setProperty('--col', `${num}`)
  const body = document.querySelector('body')
  const container = document.createElement('div')
  container.id = 'container'
  body.appendChild(container)
  container.style.width = '60%'
  container.style.maxWidth = '600px'
  container.style.height = window.getComputedStyle(container).width
  window.addEventListener('resize', function () {
    container.style.height = window.getComputedStyle(container).width
  })
  for (let i = 1; i <= num * num; i++) {
    const box = document.createElement('div')
    box.classList.add('box')
    container.appendChild(box)
  }
}
createBox(20)

function setBoxColor (color) {
  const boxes = document.getElementsByClassName('box')
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('mouseover', (e) => {
      if (color === 'random') e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 200) + 0}, ${Math.floor(Math.random() * 200) + 50}, ${Math.floor(Math.random() * 200) + 50})`
      else e.target.style.backgroundColor = color
    })
  }
}

function resetBoxColor () {
  const boxes = document.getElementsByClassName('box')
  console.log(boxes)
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = ''
  }
  setBoxColor('blue')
}

setBoxColor('blue')
const body = document.querySelector('body')
const resetButton = document.createElement('button')
const blackButton = document.createElement('button')
const randomColorButton = document.createElement('button')
resetButton.textContent = 'Reset'
blackButton.textContent = 'Black'
randomColorButton.textContent = 'Rainbow'
body.appendChild(resetButton)
body.appendChild(blackButton)
body.appendChild(randomColorButton)
resetButton.addEventListener('click', resetBoxColor)
blackButton.addEventListener('click', () => setBoxColor('black'))
randomColorButton.addEventListener('click', () => setBoxColor('random'))
