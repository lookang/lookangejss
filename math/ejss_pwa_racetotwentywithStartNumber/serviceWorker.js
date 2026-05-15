const cacheName = 'racetotwentywithStartNumber';
const assets = [
'racetotwentywithStartNumber_Contents.xhtml',
'racetotwentywithStartNumber.xhtml',
'racetotwentywithStartNumber_Simulation.xhtml',
'assessment.json',
'racetotwenty/Screen Shot 2017-12-14 at 1.11.32 PM.png',
'racetotwenty/Screen Shot 2017-07-06 at 3.58.55 PM.png',
'1authorlookangphoto5050.png',
'MakeAssessmentJson_21cc.py',
];
self.addEventListener('install', e => {								
	  e.waitUntil(														
	    caches.open(cacheName).then(cache => { 							
			// If 'TypeError: Request failed', review assets urls		
			console.log('Caching assets.');								
			return cache.addAll(assets); 								
		})																
	  );																
});																	

self.addEventListener('activate', e => {								
	  e.waitUntil(														
		caches.keys().then(keys => {									
			keys.forEach(key => {										
				if (key !== cacheName) 									
					return caches.delete(key);							
			});															
		})																
	  );																
});																	

self.addEventListener('fetch', e => {									
	  if (!e.request.url.match(location.origin)) return;				
	  e.respondWith( 													
		caches.open(cacheName).then(cache => {							
			return cache.match(e.request).then(res => {					
				if (res) {												
					console.log('Serving ' + res.url + ' from cache.');	
					return res;											
				}														
				// fetch missing resources and add to cache.			
				return fetch(e.request).then(fetchRes => {				
					cache.put(e.request, fetchRes.clone());				
					return fetchRes;									
				});														
			});															
		})																
	  );																
});																	