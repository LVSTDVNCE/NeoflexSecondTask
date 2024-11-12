const input = document.querySelector('.input')
const listItems = document.querySelectorAll('.list li')

input.addEventListener('input', () => {
	const inputText = input.value.toLowerCase()

	listItems.forEach(item => {
		const itemText = item.textContent.toLowerCase()
		if (itemText.includes(inputText)) {
			item.style.display = ''
		} else {
			item.style.display = 'none'
		}
	})
})
