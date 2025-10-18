import Image from 'next/image';

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
    <div className="room-card">
      <div className="room-card-image">
        <Image
          src={image}
          alt={title}
          width={800}
          height={600}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          quality={90}
        />
      </div>
      <div className="room-card-content">
        <h2 className="room-card-title">{title}</h2>
        <div className="room-card-rating">
          {[...Array(rating)].map((_, index) => (
            <i key={index} className="fa fa-star"></i>
          ))}
        </div>
        <p className="room-card-description">{description}</p>
        <div className="room-card-footer">
          <div className="room-card-price">
            <span className="price-amount">${price}</span>
            <span className="price-label">Per Night</span>
          </div>
          <a className="room-card-btn" href={bookingLink}>
            BOOK NOW
          </a>
        </div>
      </div>
    </div>
  );
}
