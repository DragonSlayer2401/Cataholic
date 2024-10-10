import { motion } from 'framer-motion';
import './card.css';

const ImageCard = ({ src, alt, id, width, height, imageLoadHandler, sendImage}) => {
  return (
    <motion.div
      className="image-card cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.8, ease: 'easeOut' }}
      onClick={() => sendImage(src, alt, id)}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="w-full h-full rounded-2xl justify-self-center"
        onLoad={() => imageLoadHandler()}
      />
    </motion.div>
  );
};

export default ImageCard;
