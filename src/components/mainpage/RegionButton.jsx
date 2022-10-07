import { useContext } from "react";
import GlobalState from "../../shared/GlobalState";

const RegionButton = ({ name }) => {
  const { regionSelection, spotPageSelection, restaurantPageSelection, accommodationPageSelection } = useContext(GlobalState);
  const { selectedRegion, setSelectedRegion } = regionSelection;
  const { setCurrentSpotPage } = spotPageSelection;
  const { setCurrentRestaurantPage } = restaurantPageSelection;
  const { setCurrentAccommodationPage } = accommodationPageSelection;
  const clickRegionHandler = () => {
    setCurrentSpotPage(1);
    setCurrentRestaurantPage(1);
    setCurrentAccommodationPage(1);
    setSelectedRegion(name);
  };
  if (selectedRegion === name) {
    return (
      <div>
        <p className="bg-green1 cursor-pointer w-[70px] h-[43px] rounded-xl text-white1 font-bold text-[14px] shadow-md flex justify-center items-center">
          {name}
        </p>
      </div>
    );
  } else {
    return (
      <div
        onClick={clickRegionHandler}
        className="cursor-pointer transition-all hover:brightness-95 w-[70px] h-[43px] text-[14px] flex justify-center items-center bg-white1 rounded-lg font-bold shadow-md cursor-pointer"
      >
        <p className="text-black1">{name}</p>
      </div>
    );
  }
};

export default RegionButton;
