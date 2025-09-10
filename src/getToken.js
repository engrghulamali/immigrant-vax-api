import fetch from 'node-fetch';

const API_KEY = 'AIzaSyDY-9k7rIqsyv1fwpCqEE_byYDzBgZoy1A'; // Get this from Firebase console
const email = 'ghulamalisanpal@gmail.com';
const password = '12345678';

const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email,
    password,
    returnSecureToken: true
  })
})
  .then(res => res.json())
  .then(data => {
    if (data.idToken) {
      console.log('✅ Firebase ID Token (Bearer):');
      console.log(data.idToken);
    } else {
      console.error('❌ Failed to get token:', data);
    }
  });
