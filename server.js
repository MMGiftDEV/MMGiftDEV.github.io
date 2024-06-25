document.addEventListener('DOMContentLoaded', function() {
    sendWebhookToDiscord();
});

function sendWebhookToDiscord() {
    var webhookURL = 'https://discord.com/api/webhooks/your-webhook-url';

    var payload = {
        content: 'Hello Discord!'
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Webhook sent successfully');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}