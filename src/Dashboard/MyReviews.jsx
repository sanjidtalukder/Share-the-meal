import { useEffect, useState } from "react";
import axios from "axios";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("/api/reviews")
    .then(res => {
        const data = res.data;
        if(Array.isArray(data)){
           setReviews(data);  
        } else if (Array.isArray(data.reviews)){
            setReviews(data.reviews);
        }else{
            setReviews([]);
        }
       
    }).catch(error =>{
        console.error("Failed to fetch reviews", error);
        setReviews([]);
    })
},[]);

  const handleDelete = id => {
    axios.delete(`/api/reviews/${id}`).then(() => {
      setReviews(prev => prev.filter(r => r._id !== id));
    });
  };

 return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        reviews.map(review => (
          <div key={review._id} className="p-2 mb-2 border rounded">
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviews;
