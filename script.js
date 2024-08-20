document.getElementById('subscribeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const messageElement = document.getElementById('message');
    
    // Replace this URL with your actual API Gateway endpoint when you have it
    const apiUrl = 'https://9f6p27nxk3.execute-api.us-west-2.amazonaws.com/prod/subscribe';
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        messageElement.textContent = 'Subscription successful!';
        messageElement.style.color = 'green';
        document.getElementById('email').value = '';
    } catch (error) {
        console.error('Error:', error);
        messageElement.textContent = 'Error subscribing. Please try again.';
        messageElement.style.color = 'red';
    }
});