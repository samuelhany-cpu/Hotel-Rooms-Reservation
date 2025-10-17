'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import RoomCard from '@/components/RoomCard';
import GalleryCard from '@/components/GalleryCard';

// Room data
const rooms = [
  {
    id: 1,
    image: '/images/room-1.png',
    title: 'Family Room',
    description:
      'Our Family Room is the perfect choice for a family vacation. Spacious and comfortable, this room offers ample space for relaxation and quality time together.',
    price: 250,
    bookingLink: '/room1',
  },
  {
    id: 2,
    image: '/images/room-2.png',
    title: 'Executive Suite',
    description:
      'Our Executive Suite is the epitome of luxury. Spacious accommodations, a separate living area, and breathtaking views create an unforgettable experience.',
    price: 350,
    bookingLink: '/room2',
  },
  {
    id: 3,
    image: '/images/room-3.png',
    title: 'Deluxe Room',
    description:
      'Our Deluxe Room offers a luxurious stay with a king-size bed, modern amenities, and a beautiful view of the city skyline.',
    price: 200,
    bookingLink: '/room3',
  },
  {
    id: 4,
    image: '/images/room-4.png',
    title: 'Double Room',
    description:
      'Our Double Room is ideal for a cozy getaway. Features two comfortable beds, a private bathroom, and essential amenities.',
    price: 300,
    bookingLink: '/room4',
  },
];

// Gallery images
const galleryImages = [
  { id: 1, title: 'Luxury Suite' },
  { id: 2, title: 'Modern Amenities' },
  { id: 3, title: 'Relaxing Atmosphere' },
  { id: 4, title: 'Premium Comfort' },
  { id: 5, title: 'Elegant Design' },
  { id: 6, title: 'Beautiful Views' },
];

export default function Home() {
  useEffect(() => {
    // Initialize Owl Carousel after scripts are loaded
    const initCarousel = () => {
      if (typeof window !== 'undefined' && window.jQuery) {
        const $ = window.jQuery;

        // Check if owlCarousel is available
        if (typeof $.fn.owlCarousel === 'function') {
          // Initialize main carousel
          $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            dots: false,
            navText: [
              "<i class='fa fa-chevron-left'></i>",
              "<i class='fa fa-chevron-right'></i>",
            ],
            responsive: {
              0: { items: 1 },
              768: { items: 1 },
              1000: { items: 1 },
            },
          });

          // Initialize rooms and gallery carousel
          $('.owl-carousel1').owlCarousel({
            loop: true,
            margin: 40,
            nav: true,
            dots: false,
            navText: [
              "<i class='fa fa-chevron-left'></i>",
              "<i class='fa fa-chevron-right'></i>",
            ],
            responsive: {
              0: { items: 1 },
              768: { items: 2, margin: 10 },
              1000: { items: 3 },
            },
          });
        }
      }
    };

    // Wait longer for scripts to load
    const timer = setTimeout(() => {
      initCarousel();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="home">
        <div className="content">
          <div className="owl-carousel owl-theme">
            <div className="item">
              <Image
                src="/images/banner-1.png"
                alt=""
                width={1920}
                height={1080}
                priority
              />
              <div className="text">
                <h1>Spend Your Holiday</h1>
                <p>Your home away from home.</p>
                <div className="flex">
                  <a className="primary-btn" href="#about">
                    READ MORE
                  </a>
                  <a className="secondary-btn" href="#contact">
                    CONTACT US
                  </a>
                </div>
              </div>
            </div>
            <div id="home" className="item">
              <Image
                src="/images/banner-2.png"
                alt=""
                width={1920}
                height={1080}
              />
              <div className="text">
                <h1>Spend Your Holiday</h1>
                <p>Your home away from home.</p>
                <div className="flex">
                  <a className="primary-btn" href="#about">
                    READ MORE
                  </a>
                  <a className="secondary-btn" href="#contact">
                    CONTACT US
                  </a>
                </div>
              </div>
            </div>
            <div className="item">
              <Image
                src="/images/banner-3.png"
                alt=""
                width={1920}
                height={1080}
              />
              <div className="text">
                <h1>Spend Your Holiday</h1>
                <p>Your home away from home.</p>
                <div className="flex">
                  <a className="primary-btn" href="#about">
                    READ MORE
                  </a>
                  <a className="secondary-btn" href="#contact">
                    CONTACT US
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="book">
        <div className="container flex_space">
          <div className="text">
            <h1>
              <span>Book </span> Your Rooms
            </h1>
          </div>
          <div className="form">
            <form className="grid">
              <input type="date" placeholder="Arrival Date" />
              <input type="date" placeholder="Departure Date" />
              <input type="number" placeholder="Adults" />
              <input type="number" placeholder="Children" />
              <input type="submit" value="CHECK AVAILABILITY" />
            </form>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about top">
        <div id="about" className="container flex">
          <div className="left">
            <div className="heading">
              <h1>WELCOME</h1>
              <h2>Crowny Hotel</h2>
            </div>
            <p>
              Crowny Hotel invites you to experience a haven of tranquility and
              sophistication. Our hotel offers a unique blend of modern comfort
              and timeless elegance. Immerse yourself in luxurious
              accommodations, savor delectable cuisine, and unwind in our serene
              spa. Whether you&apos;re seeking a romantic getaway, a productive
              business trip, or a family vacation, Crowny Hotel is your perfect
              choice.
            </p>
            <button className="primary-btn">ABOUT US</button>
          </div>
          <div className="right">
            <Image
              src="/images/about.png"
              alt="About"
              width={600}
              height={400}
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="counter top">
        <div className="container grid">
          <div className="box">
            <h1>2500</h1>
            <hr />
            <span>Customer</span>
          </div>
          <div className="box">
            <h1>2000</h1>
            <hr />
            <span>Happy Customer</span>
          </div>
          <div className="box">
            <h1>150</h1>
            <hr />
            <span>Expert Technicians</span>
          </div>
          <div className="box">
            <h1>3550</h1>
            <hr />
            <span>Desktop Repaired</span>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="rooms">
        <div id="rooms" className="container top">
          <div className="heading">
            <h1>EXPLORE</h1>
            <h2>Our Rooms</h2>
            <p>
              Indulge in our luxurious rooms, designed for ultimate comfort.
            </p>
          </div>

          <div className="content mtop">
            <div className="owl-carousel owl-carousel1 owl-theme">
              {rooms.map((room) => (
                <div className="items" key={room.id}>
                  <RoomCard
                    image={room.image}
                    title={room.title}
                    description={room.description}
                    price={room.price}
                    bookingLink={room.bookingLink}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <div className="container top">
          <div className="heading">
            <h1>PHOTOS</h1>
            <h2>Our Gallery</h2>
            <p>
              Explore the beauty and elegance of our hotel through stunning
              visuals
            </p>
          </div>
        </div>

        <div className="content mtop">
          <div className="owl-carousel owl-carousel1 owl-theme">
            {galleryImages.map((item, idx) => (
              <div className="items" key={idx}>
                <GalleryCard
                  image={`/images/gallery-${item.id}.png`}
                  alt={item.title}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
