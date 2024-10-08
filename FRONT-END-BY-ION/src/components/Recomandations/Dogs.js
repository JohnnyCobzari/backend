import React, { useMemo, useState, useEffect } from "react";
import Fuse from "fuse.js";

const recommendations = [
	"Labrador Retriever",
	"French Bulldog",
	"German Shepherd",
	"Golden Retriever",
	"Bulldog",
	"Poodle",
	"Beagle",
	"Rottweiler",
	"German Shorthaired Pointer",
	"Dachshund",
	"Pembroke Welsh Corgi",
	"Australian Shepherd",
	"Yorkshire Terrier",
	"Boxer",
	"Great Dane",
	"Siberian Husky",
	"Cavalier King Charles Spaniel",
	"Doberman Pinscher",
	"Miniature Schnauzer",
	"Shih Tzu",
	"Boston Terrier",
	"Bernese Mountain Dog",
	"Pomeranian",
	"Havanese",
	"Cane Corso",
	"English Springer Spaniel",
	"Shetland Sheepdog",
	"Brittany",
	"Pug",
	"Cocker Spaniel",
	"Miniature American Shepherd",
	"Border Collie",
	"Mastiff",
	"Chihuahua",
	"Vizsla",
	"Basset Hound",
	"Belgian Malinois",
	"Maltese",
	"Weimaraner",
	"Collie",
	"Newfoundland",
	"Rhodesian Ridgeback",
	"Shiba Inu",
	"West Highland White Terrier",
	"Bichon Frise",
	"Bloodhound",
	"English Cocker Spaniel",
	"Akita",
	"Portuguese Water Dog",
	"Chesapeake Bay Retriever",
	"Dalmatian",
	"Saint Bernard",
	"Papillon",
	"Australian Cattle Dog",
	"Bullmastiff",
	"Samoyed",
	"Scottish Terrier",
	"Soft Coated Wheaten Terrier",
	"Whippet",
	"German Wirehaired Pointer",
	"Chinese Shar-Pei",
	"Airedale Terrier",
	"Wirehaired Pointing Griffon",
	"Bull Terrier",
	"Alaskan Malamute",
	"Cardigan Welsh Corgi",
	"Giant Schnauzer",
	"Old English Sheepdog",
	"Italian Greyhound",
	"Great Pyrenees",
	"Dogue de Bordeaux",
	"Russell Terrier",
	"Cairn Terrier",
	"Irish Wolfhound",
	"Irish Setter",
	"Greater Swiss Mountain Dog",
	"Miniature Pinscher",
	"Lhasa Apso",
	"Chinese Crested",
	"Coton de Tulear",
	"Staffordshire Bull Terrier",
	"American Staffordshire Terrier",
	"Rat Terrier",
	"Chow Chow",
	"Anatolian Shepherd",
	"Basenji",
	"Boykin Spaniel",
	"Lagotto Romagnolo",
	"Brussels Griffon",
	"Nova Scotia Duck Tolling Retriever",
	"Norwegian Elkhound",
	"Standard Schnauzer",
	"Dogo Argentino",
	"Bouvier des Flandres",
	"Pekingese",
	"Keeshond",
	"Border Terrier",
	"Leonberger",
	"Tibetan Terrier",
	"Neapolitan Mastiff",
	"English Setter",
	"Flat-Coated Retriever",
	"Borzoi",
	"Wire Fox Terrier",
	"Miniature Bull Terrier",
	"Belgian Tervuren",
	"Gordon Setter",
	"Silky Terrier",
	"Norwich Terrier",
	"Spinone Italiano",
	"Japanese Chin",
	"Welsh Terrier",
	"Toy Fox Terrier",
	"Schipperke",
	"Parson Russell Terrier",
	"Pointer",
	"Belgian Sheepdog",
	"Tibetan Spaniel",
	"American Eskimo Dog",
	"Irish Terrier",
	"Beauceron",
	"Afghan Hound",
	"Boerboel",
	"Smooth Fox Terrier",
	"Bearded Collie",
	"Black Russian Terrier",
	"Black and Tan Coonhound",
	"Welsh Springer Spaniel",
	"American Hairless Terrier",
	"Norfolk Terrier",
	"Xoloitzcuintli",
	"Manchester Terrier",
	"Kerry Blue Terrier",
	"Australian Terrier",
	"Clumber Spaniel",
	"Lakeland Terrier",
	"Bluetick Coonhound",
	"English Toy Spaniel",
	"German Pinscher",
	"Tibetan Mastiff",
	"Bedlington Terrier",
	"Greyhound",
	"Puli",
	"Saluki",
	"Barbet",
	"Redbone Coonhound",
	"Swedish Vallhund",
	"Sealyham Terrier",
	"Spanish Water Dog",
	"Briard",
	"Berger Picard",
	"Entlebucher Mountain Dog",
	"Treeing Walker Coonhound",
	"Icelandic Sheepdog",
	"Wirehaired Vizsla",
	"Pumi",
	"Portuguese Podengo Pequeno",
	"American Water Spaniel",
	"Curly-Coated Retriever",
	"Field Spaniel",
	"Löwchen",
	"Nederlandse Kooikerhondje",
	"Affenpinscher",
	"Petit Basset Griffon Vendeen",
	"Finnish Lapphund",
	"Scottish Deerhound",
	"Plott Hound",
	"Norwegian Buhund",
	"Glen of Imaal Terrier",
	"Irish Red and White Setter",
	"Ibizan Hound",
	"Sussex Spaniel",
	"Bergamasco Sheepdog",
	"Irish Water Spaniel",
	"Polish Lowland Sheepdog",
	"Otterhound",
	"Kuvasz",
	"Komondor",
	"Cirneco dell’Etna",
	"Pharaoh Hound",
	"Dandie Dinmont Terrier",
	"Pyrenean Shepherd",
	"Skye Terrier",
	"Canaan Dog",
	"American English Coonhound",
	"Chinook",
	"Finnish Spitz",
	"Grand Basset Griffon Vendeen",
	"Sloughi",
	"Harrier",
	"Cesky Terrier",
	"American Foxhound",
	"Azawakh",
	"English Foxhound",
	"Norwegian Lundehund",
];

const SearchLogic = ({ query, onResults }) => {
	const [results, setResults] = useState([]);

	// Initialize Fuse.js with the recommendations array
	const fuse = useMemo(
		() =>
			new Fuse(recommendations, {
				includeScore: true,
				threshold: 0.3, // Adjust the threshold as needed
			}),
		[]
	);

	useEffect(() => {
		if (query) {
			const result = fuse.search(query);

			setResults(result.map(({ item }) => item));
		} else {
			setResults([]);
		}
	}, [query, fuse]);

	useEffect(() => {
		onResults(results);
	}, [results, onResults]);

	return null; // This component doesn't render anything itself
};

export default SearchLogic;
