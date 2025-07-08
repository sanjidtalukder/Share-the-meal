import React from "react";

const donations = [
  {
    id: 1,
    image: "https://i.ibb.co/MD2DgDq6/group-different-people-volunteering-foodbank.jpg",
    foodType: "Bakery",
    restaurant: "Sweet Treats, Dhaka",
    status: "Available",
  },
  {
    id: 2,
    image: "https://i.ibb.co/Wp6nn48c/group-people-volunteering-foodbank-poor-people.jpg",
    foodType: "Produce",
    restaurant: "Green Basket, Chattogram",
    status: "Picked Up",
  },
  {
    id: 3,
    image: "https://i.ibb.co/MD2DgDq6/group-different-people-volunteering-foodbank.jpg",
    foodType: "Cooked Meals",
    restaurant: "Foodies, Sylhet",
    status: "Available",
  },
  {
    id: 4,
    image: "https://i.ibb.co/Wp6nn48c/group-people-volunteering-foodbank-poor-people.jpg",
    foodType: "Fruit",
    restaurant: "Fruit Fiesta, Rajshahi",
    status: "Available",
  },
];

const FeaturedDonations = () => {
  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Donations</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {donations.map((donation) => (
          <div key={donation.id} className="card bg-base-100 shadow-md">
            <figure>
              <img src={donation.image} alt={donation.foodType} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="font-semibold">{donation.foodType}</h3>
              <p>{donation.restaurant}</p>
              <p className={`font-medium ${donation.status === "Available" ? "text-green-600" : "text-gray-500"}`}>
                {donation.status}
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-outline btn-sm">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDonations;
