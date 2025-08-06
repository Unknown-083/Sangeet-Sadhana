import React from "react";
import Input from "./Input";

const Contact = () => {
  return (
    <div className="p-8 w-screen max-w-2xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-center mb-8">Have questions, feedback, or suggestions? Reach out to us below.</p>

      <form className="flex flex-col gap-4 bg-gray-800 p-6 rounded-xl shadow">
        <Input
          type="text"
          placeholder="Your Name"
          className="p-3 rounded-2xl bg-gray-900 border border-gray-700 text-white"
        />
        <Input
          type="email"
          placeholder="Your Email"
          className="p-3 rounded-2xl bg-gray-900 border border-gray-700 text-white"
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          className="p-3 rounded-2xl bg-gray-900 border border-gray-700 text-white"
        ></textarea>
        <button
          type="submit"
          className="bg-violet-600 text-white px-4 py-2 rounded-3xl hover:bg-violet-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
