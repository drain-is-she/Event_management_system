// 1. Find the HTML elements we want to read or update.
// The DOM is the browser's representation of our HTML document.
const priceElement = document.querySelector("#ticket-price");
const quantitySelect = document.querySelector("#ticket-quantity");
const totalOutput = document.querySelector("#ticket-total");

// 2. Read the unit price from HTML. HTML attribute values are strings,
// so Number() converts "500" into the number 500 for calculations.
const ticketPrice = Number(priceElement.dataset.price);

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

  const total = ticketPrice * quantity;

  // textContent changes the displayed text without interpreting it as HTML.
  totalOutput.textContent = rupees.format(total);
}

// 5. Listen for a user changing the dropdown, then run our function.
quantitySelect.addEventListener("change", updateTotal);

// 6. Calculate the initial total and enable the interactive control.
updateTotal();
quantitySelect.disabled = false;

// This is only a browser-side estimate. It does not reserve inventory,
// contact an API, collect payment, or save anything to a database.
// The future backend must calculate the authoritative total independently.
