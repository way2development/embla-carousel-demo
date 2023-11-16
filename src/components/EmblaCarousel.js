import React, { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import ReactImageMagnify from "react-image-magnify";
import { OBJModel } from "react-3d-viewer";

const EmblaCarousel = (props) => {
  const { slides } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    containScroll: false,
    watchDrag: false,
    dragFree: false,
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const viewPortRef = useRef();
  const [view360Height, setView360Height] = useState(0);
  const [view360Width, setView360Width] = useState(0);

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
    const tempWidth = viewPortRef.current ? viewPortRef.current.offsetWidth : 0;
    const tempHeight = viewPortRef.current
      ? viewPortRef.current.offsetHeight
      : 0;
    setView360Width(tempWidth);
    setView360Height(tempHeight);
  }, [emblaMainApi, onSelect]);

  const Slide = ({ item, viewportWidth, viewportHeight }) => {
    // Render the slide based on its type
    switch (item.type) {
      case "img":
        return (
          <div>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: item.url,
                },
                largeImage: {
                  src: item.url,
                  width: 1200,
                  height: 700,
                },
                enlargedImageContainerStyle: {
                  top:0,
                  left: 0,
                  zIndex: 9999
                },
              }}
            />
          </div>
        );
      case "360":
        return (
          <OBJModel
            position={{ x: 0, y: -2.5, z: 0 }}
            scale={{ x: 0.25, y: 0.25, z: 0.25 }}
            src={item.url}
            height={viewportHeight}
            width={viewportWidth}
          />
        );
      case "video":
        return (
          <video width="100%" controls autoPlay muted>
            <source src={item.url} type="video/mp4" />
          </video>
        );

      default:
        return null;
    }
  };

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container" ref={viewPortRef}>
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              <Slide
                item={item}
                viewportWidth={view360Width}
                viewportHeight={view360Height}
              />
            </div>
          ))}
        </div>
        {/* <div>
            <img style={{ maxWidth: "100%" }} src={item.url} alt="" />
          </div> */}
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((item, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={item.type === "img" ? item.url : item.thumb}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
