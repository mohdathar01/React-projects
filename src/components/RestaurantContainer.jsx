import { useState, useEffect } from "react";
import RestaurentCard from "./RestaurentCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { RES_CONTAINER_API } from "../utils/constant";
// dont use index as key its a bad practice,use unique as a key its a good practice
const RestaurentContainer = () => {
  const [listOfRestaurent, setlistOfRestaurent] = useState([]);
  const [filteredListofResnt, setfilteredListofResnt] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RES_CONTAINER_API);

    const json = await data.json();
    console.log(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setlistOfRestaurent(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredListofResnt(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  // if(listOfRestaurent.length===0){
  //   return  <Shimmer/>
  // }

  return listOfRestaurent.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="RestaurentContainer">
      <div className="iambutton">
        <div className="searchhere">
          <input
            type="text"
            className="searchbox"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <br />
          <button
            className="search-fiter-button"
            onClick={() => {
              const filteredListofResnt = listOfRestaurent.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              console.log(filteredListofResnt);
              setfilteredListofResnt(filteredListofResnt);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurent.filter(
              (res) => res.info.avgRating > 4.5
            );
            setfilteredListofResnt(filteredList);
            console.log(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="container-flex">
        {filteredListofResnt.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurantsmenu/" + restaurant.info.id}
          >
            {" "}
            <RestaurentCard resObj={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default RestaurentContainer;
