import React from 'react'
import "../App.css";
import Landing from "../Layout/Landing";
import About from "../Layout/About";
import Work from "../Layout/Work";
import Testimonial from "../Layout/Testimonial";
import Contact from "../Layout/Contact";
import Footer from "../Layout/Footer";

export default function Home() {
  return (
    <div className="App">
       <Landing />
      <About />       
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  )
}
