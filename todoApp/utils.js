/**
 * CREATE MODAL
 * @param {object} obj Named parameters include {modalContent, modalHeader, callbackOnClose}
 */
export function createModal(
    {modalContent='', modalHeader='', callbackOnClose=null}={}) {
  const modal = `<div id="modalBackground">
                  <div class="modalFrame">
                    <div class="modalHeader">
                      <span>${modalHeader}</span>
                      <span id="closeModal">&times;</span>
                    </div>
                    <div id="modalContent">
                      ${modalContent}
                    </div>
                  </div>
                </div>`;

  document.body.insertAdjacentHTML('beforeend', modal);
  
  // event listers to close modal and call callbackOnClose()
  const closeWithCallback = (event) => {
    if (event.target === document.getElementById('modalBackground') ||
        event.target === document.getElementById('closeModal')) {
      closeModal();
      if (callbackOnClose) callbackOnClose();
      document.body.removeEventListener('keyup', closeWithCallbackFromEsc);
    }
  }
  
  const closeWithCallbackFromEsc = (event) => {
    if (event.key === 'Escape') {
      closeWithCallback();
      if (callbackOnClose) callbackOnClose();
      document.body.removeEventListener('keyup', closeWithCallbackFromEsc);
    }
  }

  document.getElementById('closeModal').addEventListener('click', closeWithCallback);
  document.getElementById('modalBackground').addEventListener('click', closeWithCallback);
  document.body.addEventListener('keyup', closeWithCallbackFromEsc);
}

/**
 * CLOSE MODAL
 */
export function closeModal() {
  document.getElementById('modalBackground').remove();
}
