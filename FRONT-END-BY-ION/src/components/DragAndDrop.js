import React, { useState } from 'react';

const ImageUpload = () => {
  const [imageSrc, setImageSrc] = useState(''); // Stocăm URL-ul imaginii
  const [fileName, setFileName] = useState(''); // Stocăm numele fișierului selectat

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setFileName(file.name); // Actualizăm starea pentru a afișa numele fișierului selectat

      const reader = new FileReader();

      reader.onload = (event) => {
        const base64Image = event.target.result;
        console.log('Conținutul imaginii în Base64:', base64Image); // TRIMITEM CATRE SERVER
        setImageSrc(base64Image); // Actualizăm starea pentru a afișa imaginea
      };

      reader.readAsDataURL(file); // Citim fișierul ca URL de tip Data URL
    }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center', // Centrarea pe verticală
  };

  const labelStyle = {
    padding: '6px 12px',
    fontSize: '14px',
    fontWeight: '400',
    color: '#fff', // Culoare text albă pentru buton
    backgroundColor: '#6b5e49',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px', // Spațiu între buton și textul fișierului
  };

  const inputStyle = {
    display: 'none', // Ascundem input-ul original
  };

  const fileNameStyle = {
    color: '#6b5e49', // Aceeași culoare ca butonul
    fontWeight: '400',
  };

  const imageContainerStyle = {
    marginTop: '20px', // Spațiu între buton și imaginea selectată
  };

  return (
    <div>
      <div style={containerStyle}>
        <label htmlFor="file-upload" style={labelStyle}>
          Choose Image
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          style={inputStyle}
          onChange={handleFileChange}
        />
        {/* Afișăm numele fișierului selectat */}
        {fileName && <p style={fileNameStyle}>{fileName}</p>}
      </div>

      {/* Imaginea selectată va fi afișată mai jos */}
      {imageSrc && (
        <div style={imageContainerStyle}>
          <h3>Selected Image:</h3>
          <img src={imageSrc} alt="Selected" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
