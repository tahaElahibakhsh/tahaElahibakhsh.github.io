const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatForm = document.getElementById('chatForm');
const sendButton = document.getElementById('sendButton');

// پاسخ‌های مختلف ربات
const botResponses = {
    greetings: [
        "سلام! من Dorrex هستم، مشاور کریپتو شما 🤖",
        "درود! چطور می‌تونم در معاملات کمکتون کنم؟ 💼",
        "سلام عزیز! آماده‌ام تا راجع به بازار کریپتو صحبت کنیم 📈"
    ],
    bitcoin: [
        "بیت کوین امروز روند صعودی داره! قیمت فعلی حدود $43,000 📊",
        "BTC در حال تست مقاومت $45K هست. نظرم اینه که صبر کنید 🔍",
        "بیت کوین همیشه پادشاه بازار کریپتو بوده. الان وقت خوبی برای خرید تدریجی هست 👑"
    ],
    strategy: [
        "بهترین استراتژی: DCA (خرید تدریجی) + مدیریت ریسک قوی 💪",
        "همیشه فقط پولی رو سرمایه‌گذاری کن که از دست دادنش مشکلی نداشته باشی 🛡️",
        "ترکیب تحلیل تکنیکال و فاندامنتال کلید موفقیت در معاملاته 🔑"
    ],
    future: [
        "آینده کریپتو روشنه! تکنولوژی بلاک‌چین داره دنیا رو تغییر میده 🌟",
        "تا 2025 انتظار رشد قابل توجه بازار رو داریم، البته با نوسانات زیاد 📈",
        "Web3 و DeFi دارن اکوسیستم جدیدی می‌سازن. فرصت‌های زیادی در راهه 🚀"
    ],
    risk: [
        "قانون طلایی: هیچ‌وقت همه تخم‌مرغاتو تو یه سبد نذار! 🥚",
        "Stop Loss همیشه تنظیم کن و بهش پایبند باش 🛑",
        "حداکثر 2-3% از سرمایه رو در هر معامله ریسک کن ⚖️"
    ],
    default: [
        "سوال جالبی پرسیدی! بذار بیشتر بررسی کنم 🤔",
        "این موضوع پیچیده‌ست، ولی سعی می‌کنم ساده توضیح بدم 📚",
        "نظر من اینه که اول تحقیق کنی، بعد تصمیم بگیری 🔍",
        "بازار کریپتو غیرقابل پیش‌بینیه، ولی با استراتژی درست میشه موفق شد 💡"
    ]
};

// تشخیص نوع پیام و انتخاب پاسخ مناسب
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('سلام') || message.includes('درود') || message.includes('خوبی')) {
        return getRandomResponse(botResponses.greetings);
    } else if (message.includes('بیت') || message.includes('bitcoin') || message.includes('btc')) {
        return getRandomResponse(botResponses.bitcoin);
    } else if (message.includes('استراتژی') || message.includes('معامله') || message.includes('تریدینگ')) {
        return getRandomResponse(botResponses.strategy);
    } else if (message.includes('آینده') || message.includes('پیش‌بینی') || message.includes('2024') || message.includes('2025')) {
        return getRandomResponse(botResponses.future);
    } else if (message.includes('ریسک') || message.includes('خطر') || message.includes('ضرر')) {
        return getRandomResponse(botResponses.risk);
    } else {
        return getRandomResponse(botResponses.default);
    }
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// اضافه کردن پیام به چت
function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    // حذف پیام خوش‌آمدگویی اگر اولین پیام باشد
    const welcomeMessage = chatMessages.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// نمایش انیمیشن تایپ
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'typing-indicator';
    typingContent.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingContent);
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// ارسال پیام
function sendMessage(message) {
    if (!message.trim()) return;
    
    addMessage(message, 'user');
    chatInput.value = '';
    adjustTextareaHeight();
    
    // نمایش انیمیشن تایپ
    showTypingIndicator();
    
    // پاسخ ربات با تاخیر
    setTimeout(() => {
        hideTypingIndicator();
        const botResponse = getBotResponse(message);
        addMessage(botResponse, 'bot');
    }, 1000 + Math.random() * 1000);
}

// ارسال پیام پیشنهادی
function sendSuggestedMessage(message) {
    sendMessage(message);
}

// تنظیم ارتفاع textarea
function adjustTextareaHeight() {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
}

// Event listeners
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage(chatInput.value);
});

chatInput.addEventListener('input', adjustTextareaHeight);

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(chatInput.value);
    }
});

// فوکوس روی input هنگام لود صفحه
window.addEventListener('load', () => {
    chatInput.focus();
});

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'98076647c7e731e6',t:'MTc1ODA5OTQ4Mi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();