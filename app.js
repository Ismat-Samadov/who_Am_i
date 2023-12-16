function getPublicIP() {
    return new Promise((resolve, reject) => {
        fetch('https://httpbin.org/ip')
            .then(response => response.json())
            .then(data => resolve(data.origin))
            .catch(error => reject(error));
    });
}

function getIPGeolocation(ip) {
    return new Promise((resolve, reject) => {
        fetch(`https://ipapi.co/${ip}/json`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

function updateUI(geolocation) {
    const infoElement = document.getElementById('info');
    if (geolocation) {
        let infoHTML = '<h2>Geolocation Data:</h2>';
        for (const [key, value] of Object.entries(geolocation)) {
            infoHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        }
        infoElement.innerHTML = infoHTML;
    } else {
        infoElement.innerHTML = '<p>Failed to retrieve geolocation data.</p>';
    }
}


async function main() {
    try {
        const publicIP = await getPublicIP();
        const geolocation = await getIPGeolocation(publicIP);
        console.log(geolocation);
        updateUI(geolocation);
    } catch (error) {
        console.error(error);
        const infoElement = document.getElementById('info');
        infoElement.innerHTML = '<p>Failed to retrieve IP or geolocation data.</p>';
    }
}


window.onload = main;
