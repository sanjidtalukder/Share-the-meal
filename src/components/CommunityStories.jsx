
import React from "react";



const stories = [
  {
    id: 1,
    name: "Green Bites Restaurant",
    story: "We've reduced food waste by 70% since joining the platform!",
    image: "https://i.ibb.co/C3LHXFj9/360-F-497455841-1-TSJ07ny-Ec-SOIz-YJ4nev-IGt-Ee0-VOPWTF.jpg",
  },
  {
    id: 2,
    name: "Hope Charity",
    story: "With donations, we now feed 100 people every weekend.",
    image: "https://i.ibb.co/5hDhrdJr/charity.jpg",
  },
];

const CommunityStories = () => {
  return (
    <section className="my-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Community Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <div key={story.id} className="bg-white shadow-md rounded-xl overflow-hidden">
            <img src={story.image} alt={story.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{story.name}</h3>
              <p className="mt-2 text-gray-600">{story.story}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityStories;
