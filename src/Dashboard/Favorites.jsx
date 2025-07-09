import { useEffect, useState } from "react";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get("/api/favorites")
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) {
          setFavorites(data);
        } else if (Array.isArray(data.favorites)) {
          setFavorites(data.favorites);
        } else {
          setFavorites([]); // fallback
        }
      })
      .catch(err => {
        console.error("Failed to load favorites:", err);
        setFavorites([]);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        favorites.map(item => (
          <div key={item._id} className="p-2 bg-white rounded shadow mb-2">
            {item.name}
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
