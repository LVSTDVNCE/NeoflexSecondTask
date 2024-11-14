const apiKey = '2e624f12d9152b4c6f9ecbab'
const baseCurrency = 'RUB'
const currencies = ['USD', 'EUR', 'CAD', 'CNY', 'MUR', 'SGD']
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
const dateNow = document.querySelector('.section__dateToday')

const getDate = () => {
	const date = new Date()
	dateNow.textContent = date.toLocaleString('en-US', { hour12: false })
}

async function fetchExchangeRates() {
	try {
		const response = await axios.get(apiUrl)
		const rates = currencies.map(currency => ({
			currency,
			rate: response.data.conversion_rates[currency],
		}))
		updateCurrencyList(rates)
	} catch (error) {
		console.error('Error fetching exchange rates:', error)
	}
}

const updateCurrencyList = rates => {
	const currencyList = document.querySelector('.section__currencyList')
	currencyList.innerHTML = ''

	rates.forEach(({ currency, rate }) => {
		const listItem = document.createElement('li')
		const listItemValue = document.createElement('span')
		listItemValue.textContent = `${(1 / rate).toFixed(2)}`
		listItem.appendChild(document.createTextNode(` ${currency}`))
		listItem.appendChild(listItemValue)
		currencyList.appendChild(listItem)
	})
}

fetchExchangeRates()
setInterval(getDate, 1000)
setInterval(fetchExchangeRates, 900000)
