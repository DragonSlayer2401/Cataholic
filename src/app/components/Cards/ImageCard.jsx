import Image from 'next/image';

const ImageCard = ({ src, alt, width, height }) => {
  return (
    <div className="image-card" style={{width:"250px", height:"187px"}}>
      <img src={src} alt={alt} width={width} height={height} className='w-full h-full rounded-2xl justify-self-center' />
    </div>
  );
};

export default ImageCard;
