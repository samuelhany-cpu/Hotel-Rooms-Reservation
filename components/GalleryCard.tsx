import Image from 'next/image';

interface GalleryCardProps {
  image: string;
  title: string;
  alt: string;
}
export default function GalleryCard({ image, title, alt }: GalleryCardProps) {
  return (
    <figure className="gallery-card">
      <Image src={image} alt={alt} width={600} height={450} sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw" />
      <figcaption>{title}</figcaption>
    </figure>
  );
}
