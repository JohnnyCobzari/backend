document.addEventListener('DOMContentLoaded', () => {
    getCurrentLocation();  // Automatically get current location when the page loads
});

let currentLatitude = null;
let currentLongitude = null;
let currentCountry = null;

// Function to get coordinates from an address using Mapbox Geocoding API
async function getCoordinates() {
    const accessToken = 'pk.eyJ1IjoiY29zbWFrLTQ3IiwiYSI6ImNtMHhoczZsejA3ZjgyanF6YWpzMDV4cDAifQ.LiwxPafEUZs60SWhAMCpdg'; // Replace with your actual access token
    const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    let address = document.getElementById('address').value; // Get address from input field

    if (!address) {
        alert('Please enter an address.');
        return;
    }

    // Automatically add the current country if not present in the address
    if (currentCountry && !address.includes(currentCountry)) {
        address += `, ${currentCountry}`;
    }

    try {
        // Use proximity to prioritize results near the current location
        const proximityParam = currentLatitude && currentLongitude ? `&proximity=${currentLongitude},${currentLatitude}` : '';
        const response = await fetch(`${baseUrl}${encodeURIComponent(address)}.json?access_token=${accessToken}${proximityParam}`);
        
        if (!response.ok) {
            console.error('Response Error:', response);
            throw new Error(`Failed to fetch coordinates: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.features.length === 0) {
            throw new Error('No coordinates found for this address');
        }

        const coordinates = data.features[0].geometry.coordinates; // [longitude, latitude]
        document.getElementById('result').textContent = `Latitude: ${coordinates[1]}, Longitude: ${coordinates[0]}`;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        document.getElementById('result').textContent = `Error fetching coordinates: ${error.message}`;
    }
}

// Function to get the current location of the device
function getCurrentLocation() {
    // Check if the Geolocation API is supported
    if (navigator.geolocation) {
        // Request the current position
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                currentLatitude = position.coords.latitude;
                currentLongitude = position.coords.longitude;

                console.log(`Current Location: Latitude: ${currentLatitude}, Longitude: ${currentLongitude}`);
                document.getElementById('result').textContent = `Current Location: Latitude: ${currentLatitude}, Longitude: ${currentLongitude}`;

                // Reverse geocode to get the current country
                await getCurrentCountry();
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to retrieve your location. Please ensure location services are enabled.');
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
        alert('Geolocation is not supported by your browser.');
    }
}

// Function to get the current country using reverse geocoding
async function getCurrentCountry() {
    const accessToken = 'pk.eyJ1IjoiY29zbWFrLTQ3IiwiYSI6ImNtMHhoczZsejA3ZjgyanF6YWpzMDV4cDAifQ.LiwxPafEUZs60SWhAMCpdg'; // Replace with your actual access token
    const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    
    try {
        const response = await fetch(`${baseUrl}${currentLongitude},${currentLatitude}.json?access_token=${accessToken}&types=country`);
        if (!response.ok) {
            console.error('Response Error:', response);
            throw new Error(`Failed to fetch country: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.features.length > 0) {
            currentCountry = data.features[0].place_name; // Get the country name
            console.log(`Detected Country: ${currentCountry}`);
        } else {
            throw new Error('No country found for the current location.');
        }
    } catch (error) {
        console.error('Error fetching country:', error);
        document.getElementById('result').textContent = `Error fetching country: ${error.message}`;
    }
}
