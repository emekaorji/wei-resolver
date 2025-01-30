const styleElem = document.createElement('style');
styleElem.innerHTML = 'body { background: red !important; }';
document.head.appendChild(styleElem);

function waitForIframeLoad(iframe) {
  return new Promise((resolve) => {
    iframe.addEventListener('load', () => {
      resolve();
    });
  });
}

const ARROW_SVG =
  '<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>';

class AddZeroesButton {
  constructor({ bgColor }) {
    const addZeroesButton = document.createElement('button');
    addZeroesButton.innerHTML = `<span>×10<sup>18</sup></span>|<span style>${ARROW_SVG}</span>`;
    addZeroesButton.className = 'add-zeros-button';
    addZeroesButton.type = 'button';

    addZeroesButton.style.position = 'absolute';
    addZeroesButton.style.marginLeft = '5px';
    addZeroesButton.style.fontSize = '12px';
    addZeroesButton.style.fontFamily = 'inherit';
    addZeroesButton.style.cursor = 'pointer';
    // addZeroesButton.style.backgroundColor = '#007bff';
    addZeroesButton.style.backgroundColor = bgColor;
    addZeroesButton.style.color = 'white';
    addZeroesButton.style.border = 'none';
    addZeroesButton.style.borderRadius = '0.375rem';
    addZeroesButton.style.padding = '0.15rem 0.3rem';

    return addZeroesButton;
  }
}

async function addButtonsToInputs() {
  const iframes = document.querySelectorAll('iframe');
  const mainButton = document.getElementById('dropdownMenuButton3');
  const bgColor =
    mainButton?.computedStyleMap().get('background-color').toString() ||
    '#24262b';

  iframes.forEach(async (iframe) => {
    await waitForIframeLoad(iframe);

    if (!iframe.contentDocument) return;

    const iframeDoc = iframe.contentDocument;

    const defaultAddZeroesButtons = iframeDoc.querySelectorAll(
      '[title="Add Zeroes"]'
    );

    defaultAddZeroesButtons.forEach((button) => {
      // Prevent duplicate buttons from being added
      if (!button.nextElementSibling?.classList.contains('add-zeros-button')) {
        const addZeroesButton = new AddZeroesButton({ bgColor });

        // Append the button to the DOM
        button.insertAdjacentElement('afterend', addZeroesButton);

        const input = button.parentElement.querySelector('input');

        addZeroesButton.addEventListener('click', () => {
          if (!input.value) {
            input.value += '1000000000000000000';
          } else {
            input.value += '000000000000000000';
          }
          input.focus();
        });
      }
    });
  });
}

// Subsequently monitor DOM changes to dynamically add zeroes buttons
const observer = new MutationObserver(addButtonsToInputs);
observer.observe(document.body, { childList: true, subtree: true });

// Initial call to add zeroes buttons
addButtonsToInputs();
