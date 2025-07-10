import React from "react";
import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co/MD2DgDq6/group-different-people-volunteering-foodbank.jpg",
    title: "Reducing Food Waste, Empowering Communities",
    subtitle: "Join us in making a real impact",
  },
  {
    id: 2,
    image: "https://i.ibb.co/Wp6nn48c/group-people-volunteering-foodbank-poor-people.jpg",
    title: "Connecting Donors with Those in Need",
    subtitle: "Be the bridge of hope",
  },
  {
    id: 3,
    image: "https://i.ibb.co/QFFn6MSy/group-people-volunteering-foodbank.jpg",
    title: "Empowering Volunteers for Greater Good",
    subtitle: "Your time can change lives",
  },
];

const Banner = () => {
  return (
    <div className="carousel w-full min-h-[80vh]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          id={`slide${slide.id}`}
          className="carousel-item relative w-full justify-center items-center"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-[90vh] object-cover"
            // loading="lazy"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <h2 className="text-3xl md:text-5xl font-bold">{slide.title}</h2>
              <p className="mt-4 text-lg md:text-xl">{slide.subtitle}</p>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2 z-10">
            <a
              href={`#slide${index === 0 ? slides.length : index}`}
              className="btn btn-circle"
              aria-label="Previous Slide"
            >
              ❮
            </a>
            <a
              href={`#slide${index + 2 > slides.length ? 1 : index + 2}`}
              className="btn btn-circle"
              aria-label="Next Slide"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
