import Image from 'next/image';

interface GalleryCardProps {
  image: string;
  title?: string;
  alt: string;
}

export default function GalleryCard({
  image,
  title = 'Photo Title Here.',
  alt,
}: GalleryCardProps) {
  return (
    <div className="gallery-card">
      <div className="gallery-card-image">
        <Image
          src={image}
          alt={alt}
          width={600}
          height={450}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          quality={90}
        />
        <div className="gallery-card-overlay">
          <div className="gallery-card-overlay-content">
            <span className="gallery-card-icon fa fa-search-plus"></span>
            <h3 className="gallery-card-title">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
