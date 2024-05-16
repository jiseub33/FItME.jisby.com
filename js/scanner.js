let stream;

async function startCamera() {
    const videoElement = document.getElementById('video');

    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user'
            }
        });

        videoElement.srcObject = stream;
    } catch (error) {
        console.error('Error accessing the camera: ', error);
    }
}

function stopCamera() {
    const videoElement = document.getElementById('video');
    const snapshotElement = document.getElementById('snapshot');
    const stopButton = document.getElementById('stopButton');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const aiContent = document.getElementById('aiContent');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Hide the stop button and the video element
    stopButton.style.display = 'none';
    videoElement.style.display = 'none';

    // Show the loading indicator
    loadingIndicator.style.display = 'block';

    // Set the canvas size to the video size
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Get the data URL of the image
    const imageDataURL = canvas.toDataURL('image/png');

    // Set the src of the img element to the data URL
    snapshotElement.src = imageDataURL;
    snapshotElement.style.display = 'block';

    // Stop all video tracks
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    // Hide the loading indicator and show the AI content after 10 seconds
    setTimeout(() => {
        loadingIndicator.style.display = 'none';
        aiContent.style.display = 'block';
    }, 10000);
}

document.addEventListener('DOMContentLoaded', (event) => {
    startCamera();

    const stopButton = document.getElementById('stopButton');
    stopButton.addEventListener('click', stopCamera);
});
