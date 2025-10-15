function calculateTotal() {
  const pricePerNight = document.getElementById('pricePerNight').innerText; // price per night in dollars
  const checkinDate = new Date(document.getElementById('checkin').value);
  const checkoutDate = new Date(document.getElementById('checkout').value);

  if (checkinDate && checkoutDate && checkoutDate > checkinDate) {
      const numberOfNights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
      const totalPrice = numberOfNights * pricePerNight;
      document.getElementById('totalPrice').value = `$${totalPrice}`;
      document.getElementById('totalPrice-invoic').value = totalPrice;
  } else {
    document.getElementById('totalPrice').value = '';
  }
}
function saveBookingDetails(event) {
    const checkinDate = document.getElementById('checkin').value;
    const checkoutDate = document.getElementById('checkout').value;
  
    if (!checkinDate || !checkoutDate) {
      alert("Please select both check-in and check-out dates.");
      event.preventDefault(); // Prevent navigation if dates are missing
      return false;
    }
  
    const roomName = document.getElementById('room_name').innerText;
    const totalPrice = document.getElementById('totalPrice').value;
    const visitors = document.getElementById('visitors').value;
  
    // Store data in localStorage
    localStorage.setItem('room_name', roomName);
    localStorage.setItem('totalPrice', totalPrice);
    localStorage.setItem('checkinDate', checkinDate);
    localStorage.setItem('checkoutDate', checkoutDate);
    localStorage.setItem('visitors', visitors);
  
    // Allow navigation to invoice.html
    window.location.href = "invoice.html";
  }
   
document.addEventListener('DOMContentLoaded', () => {
  const roomName = localStorage.getItem('room_name');
  const totalPrice = localStorage.getItem('totalPrice');
  const checkinDate = localStorage.getItem('checkinDate');
  const checkoutDate = localStorage.getItem('checkoutDate');
  const visitors = localStorage.getItem('visitors');

  if (roomName) {
      document.getElementById('room_name_invoic').value = roomName;
  }
  if (totalPrice) {
      document.getElementById('totalPrice-invoic').value = totalPrice;
  }
  if (checkinDate) {
      document.getElementById('checkinDate-invoic').value = checkinDate;
  }
  if (checkoutDate) {
      document.getElementById('checkoutDate-invoic').value = checkoutDate;
  }
  if (visitors) {
      document.getElementById('visitors-invoic').value = visitors;
  }
});
