// Test script to verify JWT token is being sent
// Run in browser console after login

console.log('=== JWT TOKEN TEST ===');

// 1. Check if token exists
const token = localStorage.getItem('token');
console.log('1. Token exists:', !!token);
console.log('   Token:', token ? token.substring(0, 20) + '...' : 'NOT FOUND');

// 2. Decode token (basic decode, not verification)
if (token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('2. Token payload:', payload);
    console.log('   User role:', payload.role);
    console.log('   Is Admin:', payload.role === 'Admin');
  } catch (e) {
    console.error('   Failed to decode token');
  }
}

// 3. Test API call
console.log('3. Testing API call to /api/users...');
fetch('/api/users', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => {
    console.log('   Status:', res.status);
    if (res.status === 200) {
      console.log('   ✅ SUCCESS - Users fetched!');
      return res.json();
    } else if (res.status === 401) {
      console.log('   ❌ UNAUTHORIZED - Token invalid or missing');
    } else if (res.status === 403) {
      console.log('   ❌ FORBIDDEN - Not admin role');
    } else {
      console.log('   ❌ ERROR - Status:', res.status);
    }
  })
  .then(data => {
    if (data) {
      console.log('   Users count:', data.length);
      console.log('   First user:', data[0]?.name);
    }
  })
  .catch(err => {
    console.error('   ❌ NETWORK ERROR:', err.message);
    console.log('   Backend might not be running');
  });

console.log('=== TEST COMPLETE ===');
