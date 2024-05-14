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
            })
            .catch(function (error) {
                console.error('Error accessing camera:', error);
            });
    } else {
        console.error('getUserMedia is not supported');
    }

    // Initialize barcode scanner library (e.g., QuaggaJS)
    // Set up event listeners to handle barcode detection
}

// Call the initializeScanner function when the page loads
window.onload = function () {
    initializeScanner();
};
