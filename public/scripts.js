const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');

const conversation = [];

// Quick topic buttons
document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const topic = btn.dataset.topic;
        input.value = `Tolong jelaskan dasar-dasar ${topic}`;
        input.focus();
    });
});

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const userMessage = input.value.trim();
    if (!userMessage) return;

    appendMessage('user', userMessage);
    input.value = '';
    setLoading(true);

    conversation.push({ role: 'user', text: userMessage });

    const botMsgEl = appendThinking();

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conversation })
        });

        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);

        const data = await response.json();
        const reply = data.result || 'Maaf, tidak ada respons dari server.';

        replaceThinking(botMsgEl, reply);
        conversation.push({ role: 'model', text: reply });
    } catch (error) {
        replaceThinking(botMsgEl, 'Gagal mendapat respons. Periksa koneksi dan coba lagi.');
        conversation.pop();
    } finally {
        setLoading(false);
    }
});

function appendMessage(sender, text) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('message', sender);

    const content = document.createElement('div');
    content.classList.add('message-content');
    content.innerHTML = formatText(text);

    wrapper.appendChild(content);
    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
    return wrapper;
}

function appendThinking() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('message', 'bot', 'thinking');

    const content = document.createElement('div');
    content.classList.add('message-content');
    content.innerHTML = '<span class="dots">EduBot sedang berpikir<span>.</span><span>.</span><span>.</span></span>';

    wrapper.appendChild(content);
    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
    return wrapper;
}

function replaceThinking(el, text) {
    el.classList.remove('thinking');
    el.querySelector('.message-content').innerHTML = formatText(text);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function setLoading(isLoading) {
    sendBtn.disabled = isLoading;
    input.disabled = isLoading;
    sendBtn.textContent = isLoading ? '...' : 'Kirim';
}

function formatText(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^\d+\.\s/gm, (m) => `<br>${m}`)
        .replace(/^[-•]\s/gm, '<br>• ')
        .replace(/\n/g, '<br>');
}
