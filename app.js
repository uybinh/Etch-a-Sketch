
function createBox (num, borderRadius = '10px') {
  document.documentElement.style.setProperty('--row', `${num}`)
  document.documentElement.style.setProperty('--col', `${num}`)
  document.documentElement.style.setProperty('--borderRadius', `${borderRadius}`)
  const body = document.querySelector('body')

  const container = document.createElement('div')
  container.id = 'container'
  body.appendChild(container)
  container.style.width = '60%'
  container.style.maxWidth = '560px'
  container.style.height = window.getComputedStyle(container).width

  for (let i = 1; i <= num * num; i++) {
    const box = document.createElement('div')
    box.classList.add('box')
    box.id = 'box' + i
    container.appendChild(box)
  }

  document.querySelector('#box' + 1).style.borderRadius = `${borderRadius} 0 0 0`
  document.querySelector('#box' + num).style.borderRadius = `0 ${borderRadius} 0 0`
  document.querySelector('#box' + (num * (num - 1) + 1)).style.borderRadius = `0 0 0 ${borderRadius}`
  document.querySelector('#box' + (num * num)).style.borderRadius = `0 0 ${borderRadius} 0`

  setBoxColor('green')
}

function setBoxColor (color) {
  const oldContainer = document.getElementById('container')
  const container = oldContainer.cloneNode(true)
  oldContainer.parentNode.replaceChild(container, oldContainer)
  // Reset box height after replace container
  window.addEventListener('resize', function () {
    container.style.height = window.getComputedStyle(container).width
  })
  // --------------------------------------------
  clearBoxColor()
  const boxes = document.getElementsByClassName('box')
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('mouseover', (e) => {
      if (color === 'random') e.target.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360) + 1}, ${Math.floor(Math.random() * 100) + 1}%, ${Math.floor(Math.random() * 60) + 41}%)`
      else e.target.style.backgroundColor = color
    })
  }
}
// The code above get a HTMLCollection of class .box run a for loop addEventListener to each node
// You this code below instead to addEventlistener to the container and e.target (event object with target is the current element (in this case is each 'box'))
// But use below code can lead to set background color to entirely container box
// const container = document.getElementById('container')
// container.addEventListener('mouseover', (e) => {
//   if (color === 'random') e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 200) + 0}, ${Math.floor(Math.random() * 200) + 50}, ${Math.floor(Math.random() * 200) + 50})`
//   else e.target.style.backgroundColor = color
//   e.stopPropagation()
// })

// function setBoxColorBolder (color) {
//   const oldContainer = document.getElementById('container')
//   const container = oldContainer.cloneNode(true)
//   oldContainer.parentNode.replaceChild(container, oldContainer)
//   // Reset box height after replace container
//   window.addEventListener('resize', function () {
//     container.style.height = window.getComputedStyle(container).width
//   })
//   // --------------------------------------------
//   const boxes = document.getElementsByClassName('box')
//   clearBoxColor()

//   for (let i = 0; i < boxes.length; i++) {
//     boxes[i].addEventListener('mouseover', (e) => {
//       let colorString = e.target.style.backgroundColor
//       console.log(colorString.slice(4, 17).split(',')[1])
//       if (!colorString) {
//         e.target.style.backgroundColor = `rgb(230, 230, 230)`
//       } else if (colorString.slice(4, 17).split(',')[1] > 0) {
//         let colorArray = colorString.slice(4, 17).split(',')
//         console.log(colorArray)
//         let colorRed = colorArray[0]
//         var colorGreen = colorArray[1]
//         let colorBlue = colorArray[2]
//         if (colorRed > 0) {
//           colorRed -= 9
//           colorGreen -= 9
//           colorBlue -= 9
//         }
//         e.target.style.backgroundColor = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`
//       } else {
//         e.target.style.backgroundColor = `rgb(0, 0, 0)`
//       }
//     })
//   }
// }
function setBoxColorBolder (color) {
  const oldContainer = document.getElementById('container')
  const container = oldContainer.cloneNode(true)
  oldContainer.parentNode.replaceChild(container, oldContainer)
  // Reset box height after replace container
  window.addEventListener('resize', function () {
    container.style.height = window.getComputedStyle(container).width
  })
  // --------------------------------------------
  const boxes = document.getElementsByClassName('box')
  clearBoxColor()
  for (let i = 0; i < boxes.length; i++) {
    let opacity = 0
    boxes[i].addEventListener('mouseover', (e) => {
      console.log(opacity)
      if (opacity < 10) ++opacity
      console.log(opacity)
      e.target.style.backgroundColor = `rgba(0 ,0 ,0 ,${opacity / 10}`
    })
  }
}

function clearBoxColor () {
  const boxes = document.getElementsByClassName('box')
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = ''
  }
}

function resetBox () {
  const body = document.querySelector('body')
  body.removeChild(document.querySelector('#container'))

  let num = prompt('Enter the number of box each row.')
  while (isNaN(num) || !num) num = prompt('Please enter a number')
  while (Math.floor(num) !== +num) num = prompt('Please enter an Integer (1, 2, 3, 4, 9, ....')
  while (num > 50) num = prompt('Please enter number less than or equal to 50.')

  createBox(Number(num))
}

function createButtons () {
  const body = document.querySelector('body')
  const buttonsGroup = document.createElement('div')
  buttonsGroup.id = 'buttons-group'
  const resetButton = document.createElement('button')
  const clearButton = document.createElement('button')
  const blackButton = document.createElement('button')
  const randomButton = document.createElement('button')
  const bolderButton = document.createElement('button')
  resetButton.textContent = 'Reset'
  resetButton.id = 'reset-button'
  blackButton.textContent = 'Black'
  blackButton.id = 'black-button'
  randomButton.textContent = 'Random'
  randomButton.id = 'random-button'
  clearButton.textContent = 'Clear'
  clearButton.id = 'clear-button'
  bolderButton.textContent = 'Bolder'
  bolderButton.id = 'bolder-button'
  buttonsGroup.appendChild(blackButton)
  buttonsGroup.appendChild(randomButton)
  buttonsGroup.appendChild(bolderButton)
  buttonsGroup.appendChild(clearButton)
  buttonsGroup.appendChild(resetButton)
  body.appendChild(buttonsGroup)

  resetButton.addEventListener('click', resetBox)
  clearButton.addEventListener('click', clearBoxColor)
  blackButton.addEventListener('click', () => setBoxColor('black'))
  randomButton.addEventListener('click', () => setBoxColor('random'))
  bolderButton.addEventListener('click', setBoxColorBolder)
}

createButtons()
createBox(15)
