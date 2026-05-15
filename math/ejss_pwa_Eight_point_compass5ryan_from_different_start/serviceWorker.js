const cacheName = 'Eight_point_compass5ryan_from_different_start';
const assets = [
'Eight_point_compass5ryan_from_different_start_Contents.xhtml',
'Eight_point_compass5ryan_from_different_start.xhtml',
'Eight_point_compass5ryan_from_different_start_Simulation.xhtml',
'assessment.json',
'1authorlookangphoto5050.png',
'compass_template/Picture1.png',
'MakeAssessment.py',
'compass_template/Screenshot 2023-02-18 at 2.59.27 PM.png',
'compass_template/Screenshot 2019-12-13 at 2.29.10 PM (2).png',
'compass_template/Picture2.png',
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