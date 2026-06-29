const shareButton = document.querySelector('[data-copy-link]');
const toast = document.querySelector('.toast');
const shareField = document.querySelector('.share-url');
shareField.value = window.location.href;

async function copyLink() {
  const text = window.location.href;
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand('copy');
  field.remove();
  if (!copied) throw new Error('Copy command was blocked');
}

shareButton.addEventListener('click', async () => {
  try {
    await copyLink();
    toast.textContent = '作品链接已复制';
  } catch {
    shareField.focus();
    shareField.select();
    toast.textContent = '链接已选中，请按 Ctrl+C';
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
});
