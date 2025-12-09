// Wait for .whitespace-pre-wrap elements to appear
function waitForMessages() {
  return new Promise(resolve => {
    const check = () => {
      const messages = document.querySelectorAll('.whitespace-pre-wrap');
      if (messages.length) resolve(messages);
      else setTimeout(check, 500); // shorter interval for better UX
    };
    check();
  });
}

// Create the floating 📜 button
function createFloatingButton() {
  if (document.getElementById('floating-scroll-button')) return;

  const btn = document.createElement('button');
  btn.id = 'floating-scroll-button';
  btn.innerHTML = `
  <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
    <path d="M4 4h16v12H5.17L4 17.17V4zm0-2a2 2 0 0 0-2 2v20l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4z"/>
  </svg>`;
  btn.style.padding = '8px'; // optional
  btn.style.display = 'flex';
  btn.style.justifyContent = 'center';
  btn.style.alignItems = 'center';

  Object.assign(btn.style, {
    position: 'fixed',
    top: '88px',
    right: '30px',
    zIndex: 99999,
    width: '40px',
    height: '40px',
    fontSize: '24px',
    borderRadius: '50%',
    backgroundColor: '#212121e6',
    boxShadow: '0 2px 2px rgba(0,0,0,0.2)',
    color: 'white',
    border: 'solid 1px rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
  });
  document.body.appendChild(btn);
  return btn;
}

// Show the message list in a popup
function showMessageList(messages) {
  // Remove existing list if open
  const existing = document.getElementById('message-popup-list');
  if (existing) {
    existing.remove();
    return; // Toggle behavior
  }

  const list = document.createElement('div');
  list.id = 'message-popup-list';

  Object.assign(list.style, {
    position: 'fixed',
    top: '138px',
    right: '20px',
    maxHeight: '440px',
    width: '300px',
    overflowY: 'auto',
    backgroundColor: 'rgb(47, 47, 47)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    zIndex: 99999,
    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.15)',
    padding: '8px',
  });

  /*messages.forEach((msg, i) => {
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.style.cssText = 'margin-left: 10px; background-color: #10a37f; color: white; border: none; border-radius: 4px; cursor: pointer; padding: 5px 10px; font-size: 12px;';
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering the message click event
      navigator.clipboard.writeText(msg.innerText).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
        }, 2000);
      });
    });
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'space-between';
    container.style.alignItems = 'center';

    const textSpan = document.createElement('span');
    textSpan.textContent = `${i + 1}. ${text}`;

    container.appendChild(textSpan);
    container.appendChild(copyBtn);
    item.appendChild(container);

    const text = msg.innerText.slice(0, 50).replace(/\n/g, ' ') + '...';
    const item = document.createElement('div');
    item.textContent = `${i + 1}. ${text}`;
    item.style.padding = '10px';
    item.style.cursor = 'pointer';
    item.style.borderRadius = '4px';
    item.style.transition = 'background-color 0.3s';
    item.style.fontSize = '14px';
    item.style.fontWeight = '400';
    item.style.borderBottom = '1px solid #444';
    item.addEventListener('click', () => {
      msg.scrollIntoView({ behavior: 'smooth', block: 'start' });//center
    });
    item.addEventListener('mouseover', () => {
      item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    item.addEventListener('mouseout', () => {
      item.style.backgroundColor = 'transparent';
    });
    list.appendChild(item);
  });*/

  messages.forEach((msg, i) => {
    const item = document.createElement('div');
    item.style.padding = '10px';
    item.style.cursor = 'pointer';
    item.style.borderRadius = '4px';
    item.style.transition = 'background-color 0.3s';
    item.style.fontSize = '14px';
    item.style.borderBottom = '1px solid #444';

    const previewText = msg.innerText.slice(0, 40).replace(/\n/g, ' ') + '...';
    const textSpan = document.createElement('span');
    textSpan.textContent = `${i + 1}. ${previewText}`;

    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.style.cssText = `
      margin-left: 10px;
      background-color: #212121e6;
      color: white;
      border: solid 1px rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      cursor: pointer;
      padding: 5px 10px;
      font-size: 12px;
    `;

    item.addEventListener('mouseenter', () => {
      item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });

    item.addEventListener('mouseleave', () => {
      item.style.backgroundColor = 'transparent';
    });

    // Highlight the button when hovered
    copyBtn.addEventListener('mouseenter', () => {
      copyBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
    });

    copyBtn.addEventListener('mouseleave', () => {
      copyBtn.style.backgroundColor = '#212121e6';
    });



    // Change text color on hover
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(msg.innerText).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy', 2000);
      });
    });

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'space-between';
    container.style.alignItems = 'center';
    container.appendChild(textSpan);
    container.appendChild(copyBtn);

    item.appendChild(container);
    item.addEventListener('click', () => {
      msg.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    list.appendChild(item);
  });


  // Only add custom scrollbar styles once
  if (!document.getElementById('custom-scroll-style')) {
    const style = document.createElement('style');
    style.id = 'custom-scroll-style';
    style.textContent = `
      #message-popup-list::-webkit-scrollbar {
        width: 8px;
      }
      #message-popup-list::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0);
      }
      #message-popup-list::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 4px;
      }
      #message-popup-list::-webkit-scrollbar-thumb:hover {
        background-color: #aaa;
      }

      /* Firefox support */
      #message-popup-list {
        scrollbar-width: thin;
        scrollbar-color: #888 rgba(255, 255, 255, 0.05);
      }
    `;
    document.head.appendChild(style);
  }


  /*const close = document.createElement('div');
  close.textContent = "Close";
  close.style.cssText = "position:absolute;top:5px;right:10px;cursor:pointer;color:white;";
  close.onclick = () => list.remove();
  list.appendChild(close);*/

  document.body.appendChild(list);
}

// Observe dynamic DOM changes to re-add button if needed
function observePage() {
  const observer = new MutationObserver(() => {
    if (!document.getElementById('floating-scroll-button')) {
      const btn = createFloatingButton();
      btn.addEventListener('click', async () => {
        const messages = await waitForMessages();
        showMessageList([...messages]);
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Initial execution
(function () {
  observePage();

  const btn = createFloatingButton();

  btn.addEventListener('click', async () => {
    const messages = await waitForMessages();
    showMessageList([...messages]);
  });
})();
