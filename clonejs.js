// Get all necessary elements
const audio = new Audio(); // Create an audio element
const playPauseButton = document.querySelector('.playsongbar');
const prevButton = document.querySelector('.previoussong');
const nextButton = document.querySelector('.nextsonginplaybar');
const songItems = document.querySelectorAll('.play');
const playButtons = document.querySelectorAll('.play img');

// List of songs (replace with your actual song paths)
const songs = [
    'Mawlay-ar.mp3',
    'Assalamu_Alaika_ar.mp3',
    'Yanabi_salam_alik.mp3',
    'ايها المسلمون طال ليل الانين 1.mp3',
    '[SPOTIFY-DOWNLOADER.COM] Bi Saraha.mp3',
    'Bika-Moulhimi.mp3',
    '111.mp3',   
]

let currentSongIndex = 0;

// Function to load and play a song
function loadSong(index) { 
    audio.src = songs[index];
    audio.play();
    playPauseButton.src = 'pause.svg'; // Change to pause icon
}

// Play/Pause functionality
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.src = 'pause.svg'; // Change to pause icon
    } else {
        audio.pause();
        playPauseButton.src = 'play.svg'; // Change to play icon
    }
});

// Previous song functionality
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

// Next song functionality
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

// Play a song when clicked from the list
songItems.forEach((item, index) => {
    item.addEventListener('click', () => {

        currentSongIndex = index;
        loadSong(currentSongIndex);
    });
});

// Play a song when the play button is clicked
playButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        currentSongIndex = index;
        loadSong(currentSongIndex);
    });
});

// Update play/pause button when song ends
audio.addEventListener('ended', () => {
    playPauseButton.src = 'play.svg'; // Change to play icon
});
const progressBar = document.getElementById('progress');
const volumeControl = document.getElementById('volume');

// Update progress bar as the song plays
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

// Seek through the song when progress bar is adjusted
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Adjust volume
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});
const remainingTimeElement = document.getElementById('remaining-time');

// Function to format time (e.g., convert 125 seconds to "2:05")
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Update remaining time as the song plays
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;

    // Calculate remaining time
    const remainingTime = audio.duration - audio.currentTime;
    remainingTimeElement.textContent = `${formatTime(remainingTime)}`;
});

// Reset remaining time when a new song loads
audio.addEventListener('loadedmetadata', () => {
    const remainingTime = audio.duration - audio.currentTime;
    remainingTimeElement.textContent = `${formatTime(remainingTime)}`;
});
const BTNPLAY=document.getElementsByClassName('.SONGS');
BTNPLAY.addEventListener('hover',()=>{
    const PLAYBTN=document.getElementsByClassName('.play');
    PLAYBTN.style.opacity='1';
});
