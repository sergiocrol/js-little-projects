const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Promp to select a media stream, pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        // For camera and audio
        //const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        videoElement.srcObject = mediaStream; 
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        console.log(error);
    }
}

button.addEventListener('click', async () => {
    // Disable the button
    button.disabled = true;
    // Start picture in picture
    await videoElement.requestPictureInPicture();
    // Reset Button
    button.disabled = false;
});

// On load
selectMediaStream();
