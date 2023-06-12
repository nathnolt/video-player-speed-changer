// put everything in an imediately invoked function expression.
(function iife() {
	{
		// define the width of the 2 ranges
		const width = '300px'
		
		// ideally we watch the dom for updates... Hmmmm. yeah...
		// I wanted to add a range for the current time, but decided to not do it, because I have to add a lot of code to do this.
		
		// create the speed range
		const currentPlayBackRate = $('video').playbackRate
		const speedEls = createRange('speed', 0.1, 10, 0.02, currentPlayBackRate, width, function(val) {
			$('video').playbackRate = val
		})
		
		// create the volume range
		const currentVolume = $('video').volume
		const volumeEls = createRange('volume', 0, 1, 0.02, currentVolume, width, function(val) {
			$('video').volume = val
		})
		
		// delete an old containerEl
		const curContainerEl = $('.added-custom-range')
		if(curContainerEl != undefined) {
			curContainerEl.remove()
		}
		
		// create the container element, and append the range containers to them
		const containerEl = document.createElement('div')
		containerEl.classList.add('added-custom-range')
		containerEl.appendChild(volumeEls.div)
		containerEl.appendChild(speedEls.div)
		
		const pitchInput = document.createElement('input')
		pitchInput.type = 'checkbox'
		pitchInput.oninput = function() {
			$('video').preservesPitch = !this.checked
		}
		containerEl.appendChild(pitchInput)
		
		// append the container to the live DOM
		document.body.appendChild(containerEl)
		
		// set the style
		const sty = containerEl.style
		sty.position = 'fixed'
		sty.bottom = '0'
		sty.left = '0'
		sty.zIndex = '1000000'
		sty.color = 'white'
		sty.fontSize = '16px'
	}

	/**
	* Creates a range el, and a num el, and returns the surrounding div.
	* the inputs you supply are:
	*   - the min, max, step, start attribute for both the range and the number element
	*   - the width that the range will become
	*   - the function which will do the thing. this is the callback which happens once you set either value.
	* 
	* it will return you an object containing the 3 elements created, all being put inside of the div element.
	* the elements aren't appended to the dom yet, you're responsible for this.
	* 
	*/
	function createRange(labelText, min, max, step, start, rangeWidth, setValFn) {
		const divEl = document.createElement('div')
		
		// create the label el
		const spanEl = document.createElement('span')
		spanEl.textContent = labelText
		
		
		// create the range input
		const rangeEl = document.createElement('input')
		rangeEl.type = 'range'
		rangeEl.min = min
		rangeEl.max = max
		rangeEl.step = step
		rangeEl.value = start
		rangeEl.style.width = rangeWidth
		rangeEl.addEventListener('input', valChange.bind(rangeEl))
		
		
		// create the num input
		const numInputEl = document.createElement('input')
		numInputEl.type = 'number'
		numInputEl.min = min
		numInputEl.max = max
		numInputEl.step = step
		numInputEl.value = start
		numInputEl.addEventListener('input', valChange.bind(numInputEl))
		
		
		divEl.appendChild(spanEl)
		divEl.appendChild(rangeEl)
		divEl.appendChild(numInputEl)
		
		
		function valChange() {
			const val = Number(this.value)
			
			// reflect the change on the input els
			rangeEl.value = val
			numInputEl.value = val
			setValFn(val)
		}
		
		return {
			div: divEl,
			range: rangeEl,
			num: numInputEl
		}
	}
	
	// define selector fn
	function $(selector, startNode=document) {
		return startNode.querySelector(selector)
	}
})()
