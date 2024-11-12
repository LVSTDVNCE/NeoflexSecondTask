const scrollToTop = () => {
	const imageArrow =
		'<img width="50" height="50" src="https://img.icons8.com/ios/50/circled-chevron-up.png" alt="circled-chevron-up" />'
	const buttonUp = document.createElement('button')
	buttonUp.innerHTML = imageArrow
	buttonUp.setAttribute('class', 'button')
	document.body.appendChild(buttonUp)

	window.addEventListener('scroll', () => {
		window.scrollY > window.innerHeight
			? buttonUp.classList.add('display')
			: buttonUp.classList.remove('display')
	})

	buttonUp.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})
}

scrollToTop()
