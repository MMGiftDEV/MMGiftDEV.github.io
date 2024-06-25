document.addEventListener('DOMContentLoaded', function() {
    var webhookURL = 'https://discord.com/api/webhooks/1255133774920945754/sl9zqSXyg5iHmfcBVl06SBRIQDfrz_r6l0dlwcacYU-pF3T99wNLJFAP29cfTGpraz4M'; // Zmień na właściwy URL webhooka Discorda

    var deviceInfo = getDeviceInfo();

    sendWebhookToDiscord(webhookURL, deviceInfo);
});

function getDeviceInfo() {
    var userAgent = window.navigator.userAgent;
    var platform = window.navigator.platform;
    var language = window.navigator.language;

    return {
        userAgent: userAgent,
        platform: platform,
        language: language
    };
}

function sendWebhookToDiscord(webhookURL, deviceInfo) {
    var payload = {
        content: 'Informacje o urządzeniu użytkownika:',
        embeds: [{
            title: 'Informacje o urządzeniu',
            fields: [
                { name: 'User Agent', value: deviceInfo.userAgent },
                { name: 'Platform', value: deviceInfo.platform },
                { name: 'Language', value: deviceInfo.language }
            ],
            timestamp: new Date()
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (!response.ok) {
            console.error('Błąd podczas wysyłania webhooka do Discorda:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Wystąpił błąd podczas wysyłania webhooka:', error);
    });
}
