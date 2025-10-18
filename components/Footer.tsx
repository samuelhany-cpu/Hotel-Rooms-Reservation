export default function Footer() {
  return (
    <footer className="bg-[#282834] text-[#b6b7b9] mt-12">
      <div className="container mx-auto px-5 py-12 grid grid-cols-3 gap-8">
        <div>
          <h2 className="text-white text-xl mb-4">Hotel</h2>
          <p className="text-sm">
            A warm welcome awaits you. Enjoy the best stay with modern amenities
            and friendly staff.
          </p>
        </div>
        <div>
          <h2 className="text-white text-xl mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2">Home</li>
            <li className="mb-2">About</li>
            <li className="mb-2">Rooms</li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-xl mb-4">Contact</h2>
          <p className="text-sm">
            123 Example Street
            <br />
            City, Country
          </p>
        </div>
      </div>
      <div className="legal bg-[#1a1a24] py-4 text-center text-sm">
        © {new Date().getFullYear()} Hotel. All rights reserved.
      </div>
    </footer>
  );
}
