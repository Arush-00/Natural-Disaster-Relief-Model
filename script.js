// Loading progress for <model-viewer>
const viewer = document.querySelector('#viewer');

const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;

  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};

viewer.addEventListener('progress', onProgress);

// Lets you choose ANY image from your computer as the background.
const scene = document.querySelector('#scene');
const picker = document.querySelector('#backgroundPicker');
const resetButton = document.querySelector('#resetBackground');

let temporaryBackgroundURL = null;

picker.addEventListener('change', () => {
  const file = picker.files && picker.files[0];
  if (!file) return;

  if (temporaryBackgroundURL) {
    URL.revokeObjectURL(temporaryBackgroundURL);
  }

  temporaryBackgroundURL = URL.createObjectURL(file);
  scene.style.backgroundImage = `url("${temporaryBackgroundURL}")`;
});

resetButton.addEventListener('click', () => {
  if (temporaryBackgroundURL) {
    URL.revokeObjectURL(temporaryBackgroundURL);
    temporaryBackgroundURL = null;
  }
  picker.value = '';
  scene.style.backgroundImage = 'url("background.jpg")';
});
