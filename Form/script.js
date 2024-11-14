const passwordInput = document.querySelector('.input-password')
const feedback = document.querySelector('.password-feedback')
const fioInput = document.querySelector('.input-text')
const fioFeedback = document.querySelector('.fio-feedback')

function checkPasswordStrength(password) {
	let strengthMessage = ''
	let strength = 0

	if (password.length >= 8) {
		strength++
	} else {
		strengthMessage += 'Min 8 characters. '
	}

	if (/[0-9]/.test(password)) {
		strength++
	} else {
		strengthMessage += 'At least one digit. '
	}

	if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
		strength++
	} else {
		strengthMessage += 'Use special character. '
	}

	switch (strength) {
		case 3:
			return 'Strong password.'
		case 2:
			return 'Moderate password. ' + strengthMessage
		default:
			return 'Weak password. ' + strengthMessage
	}
}

passwordInput.addEventListener('input', () => {
	const password = passwordInput.value
	const message = checkPasswordStrength(password)
	feedback.textContent = message

	if (message.includes('Strong')) {
		feedback.style.color = 'green'
		feedback.textContent += ' ✓'
		passwordInput.classList.add('input-success')
		passwordInput.classList.remove('input-error')
	} else {
		feedback.style.color = 'red'
		passwordInput.classList.add('input-error')
		passwordInput.classList.remove('input-success')
	}
})

function checkFioInput(value) {
	const onlyLetters = /^[A-Za-zА-Яа-яЁё\s]+$/
	if (onlyLetters.test(value)) {
		fioFeedback.style.color = 'green'
		fioFeedback.textContent = 'Valid FIO'
		fioFeedback.textContent += ' ✓'
		fioInput.classList.add('input-success')
		fioInput.classList.remove('input-error')
	} else {
		fioFeedback.style.color = 'red'
		fioFeedback.textContent = 'FIO should contain only letters.'
		fioInput.classList.add('input-error')
		fioInput.classList.remove('input-success')
	}
}

fioInput.addEventListener('input', () => {
	checkFioInput(fioInput.value)
})
