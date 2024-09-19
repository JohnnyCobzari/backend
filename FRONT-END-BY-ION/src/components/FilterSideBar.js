import React, { useState } from "react";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import "../styles/FilterSideBar.css";
import { FaSearch } from "react-icons/fa";

const FilterSidebar = ({ applyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [breed, setBreed] = useState("");
  const [priceRange, setPriceRange] = useState({ from: "", to: "", currency: "€" });
  const [selectedGenders, setSelectedGenders] = useState([]);

  const petTypes = ["Dog", "Cat", "Bird", "Fish", "Hamster", "Rabbit", "Turtle", "Guinea Pig", "Ferret", "Lizard"];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSection = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleTypeChange = (pet) => {
    setSelectedTypes((prev) =>
      prev.includes(pet) ? prev.filter((type) => type !== pet) : [...prev, pet]
    );
  };

  const handleGenderChange = (gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const applyFiltersHandler = () => {
    const filters = {
      types: selectedTypes,
      breed,
      priceRange,
      genders: selectedGenders,
    };
    applyFilters(filters); // Call the parent function with the selected filters
    toggleSidebar(); // Close the sidebar after applying filters
  };

	return (
		<div className="sidebar-container_Filter_Side_Bar">
			<button className="filter-button_Filter_Side_Bar" onClick={toggleSidebar}>
				<FiFilter size={28} />
			</button>
			<div className={`sidebar_Filter_Side_Bar ${isOpen ? "open_Filter_Side_Bar" : ""}`}>
				<button className="close-button_Filter_Side_Bar" onClick={toggleSidebar}>
					<FiX size={28} />
				</button>

				<div className="Content_FilterSideBar">
					{/* Filter Section for Type */}
					<div className="filter-section">
						<p className="WritingFromFilterBar" onClick={() => toggleSection("type")}>
							Type
							<FiChevronDown className={`arrow-icon ${expanded.type ? "rotate" : ""}`} size={20} />
						</p>
						{expanded.type && (
							<div className="filter-options">
								{petTypes.map((pet, index) => (
									<label key={index}>
										<input
											type="checkbox"
											checked={selectedTypes.includes(pet)}
											onChange={() => handleTypeChange(pet)}
										/>
										{pet}
									</label>
								))}
							</div>
						)}
					</div>

					{/* Filter Section for Breed */}
					<div className="filter-section">
						<p className="WritingFromFilterBar" onClick={() => toggleSection("breed")}>
							Breed
							<FiChevronDown className={`arrow-icon ${expanded.breed ? "rotate" : ""}`} size={20} />
						</p>
						{expanded.breed && (
							<div className="filter-options">
								<input
									className="FilterSideBarInput"
									placeholder="Type in breed"
									value={breed}
									onChange={(e) => setBreed(e.target.value)}
								/>
								<FaSearch size={14} className="search-icon" />
							</div>
						)}
					</div>

					{/* Filter Section for Price */}
					<div className="filter-section">
						<p className="WritingFromFilterBar" onClick={() => toggleSection("price")}>
							Price
							<FiChevronDown className={`arrow-icon ${expanded.price ? "rotate" : ""}`} size={20} />
						</p>
						{expanded.price && (
							<div className="range-input-container">
								<input
									type="text"
									placeholder="From"
									className="range-input"
									value={priceRange.from}
									onChange={(e) =>
										setPriceRange((prev) => ({ ...prev, from: e.target.value }))
									}
								/>
								<input
									type="text"
									placeholder="To"
									className="range-input"
									value={priceRange.to}
									onChange={(e) =>
										setPriceRange((prev) => ({ ...prev, to: e.target.value }))
									}
								/>
								<select
									className="currency-select"
									value={priceRange.currency}
									onChange={(e) =>
										setPriceRange((prev) => ({ ...prev, currency: e.target.value }))
									}
								>
									<option value="€">€</option>
									<option value="$">$</option>
									<option value="£">£</option>
								</select>
							</div>
						)}
					</div>

					{/* Filter Section for Gender */}
					<div className="filter-section">
						<p className="WritingFromFilterBar" onClick={() => toggleSection("gender")}>
							Gender
							<FiChevronDown className={`arrow-icon ${expanded.gender ? "rotate" : ""}`} size={20} />
						</p>
						{expanded.gender && (
							<div className="filter-options">
								<label>
									<input
										type="checkbox"
										checked={selectedGenders.includes("Male")}
										onChange={() => handleGenderChange("Male")}
									/>
									Male
								</label>
								<label>
									<input
										type="checkbox"
										checked={selectedGenders.includes("Female")}
										onChange={() => handleGenderChange("Female")}
									/>
									Female
								</label>
							</div>
						)}
					</div>
				</div>

				{/* Apply Filters Button */}
				<button className="apply-filters" onClick={applyFiltersHandler}>
					Apply Filters
				</button>
			</div>
		</div>
	);
};

export default FilterSidebar;
