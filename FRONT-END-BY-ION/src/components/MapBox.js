import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ueWlka2siLCJhIjoiY20wbWZqM3ZsMDF0MzJzc2JoN2pmMGpxeSJ9.YsuGCrjUvQVDNqMM-n14bg';

const locations = [
    { name: 'Vet Clinic "Nicoleta Lux"', type: 'Veterinarian', coordinates: [28.848006560444432, 47.04577197844606] },
    { name: 'Vet Pharmacy "Nicoleta Lux"', type: 'Veterinarian', coordinates: [28.830326863280124, 47.01747724213654] },
    { name: 'Vet Pharmacy', type: 'Veterinarian', coordinates: [28.780102397299974, 47.02954706729542] },
    { name: 'Vet Clinic "Nicoleta Lux"', type: 'Veterinarian', coordinates: [28.830322596029887, 47.01748528599031] },
    { name: 'Pet Shop', type: 'Pet Shop', coordinates: [28.778997346183186, 47.03111022566327] },
    { name: 'Zoo', type: 'Pet Shop', coordinates: [28.85911096985874, 47.04426874781966] },
    { name: 'Planeta ZOO K9', type: 'Pet Shop', coordinates: [28.86271048994743, 47.04983646460499] },
    { name: 'Murchik Pet Market', type: 'Pet Shop', coordinates: [28.871974656825888, 47.054171748406304] },
    { name: 'Murchik Pet Market Jumbo', type: 'Pet Shop', coordinates: [28.86079709252045, 47.00450679140682] },
    { name: 'Pet House', type: 'Grooming', coordinates: [28.838577593682864, 47.03047993151489] },
    { name: 'Hotel Radisson Blu Leogrand', type: 'Pet Hotel', coordinates: [28.836521554962687, 47.02395865725578] },
    { name: 'City Park Hotel', type: 'Pet Hotel', coordinates: [28.836544124869, 47.02727347196137] },
    { name: 'Hotel Diplomat Club', type: 'Pet Hotel', coordinates: [28.822975670083377, 47.01240999881395] },
    { name: 'Shadow Hotel', type: 'Pet Hotel', coordinates: [28.850135932529522, 47.03524991313651] },
    { name: 'Farmacie Veterinara Proneros', type: 'Veterinarian', coordinates: [28.619373, 47.153004] },
    { name: 'Farmacie Veterinara', type: 'Veterinarian', coordinates: [28.617119276009248, 47.14834894044488] },


];

const App = () => {
    const mapContainerRef = useRef(null);
    const lngRef = useRef(null);
    const latRef = useRef(null);
    const zoomRef = useRef(null);
    const markersRef = useRef([]);

    const createCustomMarker = (type) => {
        const el = document.createElement('div');
        el.className = 'marker-icon';
        switch (type) {
            case 'Veterinarian':
                el.style.backgroundImage = 'url(/icons/vet.png)';
                break;
            case 'Pet Shop':
                el.style.backgroundImage = 'url(/icons/pet-shops.webp)';
                break;
            case 'Pet Hotel':
                el.style.backgroundImage = 'url(/icons/hotel.png)';
                break;
            case 'Grooming':
                el.style.backgroundImage = 'url(/icons/grooming.png)';
                break;
            default:
                el.style.backgroundImage = 'url(/icons/default-icon.png)';
                break;
        }
        return el;
    };

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [28.8336, 47.0105],
            zoom: 12
        });

        const updateMarkers = () => {
            markersRef.current.forEach(marker => marker.remove());
            markersRef.current = [];

            if (map.getZoom() <= 8) return;

            locations.forEach(location => {
                const markerElement = createCustomMarker(location.type);
                const marker = new mapboxgl.Marker({ element: markerElement })
                    .setLngLat(location.coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 })
                            .setHTML(`<h3>${location.name}</h3><p>${location.type}</p>`)
                    )
                    .addTo(map);
                markersRef.current.push(marker);
            });
        };

        map.on('zoomend', updateMarkers);
        map.on('move', () => {
            lngRef.current.textContent = map.getCenter().lng.toFixed(4);
            latRef.current.textContent = map.getCenter().lat.toFixed(4);
            zoomRef.current.textContent = map.getZoom().toFixed(2);
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    map.setCenter([userLng, userLat]);
                    latRef.current.textContent = userLat.toFixed(4);
                    lngRef.current.textContent = userLng.toFixed(4);
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

        updateMarkers();

        return () => map.remove();
    }, []);

    return (
        <div id='MapBox-BigContainer'>
            <div className='MapBoxSidebar'>
                Longitude: <span ref={lngRef}>28.8336</span> | Latitude: <span ref={latRef}>47.0105</span> | Zoom: <span ref={zoomRef}>12</span>
            </div>
            <div ref={mapContainerRef} className='map-container' />
        </div>
    );
};

export default App;
