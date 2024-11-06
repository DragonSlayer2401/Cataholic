import { motion } from 'framer-motion';
import './card.css';
import { useEffect, useRef, useState } from 'react';

const ImageCard = ({ src, alt, id, sendImage, imageLoadHandler }) => {
  const [initialRender, setInitialRender] = useState(true);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      imageLoadHandler();
    }
  }, []);

  return (
    <motion.div
      className="image-card cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={
        initialRender
          ? { duration: 1, ease: 'easeIn' }
          : { duration: 0.3, ease: 'easeOut' }
      }
      whileHover={{
        scale: 1.15,
        transition: {
          duration: 0.1,
          ease: 'easeOut',
        },
      }}
      onHoverStart={() => setInitialRender(false)}
      onClick={() => sendImage(src, alt, id)}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full rounded-2xl justify-self-center"
        onLoad={() => {
          imageLoadHandler();
        }}
      />
    </motion.div>
  );
};

export default ImageCard;
