import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageCarusel from "./ServicesComponets/ImageCarusel";
import "../Admin_PetServices/ServicesComponets/LocalProfile.css";
import StarRating from "./ServicesComponets/StarRating";

function LocalProfile() {
  const localInfo = {
    address: "strada albisoara",
    localInfo: "loren ispusdn valsdnvaslkj vasfivn asdflk dsklfj sdjfk fjkl",
    localName: "bigShop",
    localType: "Pet Shop",
    userId: "66e1c4efb15fa60cdd025907",
  };

  return (
    <>
      <Header />
      <div className="carouselContainer">
        <ImageCarusel images={localInfo.images} />
      </div>
      <div className="localProfileInfo">
        <h2>{localInfo.localName}</h2>
        <h3 className="localType">{localInfo.localType}</h3>
        <p className="address">{localInfo.address}</p>
        <p className="info">{localInfo.localInfo}</p>
        <StarRating rating={0}/>
      </div>
      <Footer />
    </>
  );
}

export default LocalProfile;
