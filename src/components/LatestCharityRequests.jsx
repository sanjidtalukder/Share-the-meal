
import React from "react";

const charityRequests = [
  {
    id: 1,
    name: "Helping Hands",
    logo: "https://i.ibb.co/1RZkY6y/charity1.png",
    description: "We need fruits for children this weekend.",
    foodTitle: "Fruit Basket",
  },
  {
    id: 2,
    name: "Smile Foundation",
    logo: "https://i.ibb.co/ypfF3xT/charity2.png",
    description: "Looking for bakery items for community brunch.",
    foodTitle: "Bakery Donation",
  },
  {
    id: 3,
    name: "Food for All",
    logo: "https://i.ibb.co/mc5xH3x/charity3.png",
    description: "Need cooked meals for 50 people today.",
    foodTitle: "Cooked Meal Pack",
  },
];

const LatestCharityRequests = () => {
  return (
    <section className="my-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Charity Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {charityRequests.map((req) => (
          <div key={req.id} className="bg-white shadow-lg rounded-xl p-4">
            <img src={req.logo} alt={req.name} className="h-16 w-16 object-cover rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center">{req.name}</h3>
            <p className="text-sm mt-2 text-gray-600">{req.description}</p>
            <p className="text-sm text-center mt-2 font-semibold text-blue-600">Requested Food: {req.foodTitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestCharityRequests;
