{
	const divEl = document.createElement('div')
	divEl.style.position = 'fixed'
	divEl.style.bottom = '0'
	divEl.style.left = '0'
	
	const rangeEl = document.createElement('input')
	rangeEl.type = 'range'
	rangeEl.min = 0.1
	rangeEl.max = 10
	rangeEl.step = 0.1
	rangeEl.value = 1
	rangeEl.style.width = '500px'
	rangeEl.addEventListener('change', valChange.bind(rangeEl))
	
	const numInputEl = document.createElement('input')
	numInputEl.type = 'number'
	numInputEl.min = 0.1
	numInputEl.max = 10
	numInputEl.step = 0.1
	numInputEl.value = 1
	numInputEl.addEventListener('change', valChange.bind(numInputEl))
	
	function valChange() {
		const val = Number(this.value)
		
		// reflect the change on the input els
		rangeEl.value = val
		numInputEl.value = val
		$('video').playbackRate = val
	}
	function $(selector, rootNode=document) {
		return rootNode.querySelector(selector)
	}
	
	divEl.appendChild(rangeEl)
	divEl.appendChild(numInputEl)
	document.body.appendChild(divEl)
}
