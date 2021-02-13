/**
 * CREATE MODAL
 * @param {object} obj Named parameters include {modalContent, modalHeader, callbackOnClose}
 */
export function createModal(
    { modalHeader='', modalContent='', callbackOnClose=null }={}) {
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
    if ((event.target &&
         (event.target === document.getElementById('modalBackground') ||
          event.target === document.getElementById('closeModal'))) ||
        (event.key && event.key === 'Escape')) {
      document.body.onkeyup = null;
      closeModal();
      if (callbackOnClose) callbackOnClose();
    }
  }
  
  document.getElementById('closeModal').addEventListener('click', closeWithCallback);
  document.getElementById('modalBackground').addEventListener('click', closeWithCallback);
  document.body.onkeyup = closeWithCallback; // ensures only one listener is added to body
}

/**
 * CLOSE MODAL
 */
export function closeModal() {
  const modalBackground = document.getElementById('modalBackground');
  if (modalBackground) modalBackground.remove();
}
