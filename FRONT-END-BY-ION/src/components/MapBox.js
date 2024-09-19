import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import FilterSidebar from "./FilterSideBar";

mapboxgl.accessToken = "pk.eyJ1Ijoiam9ueWlka2siLCJhIjoiY20wbWZqM3ZsMDF0MzJzc2JoN2pmMGpxeSJ9.YsuGCrjUvQVDNqMM-n14bg";

const locations = [
	{ name: 'Vet Clinic "Nicoleta Lux"', type: "Veterinarian", coordinates: [28.848006560444432, 47.04577197844606] },
	{ name: 'Vet Pharmacy "Nicoleta Lux"', type: "Veterinarian", coordinates: [28.830326863280124, 47.01747724213654] },
	{ name: "Vet Pharmacy", type: "Veterinarian", coordinates: [28.780102397299974, 47.02954706729542] },
	{ name: "Pet Shop", type: "Pet Shop", coordinates: [28.778997346183186, 47.03111022566327] },
	{ name: "Zoo", type: "Pet Shop", coordinates: [28.85911096985874, 47.04426874781966] },
	{ name: "Planeta ZOO K9", type: "Pet Shop", coordinates: [28.86271048994743, 47.04983646460499] },
	{ name: "Murchik Pet Market", type: "Pet Shop", coordinates: [28.871974656825888, 47.054171748406304] },
	{ name: "Murchik Pet Market Jumbo", type: "Pet Shop", coordinates: [28.86079709252045, 47.00450679140682] },
	{ name: "Pet House", type: "Grooming", coordinates: [28.838577593682864, 47.03047993151489] },
	{ name: "Hotel Radisson Blu Leogrand", type: "Pet Hotel", coordinates: [28.836521554962687, 47.02395865725578] },
	{ name: "City Park Hotel", type: "Pet Hotel", coordinates: [28.836544124869, 47.02727347196137] },
	{ name: "Hotel Diplomat Club", type: "Pet Hotel", coordinates: [28.822975670083377, 47.01240999881395] },
	{ name: "Shadow Hotel", type: "Pet Hotel", coordinates: [28.850135932529522, 47.03524991313651] },
	{ name: "Farmacie Veterinara Proneros", type: "Veterinarian", coordinates: [28.619373, 47.153004] },
	{ name: "Farmacie Veterinara", type: "Veterinarian", coordinates: [28.617119276009248, 47.14834894044488] },
];

const Mapbox = ({ pets }) => {
    const [filteredPets, setFilteredPets] = useState(pets);
	const mapContainerRef = useRef(null);
	const lngRef = useRef(null);
	const latRef = useRef(null);
	const zoomRef = useRef(null);
	const markersRef = useRef([]);
	const navigate = useNavigate();
	const [hoveredPet, setHoveredPet] = useState(null); 
    
    const applyFilters = (filters) => {
        const { types, breed, priceRange, genders } = filters;
      
        // Filter pets based on selected filters, but ignore filters with default values
        const filtered = pets.filter(pet => {
          const matchesType = types.length === 0 || types.includes(pet.type); // Only apply if some types are selected
          const matchesBreed = breed === "" || pet.breed.toLowerCase().includes(breed.toLowerCase()); // Only apply if breed is not empty
          const matchesGender = genders.length === 0 || genders.includes(pet.gender); // Only apply if some genders are selected
          const matchesPrice = 
            (priceRange.from === "" || pet.price >= parseFloat(priceRange.from)) && // Only apply if from price is specified
            (priceRange.to === "" || pet.price <= parseFloat(priceRange.to));       // Only apply if to price is specified
      
          return matchesType && matchesBreed && matchesGender && matchesPrice;
        });
      
        setFilteredPets(filtered); // Update filtered pets
    };
      
      

	const createCustomMarker = (type) => {
		const el = document.createElement("div");
		el.className = "marker-icon";
		switch (type) {
			case "Veterinarian":
				el.style.backgroundImage = "url(/icons/vet.png)";
				break;
			case "Pet Shop":
				el.style.backgroundImage = "url(/icons/pet-shops.webp)";
				break;
			case "Pet Hotel":
				el.style.backgroundImage = "url(/icons/hotel.png)";
				break;
			case "Grooming":
				el.style.backgroundImage = "url(/icons/grooming.png)";
				break;
			default:
				el.style.backgroundImage = "url(/icons/default-icon.png)";
				break;
		}
		return el;
	};

	const createCustomMarkers = (image, petName, breed) => {
		const el = document.createElement("div");
		el.className = "marker-icon";
		el.style.width = "30px"; // Dimensiuni pentru marker
		el.style.height = "30px";
		el.style.backgroundSize = "cover"; // Imaginea să fie redimensionată corect
		el.style.borderRadius = "50%"; // Marker rotund
		el.style.backgroundImage = `url(${image})`; // Afișarea imaginii

		// Evenimente pentru hover
		el.addEventListener("mouseenter", () => {
			setHoveredPet({ name: petName, image: image, breed: breed }); // Setăm pet-ul curent când mouse-ul este pe marker
		});
		el.addEventListener("mouseleave", () => {
			setHoveredPet(null); // Resetăm pet-ul curent când mouse-ul pleacă de pe marker
		});

		return el;
	};

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [28.8336, 47.0105],
			zoom: 12,
		});

		filteredPets.forEach((pet) => {
            //console.log(pet)
			if (pet.latitude && pet.longitude && pet.image) {
				const popupText = pet.name || "Pet"; // Dacă numele nu există, fallback la "Pet"
				const popup = new mapboxgl.Popup({ offset: 25 }).setText(pet.petName);

				const markerElements = createCustomMarkers(pet.image, pet.petName, pet.breed); // Imaginea animalului de companie
				const marker = new mapboxgl.Marker({ element: markerElements }).setLngLat([pet.longitude, pet.latitude]).setPopup(popup).addTo(map);

				marker.getElement().addEventListener("click", () => {
					navigate(`/ProfilePage/${pet._id}`);
				});
			}
		});

		const updateMarkers = () => {
			markersRef.current.forEach((marker) => marker.remove());
			markersRef.current = [];

			if (map.getZoom() <= 8) return;

			locations.forEach((location) => {
				const markerElement = createCustomMarker(location.type);
				markerElement.className = "marker-icon";
				const marker = new mapboxgl.Marker({ element: markerElement })
					.setLngLat(location.coordinates)
					.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${location.name}</h3><p>${location.type}</p>`))
					.addTo(map);
				markersRef.current.push(marker);
			});
		};

		map.on("zoomend", updateMarkers);
		map.on("move", () => {
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
					console.error("Error getting location:", error);
					alert("Unable to retrieve your location. Please ensure location services are enabled.");
				}
			);
		} else {
			alert("Geolocation is not supported by your browser.");
		}

		updateMarkers();

		return () => map.remove();
	}, [filteredPets]);





	return (
		<div id="MapBox-BigContainer">
			<div className="MapBoxSidebar">
				Longitude: <span ref={lngRef}>28.8336</span> | Latitude: <span ref={latRef}>47.0105</span> | Zoom: <span ref={zoomRef}>12</span>
			</div>
			<div ref={mapContainerRef} className="map-container">
            <FilterSidebar applyFilters={applyFilters} />
				{hoveredPet && (
					<div className="HoverEfetForPetsOnTheMap">
						<img
							src={hoveredPet.image}
							alt={hoveredPet.name}
							style={{
								width: "60px",
								height: "60px",
								borderRadius: "50%",
								objectFit: "cover",
							}}
						/>
                        <span>{hoveredPet.breed}</span>
						<span>{hoveredPet.name}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Mapbox;
