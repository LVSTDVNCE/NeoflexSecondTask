const slider = document.querySelector('.slider__list')
const toLeft = document.querySelector('.left')
const toRight = document.querySelector('.right')
const buttons = document.querySelector('.btnWrapper')
const loader = document.querySelector('.loader')
const countCards = 20
const apiUrl = `https://picsum.photos/v2/list?page=1&limit=${countCards}`

let startIndex = 0
const slideLength = 500
const slideLengthMobile = 250

function disableButtonsOnTouchScreen() {
	if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
		buttons.style.display = 'none'
	}
}

async function fetchImagesAndText() {
	loader.style.display = 'inline-block'
	try {
		const response = await axios.get(apiUrl)
		const imagesAndTexts = response.data
		addToSlider(imagesAndTexts)
		updateButtons()
	} catch (error) {
		console.error(error)
	} finally {
		loader.style.display = 'none'
	}
}

function addToSlider(imagesAndTexts) {
	imagesAndTexts.forEach(imageAndText => {
		const listItem = document.createElement('li')
		const lowResolutionUrl = `https://picsum.photos/id/${imageAndText.id}/400/300`
		listItem.innerHTML = `
      <img src="${lowResolutionUrl}" style="width: 100%; height: 80%;" alt="picture">
      <p>${imageAndText.author}</p>
    `
		slider.appendChild(listItem)
	})
}

const updateButtons = () => {
	toLeft.disabled = startIndex === 0
	toRight.disabled = startIndex >= countCards / 2 - 1
}

const goToNext = (index, slide) => {
	slider.style.transform = `translateX(-${index * slide}px)`
	startIndex = index
	updateButtons()
}

toLeft.addEventListener('click', () => {
	if (startIndex > 0) {
		goToNext(startIndex - 1, slideLength)
	}
})

toRight.addEventListener('click', () => {
	if (startIndex < countCards - 3) {
		goToNext(startIndex + 1, slideLength)
	}
})

let startX = 0
slider.addEventListener('touchstart', event => {
	startX = event.touches[0].clientX
})

slider.addEventListener('touchmove', event => {
	const touch = event.touches[0]
	const diff = startX - touch.clientX
	if (diff > 50 && startIndex < countCards - 1) {
		goToNext(startIndex + 1, slideLengthMobile)
		startX = touch.clientX
	} else if (diff < -50 && startIndex > 0) {
		goToNext(startIndex - 1, slideLengthMobile)
		startX = touch.clientX
	}
})

disableButtonsOnTouchScreen()
fetchImagesAndText()
updateButtons()
