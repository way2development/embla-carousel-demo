import React from "react";
import "./App.css";
import EmblaCarousel from "./components/EmblaCarousel";
import image1 from "./images/slide-1.jpg";
import image2 from "./images/slide-2.jpg";
import image3 from "./images/slide-3.jpg";
import image4 from "./images/slide-4.jpg";
import video1 from "./videos/sample-vid.mp4";
import model from "./model/model.obj";


const App = () => {
  const OPTIONS = {};
  const SLIDE_COUNT = 10;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const _slides = [
    {
      type: "img",
      url: image1,
    },
    {
      type: "img",
      url: image2,
    },
    {
      type: "video",
      url: video1,
      thumb: image3,
    },
    {
      type: "360",
      url: model,
      thumb: image4,
    },
    {
      type: "img",
      url: image1,
    },
    {
      type: "img",
      url: image2,
    },
    {
      type: "img",
      url: image3,
    },
    {
      type: "img",
      url: image4,
    },
  ];

  return (
    <>
      <div style={{ width: "100%", height: "450px", maxWidth: "700px" }}>
        <EmblaCarousel slides={_slides} options={OPTIONS} />
      </div>
    </>
  );
};

export default App;
