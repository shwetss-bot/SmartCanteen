// =====================================================
// SMARTCANTEEN — FRONTEND LOGIC
// =====================================================


// =====================================================
// CART
// =====================================================

let cart = [];


// Add item to cart
function addToCart(name, price) {

    const existingItem = cart.find(
        item => item.name === name
    );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }


    updateCartCount();

    showToast(
        `${name} added to cart ✓`
    );
}


// Update cart count
function updateCartCount() {

    const count = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        cartCount.innerText = count;

    }
}


// =====================================================
// CART VIEW
// =====================================================

// =====================================================
// CART DRAWER
// =====================================================

function openCart() {

    const drawer =
        document.getElementById("cartDrawer");

    const overlay =
        document.getElementById("cartOverlay");


    if (drawer && overlay) {

        renderCart();

        drawer.classList.add("show");

        overlay.classList.add("show");

    }
}


function closeCart() {

    const drawer =
        document.getElementById("cartDrawer");

    const overlay =
        document.getElementById("cartOverlay");


    if (drawer && overlay) {

        drawer.classList.remove("show");

        overlay.classList.remove("show");

    }
}


// =====================================================
// RENDER CART ITEMS
// =====================================================

function renderCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems || !cartTotal) return;


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add something delicious
                    from today's menu.
                </p>

            </div>
        `;

        cartTotal.innerText = "₹0";

        return;
    }


    // Cart items

    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-icon">
                ${getFoodEmoji(item.name)}
            </div>


            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <span>
                    ₹${item.price}
                </span>


                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

            </div>


            <div class="cart-item-total">
                ₹${itemTotal}
            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    // Total

    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    cartTotal.innerText =
        `₹${total}`;
}


// =====================================================
// INCREASE QUANTITY
// =====================================================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCartCount();

    renderCart();

}


// =====================================================
// DECREASE QUANTITY
// =====================================================

function decreaseQuantity(index) {

    cart[index].quantity--;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCartCount();

    renderCart();

}


// =====================================================
// FOOD EMOJI
// =====================================================

function getFoodEmoji(name) {

    if (name === "Veg Thali") {
        return "🍛";
    }

    if (name === "Veg Noodles") {
        return "🍜";
    }

    if (name === "Veg Burger") {
        return "🍔";
    }

    if (name === "Grilled Sandwich") {
        return "🥪";
    }

    return "🍽️";
}


// =====================================================
// CHECKOUT
// =====================================================

// =====================================================
// CHECKOUT
// =====================================================

let selectedPickupSlot = "";


// Open checkout
function proceedToCheckout() {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty."
        );

        return;
    }


    // Close cart drawer
    closeCart();


    // Render checkout items
    renderCheckout();


    // Open checkout modal
    const checkoutModal =
        document.getElementById(
            "checkoutModal"
        );


    if (checkoutModal) {

        checkoutModal.classList.add("show");

    }

}


// Close checkout
function closeCheckout() {

    const checkoutModal =
        document.getElementById(
            "checkoutModal"
        );


    if (checkoutModal) {

        checkoutModal.classList.remove("show");

    }

}


// =====================================================
// RENDER CHECKOUT
// =====================================================

function renderCheckout() {

    const checkoutItems =
        document.getElementById(
            "checkoutItems"
        );

    const checkoutTotal =
        document.getElementById(
            "checkoutTotal"
        );


    if (!checkoutItems || !checkoutTotal) {
        return;
    }


    checkoutItems.innerHTML = "";


    cart.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;


        const div =
            document.createElement("div");


        div.className =
            "checkout-order-item";


        div.innerHTML = `

            <div class="checkout-order-item-left">

                <div class="checkout-order-icon">
                    ${getFoodEmoji(item.name)}
                </div>

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <span>
                        Quantity: ${item.quantity}
                    </span>

                </div>

            </div>


            <div class="checkout-order-price">
                ₹${itemTotal}
            </div>

        `;


        checkoutItems.appendChild(div);

    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    checkoutTotal.innerText =
        `₹${total}`;

}


// =====================================================
// PICKUP SLOT
// =====================================================

function selectPickupSlot(button, slot) {

    const allSlots =
        document.querySelectorAll(
            ".pickup-slot"
        );


    allSlots.forEach(slotButton => {

        slotButton.classList.remove(
            "selected"
        );

    });


    button.classList.add("selected");


    selectedPickupSlot = slot;


    showToast(
        `Pickup slot selected: ${slot}`
    );

}

// =====================================================
// LOGIN
// =====================================================

function openLogin() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (modal) {

        modal.classList.add("show");

    }
}


function closeLogin() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (modal) {

        modal.classList.remove("show");

    }
}


function login() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "loginPassword"
        ).value.trim();


    if (
        email === "" ||
        password === ""
    ) {

        showToast(
            "Please fill all fields."
        );

        return;
    }


    closeLogin();


    showToast(
        "Login successful ✓"
    );
}


// =====================================================
// REGISTER
// =====================================================

function openRegister() {

    closeLogin();


    const modal =
        document.getElementById(
            "registerModal"
        );


    if (modal) {

        modal.classList.add("show");

    }
}


function closeRegister() {

    const modal =
        document.getElementById(
            "registerModal"
        );


    if (modal) {

        modal.classList.remove("show");

    }
}


function register() {

    const name =
        document.getElementById(
            "registerName"
        ).value.trim();


    const email =
        document.getElementById(
            "registerEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "registerPassword"
        ).value.trim();


    if (
        name === "" ||
        email === "" ||
        password === ""
    ) {

        showToast(
            "Please fill all fields."
        );

        return;
    }


    closeRegister();


    showToast(
        "Account created successfully ✓"
    );
}


// =====================================================
// MENU NAVIGATION
// =====================================================

function goToMenu() {

    const menu =
        document.getElementById(
            "menu"
        );


    if (menu) {

        menu.scrollIntoView({
            behavior: "smooth"
        });

    }
}


function viewFullMenu() {

    goToMenu();


    showToast(
        "Today's menu is ready!"
    );
}


// =====================================================
// TOAST
// =====================================================

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) return;


    toast.innerText = message;


    toast.classList.add("show");


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );
}


// =====================================================
// CLOSE MODAL BY CLICKING OUTSIDE
// =====================================================

window.addEventListener(
    "click",
    function(event) {

        const loginModal =
            document.getElementById(
                "loginModal"
            );


        const registerModal =
            document.getElementById(
                "registerModal"
            );


        if (
            event.target ===
            loginModal
        ) {

            closeLogin();

        }


        if (
            event.target ===
            registerModal
        ) {

            closeRegister();

        }

    }
);


// =====================================================
// ESC KEY
// =====================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeLogin();

            closeRegister();

        }

    }
);


// =====================================================
// START
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        console.log(
            "SmartCanteen loaded successfully!"
        );

    }
);
// =====================================================
// PLACE ORDER
// =====================================================

function placeOrder() {

    const name =
        document.getElementById("checkoutName")
            .value.trim();

    const collegeId =
        document.getElementById("checkoutCollegeId")
            .value.trim();


    // Validate student details

    if (name === "" || collegeId === "") {

        showToast(
            "Please enter your name and College ID."
        );

        return;
    }


    // Validate pickup slot

    if (selectedPickupSlot === "") {

        showToast(
            "Please select a pickup slot."
        );

        return;
    }


    // Calculate total

    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    // Generate Order ID

    const orderId =
        "SC-" +
        Date.now()
            .toString()
            .slice(-6);


    // Close checkout

    closeCheckout();


    // Fill confirmation details

    document.getElementById(
        "confirmationOrderId"
    ).innerText = orderId;


    document.getElementById(
        "confirmationPickup"
    ).innerText = selectedPickupSlot;


    document.getElementById(
        "confirmationTotal"
    ).innerText = `₹${total}`;


    // Open confirmation

    const confirmationModal =
        document.getElementById(
            "confirmationModal"
        );


    confirmationModal.classList.add("show");


    // Clear cart

    cart = [];

    updateCartCount();


    // Reset pickup slot

    selectedPickupSlot = "";

}


// =====================================================
// CLOSE CONFIRMATION
// =====================================================

function closeConfirmation() {

    const confirmationModal =
        document.getElementById(
            "confirmationModal"
        );


    if (confirmationModal) {

        confirmationModal.classList.remove(
            "show"
        );

    }

}