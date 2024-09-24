import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import myString from './DefaultImage';

const ImageUpload = ({ onImageUpload }) => {
  const [fileName, setFileName] = useState('');
  const [imageSrc, setImageSrc] = useState(myString); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);

      const reader = new FileReader();

      reader.onload = (event) => {
        const base64Image = event.target.result;
        setImageSrc(base64Image);
        onImageUpload(base64Image); // Trimit URL-ul imaginii către componenta părinte
      };

      reader.readAsDataURL(file);
    }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const labelStyle = {
    margin: '10px 0 15px 0',
    padding: '6px 25px',
    fontSize: '14px',
    fontWeight: '400',
    color: '#fff',
    backgroundColor: '#6b5e49',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle = {
    display: 'none',
  };

  const fileNameStyle = {
    color: '#6b5e49',
    fontWeight: '400',
  };

  const imageContainerStyle = {
    marginTop: '20px',
  };

  const h3Style = {
    color: '#6b5e49',
  };

  const shouldDisplayImage = imageSrc !== myString;

  return (
    <div>
      <div style={containerStyle}>
        <label htmlFor="file-upload" style={labelStyle}>
          {!fileName && <FaCamera style={{ marginRight: '10px' }} />}
          Choose Image
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          style={inputStyle}
          onChange={handleFileChange}
        />
        {fileName && <p style={fileNameStyle}>{fileName}</p>}
      </div>

      {imageSrc && (
        <div style={imageContainerStyle}>
          <h3 style={h3Style}>Selected Image:</h3>
          {shouldDisplayImage ? (
            <img src={imageSrc} alt="Selected" style={{ maxWidth: '300px', maxHeight: '300px' }} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
