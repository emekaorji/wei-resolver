import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import AddZeroesButton from './components/AddZeroesButton.jsx';

async function waitForIframeLoad(iframe) {
  return new Promise((resolve) => {
    iframe.addEventListener('load', resolve);
  });
}

function addButtonsToInputs() {
  document.querySelectorAll('iframe').forEach(async (iframe) => {
    await waitForIframeLoad(iframe);
    if (!iframe.contentDocument) return;

    const iframeDoc = iframe.contentDocument;
    const mainButton = document.getElementById('dropdownMenuButton3');
    const bgColor =
      mainButton?.computedStyleMap().get('background-color').toString() ||
      '#24262b';

    iframeDoc.querySelectorAll('[title="Add Zeroes"]').forEach((button) => {
      if (!button.parentElement.querySelector('.add-zeroes-button')) {
        const addZeroesButton = document.createElement('span');

        button.insertAdjacentElement('afterend', addZeroesButton);

        createRoot(addZeroesButton).render(
          <AddZeroesButton bgColor={bgColor} button={button} />
        );
      }
    });
  });
}

export default function App() {
  useEffect(() => {
    addButtonsToInputs();
    const observer = new MutationObserver(addButtonsToInputs);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
