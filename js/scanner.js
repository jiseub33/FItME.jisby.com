// barcode-scanner.js

// Function to initialize barcode scanner
function initializeScanner() {
    const video = document.getElementById('barcode-video');

    // Check if getUserMedia is available
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(function (stream) {
                // Set the video source to the camera stream
                video.srcObject = stream;

                // Initialize barcode scanner library (e.g., QuaggaJS)
                // Set up event listeners to handle barcode detection

                // Example event listener for successful barcode detection
                video.addEventListener('barcode-detected', function(event) {
                    const barcodeNumber = event.detail.barcodeNumber;
                    navigateToURL(barcodeNumber);
                });
            })
            .catch(function (error) {
                console.error('Error accessing camera:', error);
            });
    } else {
        console.error('getUserMedia is not supported');
    }
}

// Function to navigate to URL with barcode number
function navigateToURL(barcodeNumber) {
    const url = 'https://example.com/' + barcodeNumber; // Replace 'example.com' with your actual domain
    window.location.href = url;
}

// Call the initializeScanner function when the page loads
window.onload = function () {
    initializeScanner();
};
