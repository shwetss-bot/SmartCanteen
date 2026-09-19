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
        loadMyOrders();
        loadAdminDashboard();
        loadAdminOrders();

        // Check admin login state
        const isAdminLoggedIn =
            localStorage.getItem(
                "smartCanteenAdminLoggedIn"
            ) === "true";

        const dashboard =
            document.getElementById("admin-dashboard");

        if (dashboard) {

            if (isAdminLoggedIn) {

                dashboard.style.display = "block";

            } else {

                dashboard.style.display = "none";

            }
        }

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

    // =====================================================
// SAVE ORDER
// =====================================================

const newOrder = {
    orderId: orderId,
    name: name,
    collegeId: collegeId,
    items: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
    })),
    pickupSlot: selectedPickupSlot,
    total: total,
    status: "Pending",
    orderTime: new Date().toLocaleString()
};

let orders =
    JSON.parse(
        localStorage.getItem("smartCanteenOrders")
    ) || [];

orders.push(newOrder);

localStorage.setItem(
    "smartCanteenOrders",
    JSON.stringify(orders)
);


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

// =====================================================
// ORDER STATUS CLASS
// =====================================================

function getStatusClass(status, step) {

    const statusSteps = {
        "Pending": 1,
        "Preparing": 2,
        "Ready": 3,
        "Collected": 4
    };

    const currentStep = statusSteps[status] || 1;

    return step <= currentStep ? "active" : "";
}
// =====================================================
// MY ORDERS
// =====================================================

function loadMyOrders() {

    const ordersContainer =
        document.getElementById("ordersContainer");

    if (!ordersContainer) return;

    const orders =
        JSON.parse(
            localStorage.getItem("smartCanteenOrders")
        ) || [];

    // No orders
    if (orders.length === 0) {

        ordersContainer.innerHTML = `
            <div class="no-orders">
                <h3>No orders yet 🍽️</h3>
                <p>Your placed orders will appear here.</p>
            </div>
        `;

        return;
    }

    // Display orders
    ordersContainer.innerHTML =
        orders.map(order => `

            <div class="order-card">

                <div class="order-header">
                    <div>
                        <span>Order ID</span>
                        <h3>${order.orderId}</h3>
                    </div>

                    <div class="order-status">

    <div class="status-step ${getStatusClass(order.status, 1)}">
        <span>1</span>
        <small>Pending</small>
    </div>

    <div class="status-line"></div>

    <div class="status-step ${getStatusClass(order.status, 2)}">
        <span>2</span>
        <small>Preparing</small>
    </div>

    <div class="status-line"></div>

    <div class="status-step ${getStatusClass(order.status, 3)}">
        <span>3</span>
        <small>Ready</small>
    </div>

    <div class="status-line"></div>

    <div class="status-step ${getStatusClass(order.status, 4)}">
        <span>4</span>
        <small>Collected</small>
    </div>

</div>

                <div class="order-details">

                    <p>
                        <strong>Pickup:</strong>
                        ${order.pickupSlot}
                    </p>

                    <p>
                        <strong>Total:</strong>
                        ₹${order.total}
                    </p>

                    <p>
                        <strong>Ordered:</strong>
                        ${order.orderTime}
                    </p>

                </div>

                <div class="order-items">

                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>
                                ${item.name} × ${item.quantity}
                            </span>

                            <span>
                                ₹${item.price * item.quantity}
                            </span>
                        </div>
                    `).join("")}

                </div>

            </div>

        `).join("");
        

}
// =====================================================
// ADMIN DASHBOARD STATS
// =====================================================

function loadAdminDashboard() {

    const orders =
        JSON.parse(
            localStorage.getItem("smartCanteenOrders")
        ) || [];

    const totalOrders =
        document.getElementById("totalOrders");

    if (totalOrders) {
        totalOrders.innerText = orders.length;
    }

    const pendingOrders =
        orders.filter(
            order => order.status === "Pending"
        ).length;

    const pendingElement =
        document.getElementById("pendingOrders");

    if (pendingElement) {
        pendingElement.innerText = pendingOrders;
    }

    const preparingOrders =
        orders.filter(
            order => order.status === "Preparing"
        ).length;

    const preparingElement =
        document.getElementById("preparingOrders");

    if (preparingElement) {
        preparingElement.innerText = preparingOrders;
    }

    const revenue =
        orders.reduce(
            (sum, order) =>
                sum + Number(order.total),
            0
        );

    const revenueElement =
        document.getElementById("totalRevenue");

    if (revenueElement) {
        revenueElement.innerText = `₹${revenue}`;
    }
}
// =====================================================
// ADMIN INCOMING ORDERS
// =====================================================

function loadAdminOrders() {

    const container =
        document.getElementById("adminOrdersContainer");

    if (!container) return;

    const orders =
        JSON.parse(
            localStorage.getItem("smartCanteenOrders")
        ) || [];

    if (orders.length === 0) {

        container.innerHTML = `
            <div class="no-orders">
                <h3>No orders yet 🍽️</h3>
                <p>Student orders will appear here.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = orders.map(order => `

        <div class="admin-order-card">

            <div class="admin-order-top">

                <div>
                    <span class="admin-order-label">
                        Order ID
                    </span>

                    <h3>${order.orderId}</h3>
                </div>

                <span class="admin-order-status">
                    ${order.status}
                </span>

            </div>

            <div class="admin-order-info">

                <p>
                    <strong>Student:</strong>
                    ${order.name}
                </p>

                <p>
                    <strong>College ID:</strong>
                    ${order.collegeId}
                </p>

                <p>
                    <strong>Pickup:</strong>
                    ${order.pickupSlot}
                </p>

                <p>
                    <strong>Total:</strong>
                    ₹${order.total}
                </p>

            </div>

            <div class="admin-order-items">

                ${order.items.map(item => `
                    <div class="admin-item">
                        <span>
                            ${item.name} × ${item.quantity}
                        </span>

                        <span>
                            ₹${item.price * item.quantity}
                        </span>
                    </div>
                `).join("")}

            </div>

            <div class="admin-order-actions">

                <button onclick="updateOrderStatus('${order.orderId}', 'Preparing')">
                    🍳 Preparing
                </button>

                <button onclick="updateOrderStatus('${order.orderId}', 'Ready')">
                    ✅ Ready
                </button>

                <button onclick="updateOrderStatus('${order.orderId}', 'Collected')">
                    📦 Collected
                </button>

            </div>

        </div>

    `).join("");
}
// =====================================================
// UPDATE ORDER STATUS
// =====================================================

function updateOrderStatus(orderId, newStatus) {

    let orders =
        JSON.parse(
            localStorage.getItem("smartCanteenOrders")
        ) || [];

    const order =
        orders.find(
            order => order.orderId === orderId
        );

    if (!order) return;

    order.status = newStatus;

    localStorage.setItem(
        "smartCanteenOrders",
        JSON.stringify(orders)
    );

    // Refresh admin dashboard
    loadAdminDashboard();
    loadAdminOrders();

    // Refresh student orders
    loadMyOrders();

    showToast(
        `Order ${orderId} is now ${newStatus} ✓`
    );
}
// =====================================================
// ADMIN LOGIN
// =====================================================

function openAdminLogin() {

    const modal =
        document.getElementById("adminLoginModal");

    if (modal) {
        modal.classList.add("active");
    }
}


function closeAdminLogin() {

    const modal =
        document.getElementById("adminLoginModal");

    if (modal) {
        modal.classList.remove("active");
    }
}


function adminLogin() {

    const email =
        document.getElementById("adminEmail").value.trim();

    const password =
        document.getElementById("adminPassword").value.trim();


    const adminEmail =
        "admin@smartcanteen.com";

    const adminPassword =
        "admin123";


    if (
    email === adminEmail &&
    password === adminPassword
) {

    // Save admin login state
    localStorage.setItem(
        "smartCanteenAdminLoggedIn",
        "true"
    );

    closeAdminLogin();

    const dashboard =
        document.getElementById("admin-dashboard");

    if (dashboard) {

        dashboard.style.display = "block";

        dashboard.scrollIntoView({
            behavior: "smooth"
        });
    }

    showToast("Admin login successful ✓");
    }
} 
    
    



// =====================================================
// ADMIN LOGOUT
// =====================================================

function adminLogout() {

    // Remove admin login state
    localStorage.removeItem(
        "smartCanteenAdminLoggedIn"
    );

    // Hide admin dashboard
    const dashboard =
        document.getElementById("admin-dashboard");

    if (dashboard) {
        dashboard.style.display = "none";
    }

    // Go back to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    showToast("Admin logged out ✓");
}
