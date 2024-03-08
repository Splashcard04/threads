    	const button = document.getElementById('submit')
        const image = document.getElementById('image')
        const input = document.getElementById('input')
        const loading = document.getElementById('loading')
        const p = document.getElementById('create')
        
        button.addEventListener('click', function() {
        	if(input.value == '' | ' ') {
            	alert('please enter a URL')
                return
            }
        	if(input.value.indexOf('https://') == -1) {
            	alert('please enter a valid URL')
                return
            }
            
            loading.innerHTML = 'Result Loading...'
            
            image.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`
            
            
            
            setTimeout(() => {
            	loading.innerHTML = ''
                p.innerHTML = `Generate Another >`
            }, 900)
            
            
            
        })
