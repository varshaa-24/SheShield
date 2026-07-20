// ==============================
// SheShield Trusted Contacts
// ==============================

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const saveBtn = document.getElementById("saveContact");
const contactList = document.getElementById("contactList");

let contacts = JSON.parse(localStorage.getItem("trustedContacts")) || [];

// ==============================
// Load Contacts
// ==============================

displayContacts();

// ==============================
// Save Button
// ==============================

saveBtn.addEventListener("click", addContact);

// ==============================
// Add Contact
// ==============================

function addContact() {

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name === "" || phone === "") {
        alert("Please fill all fields.");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Phone number must contain exactly 10 digits.");
        return;
    }

    if (contacts.length >= 5) {
        alert("Maximum of 5 trusted contacts allowed.");
        return;
    }

    const duplicate = contacts.find(contact => contact.phone === phone);

    if (duplicate) {
        alert("This phone number already exists.");
        return;
    }

   contacts.push({
    name,
    phone
});

localStorage.setItem(
    "trustedContacts",
    JSON.stringify(contacts)
);

// ==============================
// Save to Local Storage
// ==============================

function saveContacts() {

    localStorage.setItem(
        "trustedContacts",
        JSON.stringify(contacts)
    );

}

// ==============================
// Display Contacts
// ==============================

function displayContacts() {

    contactList.innerHTML = "";

    if (contacts.length === 0) {

        contactList.innerHTML =
            "<p style='text-align:center;'>No trusted contacts added.</p>";

        return;

    }

    contacts.forEach((contact, index) => {

        const card = document.createElement("div");

        card.className = "contact-card";

        card.innerHTML = `

            <h3>${contact.name}</h3>

            <p>📞 ${contact.phone}</p>

            <div class="contact-buttons">

                <a href="tel:${contact.phone}" class="callBtn">

                    📞 Call

                </a>

                <button class="deleteBtn" onclick="deleteContact(${index})">

                    🗑 Delete

                </button>

            </div>

        `;

        contactList.appendChild(card);

    });

}

// ==============================
// Delete Contact
// ==============================

function deleteContact(index) {

    if (!confirm("Delete this contact?")) return;

    contacts.splice(index, 1);

    saveContacts();

    displayContacts();

}