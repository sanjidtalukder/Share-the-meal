import React from "react";
import { FaQuestionCircle, FaEnvelopeOpenText } from "react-icons/fa";
import Contact from "./Contact";

const faqs = [
  {
    question: "What is Share The Meal?",
    answer:
      "Share The Meal is a platform where restaurants and individuals can donate excess food to verified charities or needy people through volunteers.",
  },
  {
    question: "Who can donate food?",
    answer:
      "Registered restaurants or users can post donation requests once logged in. These requests are then verified and picked up by volunteers.",
  },
  {
    question: "How do I become a volunteer?",
    answer:
      "You can register as a volunteer from the website. After approval, you’ll be able to view and pick up donations assigned to you.",
  },
  {
    question: "Is there any cost to use this service?",
    answer:
      "No. Share The Meal is completely free for both donors and recipients.",
  },
  {
    question: "How can I track my donations?",
    answer:
      "Once logged in, go to the 'My Donations' or 'Dashboard' section to view the status and history of your food donations.",
  },
];

const FAQ = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* FAQ Section */}
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700 flex items-center justify-center gap-2">
        <FaQuestionCircle className="text-green-600" /> Frequently Asked Questions
      </h2>

      <div className="space-y-4 mb-16">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow bg-green-50 border border-green-200 rounded-box shadow-sm"
          >
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-lg font-medium text-green-800 peer-checked:bg-green-100">
              {faq.question}
            </div>
            <div className="collapse-content text-green-700">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-16 bg-green-50 p-8 rounded-xl border border-green-200 shadow-sm">
        {/* <h3 className="text-2xl font-semibold text-center mb-6 text-green-700 flex items-center justify-center gap-2">
          <FaEnvelopeOpenText className="text-green-600" /> Still have questions? Contact Us
        </h3> */}
        <Contact />
      </div>
    </div>
  );
};

export default FAQ;
