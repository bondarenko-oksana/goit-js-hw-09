const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS(STORAGE_KEY);
  if (lsData) {
    formData = lsData;
    formEl.elements.email.value = lsData.email || '';
    formEl.elements.message.value = lsData.message || '';
  }
});

formEl.addEventListener('input', (e) => {
  const userEmail = e.currentTarget.elements.email.value.trim();
  const userMessage = e.currentTarget.elements.message.value.trim();

  formData.email = userEmail;
  formData.message = userMessage;

  saveToLS(STORAGE_KEY, formData);
});

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  formEl.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    return JSON.parse(jsonData);
  } catch {
    return defaultValue;
  }
}




