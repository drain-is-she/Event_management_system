// 1. Find the HTML elements we want to read or update.
// The DOM is the browser's representation of our HTML document.
const priceElement = document.querySelector("#ticket-price");
const quantitySelect = document.querySelector("#ticket-quantity");
const totalOutput = document.querySelector("#ticket-total");

// 2. Keep track of the selected event. Array positions start at zero.
const eventSelect = document.querySelector("#event-select");
let selectedEvent = events[0];

// Create an option for each event, using its ID as the option value.
for (const event of events) {
  const option = document.createElement("option");
  option.value = String(event.id);
  option.textContent = event.title;
  eventSelect.append(option);
}

// 3. Create a reusable formatter for Indian rupees.
const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

// 4. A function groups instructions that we can run more than once.
function updateTotal() {
  const quantity = Number(quantitySelect.value);

  // Reject values outside the range supported by this demonstration.
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 6) {
    totalOutput.textContent = "Choose between 1 and 6 tickets.";
    return;
  }

  const total = selectedEvent.price * quantity;

  // textContent changes the displayed text without interpreting it as HTML.
  totalOutput.textContent = rupees.format(total);
}

// 5. Render means update the page to show the current data.
function renderEvent() {
  document.querySelector("#workshop-title").textContent = selectedEvent.title;
  document.querySelector("#event-description").textContent = selectedEvent.description;
  document.querySelector("#event-venue").textContent = selectedEvent.venue;
  document.querySelector("#event-capacity").textContent = `${selectedEvent.capacity} attendees`;
  priceElement.textContent = rupees.format(selectedEvent.price);

  const dateElement = document.querySelector("#event-date");
  dateElement.dateTime = selectedEvent.date;
  dateElement.textContent = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(selectedEvent.date)) + " IST";

  // Start with one ticket when switching events, then recalculate.
  quantitySelect.value = "1";
  updateTotal();
}

eventSelect.addEventListener("change", () => {
  // find() returns the event whose ID matches the selected option.
  const match = events.find(event => event.id === Number(eventSelect.value));
  if (!match) return;
  selectedEvent = match;
  renderEvent();
});

// Listen for a user changing the ticket quantity.
quantitySelect.addEventListener("change", updateTotal);

// 6. Display the first event and enable the interactive controls.
renderEvent();
eventSelect.disabled = false;
quantitySelect.disabled = false;

// This is only a browser-side estimate. It does not reserve inventory,
// contact an API, collect payment, or save anything to a database.
// The future backend must calculate the authoritative total independently.
