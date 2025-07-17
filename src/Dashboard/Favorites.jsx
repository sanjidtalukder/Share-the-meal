import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://share-the-meal-server-blond.vercel.app/api/favorites?email=${user.email}`)
        .then((res) => setFavorites(res.data))
        .catch((err) => {
          console.error("Failed to load favorites:", err);
          setFavorites([]);
        });
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        My Favorite Donations
      </h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No favorites found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-green-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
  <h3 className="text-xl font-semibold text-green-800 mb-1">
    {item.title}
  </h3>
 <p className="text-gray-600 text-sm">
  <span className="font-medium">Restaurant:</span>{" "}
  {item?.restaurant?.name ? item.restaurant.name : "Not specified"}
</p>
<p className="text-gray-600 text-sm">
  <span className="font-medium">Location:</span>{" "}
  {item?.restaurant?.location ? item.restaurant.location : "Not specified"}
</p>

</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
