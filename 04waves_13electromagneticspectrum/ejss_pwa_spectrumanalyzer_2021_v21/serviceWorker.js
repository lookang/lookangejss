const cacheName = 'spectrumanalyzer_2021_v21';
const assets = [
'spectrumanalyzer_2021_v21_Contents.xhtml',
'spectrumanalyzer_2021_v21.xhtml',
'Handphone Spectrometer.html',
'spectrumanalyzer_2021_v21_Simulation.xhtml',
'01authorleongtzekwang.png',
'datalogger/ruler.png',
'1authorlookangphoto5050.png',
'datalogger/folder.png',
'datalogger/filemanagerbyleongster.jpeg',
'datalogger/WhatsApp Image 2019-04-16 at 1.28.45 PM.png',
'datalogger/neon.jpeg',
'datalogger/mercury.jpeg',
'datalogger/camera-swtich-drawnby-leongster.jpeg',
'datalogger/flu_spectrum.png',
'datalogger/Screen Shot 2017-10-13 at 4.26.48 PM.png',
'datalogger/heliumold.jpeg',
'datalogger/restart.png',
'datalogger/neonold.jpeg',
'datalogger/smartphone edulab 3d printer spectrometer 1mmgap.stl',
'datalogger/IMG-20180914-WA0015.png',
'datalogger/favicon.png',
'datalogger/WhatsApp Image 2019-04-16 at 1.28.45 PM copy.jpg',
'datalogger/fluorescent.jpeg',
'datalogger/Screenshot 2021-05-16 at 6.17.23 PM (2).png',
'datalogger/helium.jpeg',
'datalogger/hydrogen.jpeg',
'datalogger/image.base64',
'datalogger/Anonymous_Pill_Button_Cyan.png',
'datalogger/example.png',
'Handphone Spectrometer.html',
'01authorFelix_J_Garcia_Clemente.png',
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