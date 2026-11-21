import Image from 'next/image';
import Link from 'next/link';

interface RoomCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  bookingLink: string;
}
export default function RoomCard({ image, title, description, price, bookingLink }: RoomCardProps) {
  return (
    <article className="room-card">
      <Link className="room-card-image" href={bookingLink} aria-label={'View ' + title + ' details'}>
        <Image src={image} alt={title + ' — illustrative room image'} width={800} height={600} sizes="(max-width: 650px) 100vw, (max-width: 1100px) 50vw, 25vw" />
      </Link>
      <div className="room-card-content">
        <div className="room-card-meta"><span>ROOM CONCEPT</span><span>DEMO DATA</span></div>
        <h3 className="room-card-title">{title}</h3>
        <p className="room-card-description">{description}</p>
        <div className="room-card-footer">
          <div className="room-card-price"><strong>{'$' + price}</strong><span> sample / night</span></div>
          <Link className="room-card-btn" href={bookingLink} aria-label={'Explore ' + title}>Explore <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </article>
  );
}
