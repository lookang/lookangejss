document.addEventListener('DOMContentLoaded', () => {
    // --- Filter Elements ---
    const timeRangeSelect = document.getElementById('timeRange');
    const minMagnitudeSelect = document.getElementById('minMagnitude');
    const updateMapButton = document.getElementById('updateMap');
    const togglePlatesCheckbox = document.getElementById('togglePlates'); // Get checkbox
    const infoDiv = document.getElementById('info');

    // --- Map Initialization ---
    const mapCenter = [18, 98]; // Latitude, Longitude
    const initialZoom = 5;
    const map = L.map('map').setView(mapCenter, initialZoom);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Layer group for earthquake markers
    const earthquakeLayer = L.layerGroup().addTo(map);

    // --- Legend Control ---
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        const depths = [0, 70, 300];
        const colors = ['#d9534f', '#f0ad4e', '#5bc0de']; // Red, Orange, Blue
        const labels = ['Shallow (0-70 km)', 'Intermediate (70-300 km)', 'Deep (>300 km)'];

        div.innerHTML += '<strong>Depth Legend</strong><br>';
        // loop through our depth intervals and generate a label with a colored square for each interval
        for (let i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> <span>' +
                labels[i] + '</span><br>'; // Wrap label in span
        }
        return div;
    };

    legend.addTo(map);

    // --- Tectonic Plates Layer ---
    let platesLayer = null; // Variable to hold the layer
    const platesUrl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';
    const plateStyle = {
        color: "#ff7800", // Orange color for plate boundaries
        weight: 2,
        interactive: false // Make plates non-interactive
    };

    fetch(platesUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            platesLayer = L.geoJSON(data, { // Store the layer
                style: plateStyle
            });
            // Add layer initially if checkbox is checked
            if (togglePlatesCheckbox.checked && platesLayer) {
                platesLayer.addTo(map);
            }
            console.log("Tectonic plates layer loaded.");
        })
        .catch(error => {
            console.error('Error fetching or adding tectonic plates layer:', error);
        });

    // Event listener for the checkbox
    togglePlatesCheckbox.addEventListener('change', function() {
        if (this.checked && platesLayer) {
            map.addLayer(platesLayer);
            console.log("Plates layer added to map.");
        } else if (!this.checked && platesLayer) {
            map.removeLayer(platesLayer);
            console.log("Plates layer removed from map.");
        }
    });

    // --- Define Region Bounds ---
    const regionBounds = {
        minLat: 5,
        maxLat: 29,
        minLon: 92,
        maxLon: 106
    };

    // --- Nearby Cities Data & Display (Add only once) ---
    const nearbyCities = [
        { name: "Chiang Rai", lat: 19.9086, lon: 99.8325 },
        { name: "Chiang Mai", lat: 18.7877, lon: 98.9931 },
        { name: "Mae Hong Son", lat: 19.3019, lon: 97.9646 },
        // Add more cities if needed
    ];

    nearbyCities.forEach(city => {
        L.marker([city.lat, city.lon])
            .addTo(map) // Add directly to map, not the earthquake layer
            .bindPopup(`${city.name}`); // Simple popup for city name
    });

    // --- Event Listener for Update Button ---
    updateMapButton.addEventListener('click', fetchAndUpdateMap);

    // --- Core Function to Fetch and Update ---
    function fetchAndUpdateMap() {
        const timeRangeValue = timeRangeSelect.value; // e.g., "4.5_week"
        const minMagnitudeValue = parseFloat(minMagnitudeSelect.value); // e.g., 4.0
        const usgsBaseUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/';
        const usgsFeedUrl = `${usgsBaseUrl}${timeRangeValue}.geojson`;

        infoDiv.innerHTML = '<p>Loading earthquake data...</p>';
        earthquakeLayer.clearLayers(); // Clear previous earthquake markers

        console.log(`Fetching: ${usgsFeedUrl}, Min Mag Filter: ${minMagnitudeValue}`);

        fetch(usgsFeedUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched USGS Data:", data);
                displayEarthquakes(data, minMagnitudeValue);
            })
            .catch(error => {
                console.error('Error fetching or processing earthquake data:', error);
                infoDiv.innerHTML = `<p>Error loading earthquake data: ${error.message}. Please check the console.</p>`;
            });
    }

    // --- Function to Display Multiple Earthquakes ---
    function displayEarthquakes(geojsonData, minMagnitudeFilter) {
        let quakesDisplayed = 0;
        let latestQuakeTime = 0;
        let maxMagnitudeFound = -1;

        if (geojsonData.features && geojsonData.features.length > 0) {
            geojsonData.features.forEach(feature => {
                const coords = feature.geometry.coordinates; // [longitude, latitude, depth]
                const props = feature.properties;
                const latitude = coords[1];
                const longitude = coords[0];
                const magnitude = props.mag;

                // Check 1: Is it within the defined region bounds?
                if (latitude >= regionBounds.minLat && latitude <= regionBounds.maxLat &&
                    longitude >= regionBounds.minLon && longitude <= regionBounds.maxLon) {

                    // Check 2: Does it meet the minimum magnitude filter?
                    // (Handle potential null magnitude from USGS feed)
                    if (magnitude !== null && magnitude >= minMagnitudeFilter) {
                        addEarthquakeMarker(feature);
                        quakesDisplayed++;
                        if (props.time > latestQuakeTime) latestQuakeTime = props.time;
                        if (magnitude > maxMagnitudeFound) maxMagnitudeFound = magnitude;
                    }
                }
            });
        }

        // Update info div with summary
        if (quakesDisplayed > 0) {
            const latestTimeStr = new Date(latestQuakeTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
            infoDiv.innerHTML = `
                <p>Displayed <strong>${quakesDisplayed}</strong> earthquakes matching filters.</p>
                <p>Max magnitude found: <strong>${maxMagnitudeFound.toFixed(1)}</strong></p>
                <p>Most recent event time: <strong>${latestTimeStr}</strong></p>
                <p><i>Click circles on map for details. Nearby cities shown with standard markers.</i></p>
                 <p><small><i>Note: Displaying nearby cities does not imply confirmed damage reports for those specific locations from these events.</i></small></p>
                 `;
        } else {
            infoDiv.innerHTML = '<p>No earthquakes found matching the selected filters and region.</p>';
        }
        console.log(`Displayed ${quakesDisplayed} earthquakes.`);
    }

    // --- Function to Add a Single Earthquake Marker ---
    function addEarthquakeMarker(quakeFeature) {
        const props = quakeFeature.properties;
        const coords = quakeFeature.geometry.coordinates;
        const latitude = coords[1];
        const longitude = coords[0];
        const depth = coords[2];
        const magnitude = props.mag;
        const place = props.place;
        const time = new Date(props.time).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

        // Determine color based on depth
        let depthColor;
        if (depth < 70) {
            depthColor = '#d9534f'; // Red - Shallow
        } else if (depth < 300) {
            depthColor = '#f0ad4e'; // Orange - Intermediate
        } else {
            depthColor = '#5bc0de'; // Blue - Deep
        }

        const marker = L.circleMarker([latitude, longitude], {
            radius: Math.max(magnitude * 1.5, 3), // Size based on magnitude
            fillColor: depthColor, // Color based on depth
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7
        }).addTo(earthquakeLayer); // Add to the specific layer group

        const popupContent = `
            <strong>Magnitude:</strong> ${magnitude}<br>
            <strong>Location:</strong> ${place}<br>
            <strong>Time:</strong> ${time}<br>
            <strong>Depth:</strong> ${depth.toFixed(1)} km<br>
            <strong>Coordinates:</strong> ${latitude.toFixed(4)}, ${longitude.toFixed(4)}<br>
            <a href="${props.url}" target="_blank">More Details (USGS)</a>
        `;
        marker.bindPopup(popupContent);
    }

    // Optional: Trigger initial load with default filters?
    // fetchAndUpdateMap(); // Uncomment this line if you want data loaded on page load
});
