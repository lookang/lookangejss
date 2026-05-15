if ('serviceWorker' in navigator) {									
  window.addEventListener('load', function() {						
	if('serviceWorker' in navigator) {									
       navigator.serviceWorker										
        .register('./serviceWorker.js')								
        .then(res => console.log('worker registered'))				
        .catch(err => console.log('worker not registered', err));		
	}																	
  });																	
}																		