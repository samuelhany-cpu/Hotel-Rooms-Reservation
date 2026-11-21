import Image from 'next/image';
import Link from 'next/link';

interface RoomCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  rating?: number;
  bookingLink: string;
}

export default function RoomCard({
  image,
  title,
  description,
  price,
  rating = 5,
  bookingLink,
}: RoomCardProps) {
  return (
    <article className="room-card">
      <div className="room-card-image">
        <Image
          src={image}
          alt={title}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={90}
        />
      </div>
      <div className="room-card-content">
        <h2 className="room-card-title">{title}</h2>
        <div
          className="room-card-rating"
          aria-label={`${rating} out of 5 stars`}
        >
          {[...Array(rating)].map((_, index) => (
            <i key={index} className="fa fa-star" aria-hidden="true" />
          ))}
        </div>
        <p className="room-card-description">{description}</p>
        <div className="room-card-footer">
          <div className="room-card-price">
            <span className="price-amount">${price}</span>
            <span className="price-label">Per Night</span>
          </div>
          <Link className="room-card-btn" href={bookingLink}>
            VIEW ROOM
          </Link>
        </div>
      </div>
    </article>
  );
}
