// Demo data.
// Sau này có thể thay phần này bằng fetch() tới ASP.NET Core Web API.
const products = [
    { id: 1, name: "Paracetamol 500mg", category: "Thuốc giảm đau", price: 25000, icon: "💊", rating: 4.9 },
    { id: 2, name: "Vitamin C 500mg", category: "Vitamin", price: 60000, icon: "🍊", rating: 4.8 },
    { id: 3, name: "Nhiệt kế điện tử", category: "Thiết bị y tế", price: 85000, icon: "🌡️", rating: 4.7 },
    { id: 4, name: "Kem dưỡng ẩm", category: "Dược mỹ phẩm", price: 145000, icon: "🧴", rating: 4.8 },
    { id: 5, name: "Nước rửa tay", category: "Chăm sóc cá nhân", price: 42000, icon: "🧼", rating: 4.6 },
    { id: 6, name: "Siro ho trẻ em", category: "Mẹ & Bé", price: 95000, icon: "🍼", rating: 4.9 },
    { id: 7, name: "Băng cá nhân", category: "Thiết bị y tế", price: 18000, icon: "🩹", rating: 4.7 },
    { id: 8, name: "Omega 3", category: "Vitamin", price: 220000, icon: "💚", rating: 4.8 }
];

let cart = JSON.parse(localStorage.getItem("medcare_cart") || "[]");

const productList = document.getElementById("productList");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

function formatPrice(value) {
    return value.toLocaleString("vi-VN") + "đ";
}

function renderProducts(data) {
    productList.innerHTML = "";

    if (data.length === 0) {
        productList.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
        return;
    }

    data.forEach(product => {
        const card = document.createElement("article");
        card.className = "product";

        card.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-body">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <div class="rating">★ ${product.rating}</div>
                <div class="price">${formatPrice(product.price)}</div>
                <button class="add-cart" onclick="addToCart(${product.id})">
                    Thêm vào giỏ
                </button>
            </div>
        `;

        productList.appendChild(card);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const item = cart.find(p => p.id === productId);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem("medcare_cart", JSON.stringify(cart));
    updateCartCount();
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function filterProducts() {
    const keyword = searchInput.value.trim().toLowerCase();

    let result = products.filter(product =>
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
    );

    if (sortSelect.value === "low") {
        result.sort((a, b) => a.price - b.price);
    }

    if (sortSelect.value === "high") {
        result.sort((a, b) => b.price - a.price);
    }

    renderProducts(result);
}

document.getElementById("searchBtn").addEventListener("click", filterProducts);
searchInput.addEventListener("input", filterProducts);
sortSelect.addEventListener("change", filterProducts);

document.getElementById("cartBtn").addEventListener("click", () => {
    showToast(`Giỏ hàng hiện có ${cart.reduce((t, i) => t + i.quantity, 0)} sản phẩm`);
});

renderProducts(products);
updateCartCount();

/*
Khi tích hợp ASP.NET Core Web API, có thể thay products bằng:

const API_BASE_URL = "https://localhost:7000/api";

async function getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    return await response.json();
}

Sau đó gọi getProducts() thay cho dữ liệu mẫu.
*/
