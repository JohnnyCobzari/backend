import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";

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
	const mapContainerRef = useRef(null);
	const lngRef = useRef(null);
	const latRef = useRef(null);
	const zoomRef = useRef(null);
	const markersRef = useRef([]);
	const navigate = useNavigate();
	const [hoveredPet, setHoveredPet] = useState(null); // Stare pentru pet-ul hoverat
	const [activePopup, setActivePopup] = useState(null);

	const createCustomMarker = (type) => {
		const el = document.createElement("div");
		el.className = "marker-icon";
		switch (type) {
			case "Veterinarian":
				el.style.backgroundImage = "url(/icons/vet.png)";
				break;
			case "Pet Shop":
				el.style.backgroundImage = "url(/icons/pet-shops.png)";
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

	// Funcție pentru gruparea animalelor după coordonate
	const groupPetsByCoordinates = () => {
		const groupedPets = {};
		pets.forEach((pet) => {
		  const coords = `${pet.latitude},${pet.longitude}`;
		  if (!groupedPets[coords]) {
			groupedPets[coords] = [];
		  }
		  groupedPets[coords].push(pet);
		});
	
		return groupedPets;
	  };

	  const handlePetClick = (petId) => {
		navigate(`/ProfilePage/${petId}`);
	  };

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [28.8336, 47.0105],
			zoom: 12,
			attributionControl: false, // Dezactivează logo-ul Mapbox din colț
			logoPosition: 'bottom-left',
		});

		map.removeControl(new mapboxgl.NavigationControl(), 'bottom-right');

		const displayMarkers = () => {
			const groupedPets = groupPetsByCoordinates();
	  
			// Iterăm prin fiecare grup de animale de companie
			Object.entries(groupedPets).forEach(([coords, petsAtLocation]) => {
			  const [latitude, longitude] = coords.split(",").map(Number);
			  
			  if (latitude && longitude) {
				// Popup pentru lista de animale
				const popupContent = petsAtLocation.map(pet => `
			    <div 
			  style="display: flex; align-items: center; cursor: pointer;" 
			  class="pet-popup-item" 
			  data-pet-id="${pet._id}">
			  <img 
				src="${pet.image}" 
				alt="${pet.name}" 
				style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;" 
			  />
			  <div>
				<p>${pet.petName}</p>
				<p><small>${pet.breed}</small></p>
			  </div>
		  </div>
		`).join('');
	  
				const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);
	  
				const markerElements = createCustomMarkers(petsAtLocation[0].image, petsAtLocation[0].petName, petsAtLocation[0].breed);
				const marker = new mapboxgl.Marker({ element: markerElements })
				  .setLngLat([longitude, latitude])
				  .setPopup(popup)
				  .addTo(map);
	  
				// Eveniment pentru clic pe popup
		marker.getElement().addEventListener("click", () => {
			popup.on('open', () => {
			  // Selectăm toate elementele din popup-ul deschis
			  const petItems = document.querySelectorAll(".pet-popup-item");
			  petItems.forEach(item => {
				item.addEventListener("click", (e) => {
				  const petId = e.currentTarget.getAttribute("data-pet-id");
				  navigate(`/ProfilePage/${petId}`); // Navigăm către profilul animalului de companie
				});
			  });
			});
		  });
		}
	  });
  };

        map.on('load', () => {

			
			const layers = map.getStyle().layers;
			layers.forEach((layer) => {
				console.log(layer.id); // Verificăm toate straturile disponibile
			});
			const bisqueColor = '#ffe4c4'; // Set bisque color
			const peruColor = '#cd853f' //peru color
			const layersToStyle = [
				'landuse',         // Posibil strat pentru landuse (terenuri)
				'landuse-park',    // Parcuri
			
				'landscape',       // Peisaj general
				'landscape-natural', // Natural features (păduri, munți)
				'park',            // Straturi pentru parcuri
			];

			const layersToStyle2 = [
		
				'landuse-park',    // Parcuri
				'landuse-forest',  // Păduri
				'landscape',       // Peisaj general
				'landscape-natural', // Natural features (păduri, munți)
				'park',            // Straturi pentru parcuri
			];

			layersToStyle.forEach(layer => {
				if (map.getLayer(layer)) {
					map.setPaintProperty(layer, 'fill-color', bisqueColor);
				}
			});
			
			layersToStyle2.forEach(layer => {
				if (map.getLayer(layer)) {
					map.setPaintProperty(layer, 'fill-color', peruColor);
				}
			});
			
				


            // Dezactivează straturile de etichete
            const layersToHide = [
				'road-label',        // Etichetele drumurilor (străzi, rute etc.)
				'place-label',       // Denumirile localităților
				'poi-label',         // Denumirile punctelor de interes (POI)
				'transit-label',     // Denumirile stațiilor de transport în comun
				'waterway-label',    // Denumirile cursurilor de apă
				'admin-label',       // Denumirile sectoarelor/zonelor administrative
				'road-number-shield',// Numere de drumuri sau indicatoare (de exemplu R1, R6 etc.)
				'place-neighbourhood', // Nume de cartiere și sectoare (de ex. Sectorul Ciocana)
				'place-suburb',      // Suburbii sau mici localități
				'place-city',        // Nume de orașe (precum Chișinău)
				'road-motorway-shield', // Indicative pentru autostrăzi sau drumuri mari
				'aerialway',
				'road-label',
				'road-number-shield',
				'road-exit-shield',
				'state-label',
				'country-label',
				'continent-label',
			//	'admin-0-boundary',     // International boundaries (may contain labels)
        		'admin-1-boundary',     // National/subnational boundaries
        	//	'admin-0-boundary-bg',  // Background for international boundaries
        		'admin-1-boundary-bg',
				'admin-o-boundary-disputed',
				'settlement-major-label', // Major settlements (cities)
        		'settlement-minor-label', // Minor settlements (villages, towns)
        		'settlement-subdivision-label',
				'road-pedestrian',      // Pedestrian streets (adjust this based on actual layer name)
				'road-path',            // Walking paths
				'road-pedestrian-label',
				'road-pedestrian-polygon-pattern',
				'road-pedestrian-polygon-fill',
				'crosswalks',
				'road-street-case',
				'road-minor-case',
				'road-intersection',
				'building-number-label',
				'block-number-label',
				'ferry-auto',
				'ferry',
				'road-steps-bg',
				'road-pedestrian-case',
				'road-construction',
				'crosswalks',
				'water-line-label',
				'waterway-label',
				'water-point-label',
			];
            layersToHide.forEach((layer) => {
                if (map.getLayer(layer)) {
                    map.setLayoutProperty(layer, 'visibility', 'none');
                }
            });
        });


		pets.forEach((pet) => {
            //console.log(pet)
			const coords = `${pet.latitude},${pet.longitude}`;
			
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
			
		});

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const userLat = position.coords.latitude;
					const userLng = position.coords.longitude;
					map.setCenter([userLng, userLat]);
				},
				(error) => {
					console.error("Error getting location:", error);
					alert("Unable to retrieve your location. Please ensure location services are enabled.");
				}
			);
		} else {
			alert("Geolocation is not supported by your browser.");
		}

		displayMarkers();
		updateMarkers();

		return () => map.remove();
	}, [pets, navigate]);

	return (
    <div id="MapBox-BigContainer">
      <div ref={mapContainerRef} className="map-container">
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
