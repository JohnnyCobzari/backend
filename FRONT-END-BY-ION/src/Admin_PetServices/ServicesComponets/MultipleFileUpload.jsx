import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa'; // Importăm o iconiță de cameră
import myString from '../../components/DefaultImage';

const MultipleImageUpload = ({ onImagesUpload }) => {
  const [fileNames, setFileNames] = useState([]); // Stocăm numele fișierelor selectate
  const [selectedImages, setSelectedImages] = useState([]); // Stocăm imaginile selectate

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = []; // Un array pentru a stoca imaginile noi

    if (files.length) {
      let imagesRead = 0; // Contor pentru a verifica când toate imaginile au fost citite
      const newFileNames = files.map(file => file.name);
      setFileNames(prevFileNames => [...prevFileNames, ...newFileNames]);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Image = event.target.result;
          newImages.push(base64Image); // Adaugă imaginea codată în array-ul newImages
          imagesRead++;

          // Verifică dacă toate imaginile au fost citite
          if (imagesRead === files.length) {
            setSelectedImages((prevImages) => [...prevImages, ...newImages]);
            onImagesUpload([...selectedImages, ...newImages]); // Trimite toate imaginile într-un singur array
          }
        };
        reader.readAsDataURL(file); // Citim fișierul ca URL de tip Data URL
      });
    }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center', // Centrarea pe verticală
  };

  const labelStyle = {
    margin: '10px 0 15px 0',
    padding: '6px 25px',
    fontSize: '14px',
    fontWeight: '400',
    color: '#fff', // Culoare text albă pentru buton
    backgroundColor: '#6b5e49',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px', // Spațiu între buton și textul fișierului
    display: 'flex',
    alignItems: 'center', // Centrarea pe verticală
  };

  const inputStyle = {
    display: 'none', // Ascundem input-ul original
  };

  const fileNameStyle = {
    color: '#6b5e49', // Aceeași culoare ca butonul
    fontWeight: '400',
    marginLeft: '10px', // Adaugă spațiu între buton și numele fișierului
  };

  const imageContainerStyle = {
    marginLeft: '0px', // Spațiu între buton și imaginea selectată
  };

  const h3Style = {
    color: '#6b5e49', // Culoare personalizată pentru h3
  };

  return (
    <div>
      <div style={containerStyle}>
        <label htmlFor="image-upload" style={labelStyle}>
          <FaCamera style={{ marginRight: '10px' }} /> {/* Iconița de cameră */}
          Choose Images
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          style={inputStyle}
          onChange={handleImageChange}
        />
        {/* Afișăm numele fișierelor selectate */}
        {fileNames.length > 0 && fileNames.map((name, index) => (
          <p key={index} style={fileNameStyle}>{name}</p>
        ))}
      </div>

      {/* Imaginile selectate vor fi afișate mai jos */}
      {selectedImages.length > 0 && (
        <div style={imageContainerStyle}>
          <h3 style={h3Style}>Selected Images:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {selectedImages.map((image, index) => (
              <img key={index} src={image} alt={`Uploaded ${index}`} style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover', marginRight: '10px', marginBottom: '10px' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleImageUpload;
