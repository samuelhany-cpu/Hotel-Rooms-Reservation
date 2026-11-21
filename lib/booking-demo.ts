export type RoomSlug =
  'family-room' | 'executive-suite' | 'deluxe-room' | 'double-room';

export interface DemoRoom {
  slug: RoomSlug;
  title: string;
  image: string;
  price: number;
  capacity: number;
  beds: string;
  description: string;
  features: readonly string[];
  availabilityOffset: number;
}

export const ROOMS: readonly DemoRoom[] = [
  {
    slug: 'family-room',
    title: 'Family Room',
    image: '/images/room-1.png',
    price: 250,
    capacity: 4,
    beds: 'One queen bed and two single beds',
    description:
      'A spacious sample room designed for family time and a relaxed group stay.',
    features: [
      'Private bathroom',
      'Sample Wi-Fi amenity',
      'Flexible family layout',
      'Breakfast option (illustrative)',
    ],
    availabilityOffset: 2,
  },
  {
    slug: 'executive-suite',
    title: 'Executive Suite',
    image: '/images/room-2.png',
    price: 350,
    capacity: 2,
    beds: 'One king bed',
    description:
      'A fictional suite with a separate sitting area and generous space to unwind.',
    features: [
      'Separate living area',
      'Sample premium view',
      'Work area',
      'Sample Wi-Fi amenity',
    ],
    availabilityOffset: 5,
  },
  {
    slug: 'deluxe-room',
    title: 'Deluxe Room',
    image: '/images/room-3.png',
    price: 200,
    capacity: 2,
    beds: 'One king bed',
    description:
      'A comfortable illustrative room with a bright outlook and workspace.',
    features: [
      'Work desk',
      'Private bathroom',
      'Sample city view',
      'Sample Wi-Fi amenity',
    ],
    availabilityOffset: 8,
  },
  {
    slug: 'double-room',
    title: 'Double Room',
    image: '/images/room-4.png',
    price: 300,
    capacity: 2,
    beds: 'Two single beds',
    description:
      'An adaptable twin-room concept for two guests travelling together.',
    features: [
      'Two single beds',
      'Private bathroom',
      'Climate control (sample)',
      'Sample Wi-Fi amenity',
    ],
    availabilityOffset: 11,
  },
];

export type SearchField = 'arrival' | 'departure' | 'adults' | 'children';

export interface DemoSearch {
  arrival: string;
  departure: string;
  adults: number;
  children: number;
}

export type SearchErrors = Partial<Record<SearchField, string>>;

const DAY_MS = 86_400_000;

export function todayLocal(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function toUtcDay(iso: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split('-').map(Number);
  if (y < 2000 || y > 2100) return null;
  const date = new Date(0);
  date.setUTCFullYear(y, m - 1, d);
  date.setUTCHours(0, 0, 0, 0);
  if (
    date.getUTCFullYear() !== y ||
    date.getUTCMonth() !== m - 1 ||
    date.getUTCDate() !== d
  )
    return null;
  return Math.floor(date.getTime() / DAY_MS);
}

export function nightsBetween(
  arrival: string,
  departure: string
): number | null {
  const start = toUtcDay(arrival);
  const end = toUtcDay(departure);
  if (start === null || end === null) return null;
  return end - start;
}

export function validateSearch(
  input: DemoSearch,
  today: string = todayLocal()
): SearchErrors {
  const errors: SearchErrors = {};
  const start = toUtcDay(input.arrival);
  const end = toUtcDay(input.departure);
  const todayDay = toUtcDay(today);

  if (start === null) errors.arrival = 'Choose a valid check-in date.';
  else if (todayDay !== null && start < todayDay)
    errors.arrival = 'Check-in cannot be in the past.';
  if (end === null) errors.departure = 'Choose a valid check-out date.';
  else if (start !== null && end <= start)
    errors.departure = 'Check-out must be after check-in.';
  else if (start !== null && end - start > 21)
    errors.departure = 'Demo stays are limited to 21 nights.';

  if (!Number.isInteger(input.adults) || input.adults < 1 || input.adults > 8)
    errors.adults = 'Choose 1 to 8 adults.';
  if (
    !Number.isInteger(input.children) ||
    input.children < 0 ||
    input.children > 8
  )
    errors.children = 'Choose 0 to 8 children.';
  if (
    Number.isInteger(input.adults) &&
    Number.isInteger(input.children) &&
    input.adults + input.children > 8
  ) {
    errors.children = 'The demo allows a maximum of 8 guests in total.';
  }
  return errors;
}

export function isValidSearch(
  input: DemoSearch,
  today: string = todayLocal()
): boolean {
  return Object.keys(validateSearch(input, today)).length === 0;
}

export function getRoom(slug: string | null | undefined): DemoRoom | undefined {
  return ROOMS.find((room) => room.slug === slug);
}

export function isRoomAvailable(room: DemoRoom, search: DemoSearch): boolean {
  const from = toUtcDay(search.arrival);
  const nights = nightsBetween(search.arrival, search.departure);
  if (from === null || nights === null || nights < 1 || nights > 21)
    return false;
  if (search.adults + search.children > room.capacity) return false;
  // A fixed, local-only calendar pattern for a believable *demo*.
  // It never represents live hotel inventory.
  for (let offset = 0; offset < nights; offset += 1) {
    if ((from + offset + room.availabilityOffset) % 17 === 0) return false;
  }
  return true;
}

export function matchingRooms(
  search: DemoSearch,
  today: string = todayLocal()
): DemoRoom[] {
  if (!isValidSearch(search, today)) return [];
  return ROOMS.filter((room) => isRoomAvailable(room, search));
}

export interface PriceBreakdown {
  nights: number;
  nightlyRate: number;
  roomSubtotal: number;
  total: number;
  currency: 'USD';
}

export function priceFor(
  room: DemoRoom,
  search: DemoSearch
): PriceBreakdown | null {
  const nights = nightsBetween(search.arrival, search.departure);
  if (nights === null || nights < 1 || nights > 21) return null;
  const total = nights * room.price;
  return {
    nights,
    nightlyRate: room.price,
    roomSubtotal: total,
    total,
    currency: 'USD',
  };
}

export function readSearch(params: Pick<URLSearchParams, 'get'>): DemoSearch {
  const parseCount = (value: string | null, fallback: number) => {
    if (value === null) return fallback;
    if (!/^\d+$/.test(value)) return NaN;
    return Number(value);
  };
  return {
    arrival: params.get('arrival') ?? '',
    departure: params.get('departure') ?? '',
    adults: parseCount(params.get('adults'), 2),
    children: parseCount(params.get('children'), 0),
  };
}

export function criteriaQuery(search: DemoSearch): URLSearchParams {
  return new URLSearchParams({
    arrival: search.arrival,
    departure: search.departure,
    adults: String(search.adults),
    children: String(search.children),
  });
}

export function roomDetailsHref(room: DemoRoom, search: DemoSearch): string {
  return `/rooms/${room.slug}?${criteriaQuery(search).toString()}`;
}

export function demoReference(room: DemoRoom, search: DemoSearch): string {
  return `DEMO-${search.arrival.replaceAll('-', '')}-${room.slug.slice(0, 3).toUpperCase()}-${search.adults}${search.children}`;
}
