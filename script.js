// --- MENU FUNCTIONALITY ---
let currentTotal = 0;

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        // Get the price text (e.g., "₹320"), remove the "₹", and convert to a number
        const priceText = this.parentElement.querySelector('p[style*="bold"]').innerText;
        const price = parseInt(priceText.replace('₹', ''));
        
        currentTotal += price;

        // Save to browser memory so other pages can see it
        localStorage.setItem('cartTotal', currentTotal);

        const itemName = this.parentElement.querySelector('h3').innerText;
        alert(`${itemName} added! Current Total: ₹${currentTotal}`);
    });
});

// --- SPLIT BILL FUNCTIONALITY ---

// This runs automatically when the Split Bill page loads
window.onload = function() {
    const savedTotal = localStorage.getItem('cartTotal') || "0";
    
    const totalInput = document.getElementById('total');         // Hidden input for math
    const totalDisplay = document.getElementById('total-display'); // Visible text for user
    
    if (totalInput && totalDisplay) {
        totalInput.value = savedTotal;
        totalDisplay.innerText = savedTotal;
    }
};

function calculateSplit() {
    const total = document.getElementById('total').value;
    const people = document.getElementById('people').value;
    const resultDisplay = document.getElementById('result');
    const resultBox = document.getElementById('result-box');

    if (total && people && people > 0) {
        const share = (total / people).toFixed(2);
        resultDisplay.innerText = `₹${share}`;
        resultBox.style.display = "block";
    } else {
        alert("Please enter a valid amount and number of people.");
        resultBox.style.display = "none";
    }
}

// Optional: Clear Cart function
function clearCart() {
    localStorage.removeItem('cartTotal');
    currentTotal = 0;
    alert("Cart cleared!");
    location.reload();
}
// --- CHAT BOT LOGIC ---

function sendMessage() {
    const inputField = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const userText = inputField.value.trim();

    if (userText === "") return;

    // 1. Display User Message
    appendMessage(userText, 'user-msg');
    inputField.value = "";

    // 2. Simple Bot Brain (Logic)
    setTimeout(() => {
        let botResponse = "I'm sorry, I didn't quite get that. Could you try asking about 'delivery', 'menu', or 'refund'?";
        
        const lowerText = userText.toLowerCase();
        
        if (lowerText.includes("hello") || lowerText.includes("hi")) {
            botResponse = "Hello! Hope you're hungry. What can I do for you?";
        } else if (lowerText.includes("order") || lowerText.includes("delivery")) {
            botResponse = "Orders usually take 30-45 minutes. You can check the Menu page for more!";
        } else if (lowerText.includes("bill") || lowerText.includes("split")) {
            botResponse = "You can use our 'Split Bill' feature in the menu bar to divide costs with friends!";
        } else if (lowerText.includes("price") || lowerText.includes("cheap")) {
            botResponse = "Our prices start from just ₹80! Check our Butter Naan.";
        } else if (lowerText.includes("refund")) {
            botResponse = "For refunds, please provide your Order ID. Our agent will contact you shortly.";
        }
        else if (lowerText.includes("food") || lowerText.includes("hungry") || lowerText.includes("eat")) {
            botResponse = "We have some amazing North Indian dishes! Our Chicken Biryani and Paneer Butter Masala are bestsellers. Check the 'Menu' page to order! 🥘";
        }
        else if (lowerText.includes("menu")) {
            botResponse = "You can view our tasty North Indian menu on the Menu page! We have everything from Starters to Desserts. 📜";
        } 
        else if (lowerText.includes("delivery") || lowerText.includes("time")) {
            botResponse = "We usually deliver within 30-45 minutes in your area. Hang tight! 🚚";
        } 
        else if (lowerText.includes("bill") || lowerText.includes("total") || lowerText.includes("money")) {
            let currentCart = localStorage.getItem('cartTotal') || 0;
            botResponse = `Your current menu total is ₹${currentCart}. You can use the 'Split Bill' page to divide this with friends! 💳`;
        }

        appendMessage(botResponse, 'bot-msg');
    }, 600); // 0.6 second delay to make it feel like it's "thinking"
}

function appendMessage(text, className) {
    const chatBox = document.getElementById('chatBox');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg', className);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    
    // Auto-scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Allow sending message with 'Enter' key
document.getElementById('userInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});