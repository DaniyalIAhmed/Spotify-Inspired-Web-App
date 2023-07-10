console.log("Welcome to spotify");

// Variable Initialization:
let songIndex = 0;
let audio = new Audio('songs/Zajal Labanese Remix.mp3');
let masterPlay = document.getElementById('masterplay');
let progressBar = document.getElementById('myProgressBar');
let songName = Array.from(document.getElementsByClassName('songItem'));
let vol = document.getElementById('volume');
let dur = new Audio('songs/Zajal Labanese Remix.mp3')
let songs = [
    { songName: 'Zajal Labanese Remix', filePath: "songs/Zajal Labanese Remix.mp3", coverPath: "cover/1.jpg" },
    { songName: 'Bohnes - Raging on a Sunday', filePath: "songs/Raging on a sunday.mp3", coverPath: "cover/2.jpg" },
    { songName: 'Arijit - Kesariya', filePath: "songs/Kesariya.mp3", coverPath: "cover/3.jpg" },
    { songName: 'KK - Dil Ibadat', filePath: "songs/Dil Ibaadat.mp3", coverPath: "cover/4.jpg" }
]
// console.log(song[1].currentTime);
songName.forEach((element, i) => {
    element.getElementsByClassName('cover')[0].src = songs[i].coverPath;
    element.getElementsByClassName('text')[0].innerHTML = songs[i].songName;
    // durset();
    // dur.src = songs[i].filePath;
    // console.log((audio.duration));
    // element.getElementsByClassName('time')[0].innerHTML = (dur.duration/60).toString().charAt(0);
})

audio.addEventListener('timeupdate', () => {
    let progress = parseInt((audio.currentTime / audio.duration) * 100);
    progressBar.value = progress;
})

vol.addEventListener('click', ()=>{
    if(document.getElementById('volBar').style.display === 'inline'){
        document.getElementById('volBar').style.display = 'none';
        document.getElementById('volBar').style.width = '0';
    }
    else{
        document.getElementById('volBar').style.display = 'inline';
        document.getElementById('volBar').style.width = '55%';
    }
    setTimeout(()=>{
        document.getElementById('volBar').style.display = 'none';
        document.getElementById('volBar').style.width = '0';

    }, 3000)
})
masterPlay.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        // audio.volume = 1;
        audio.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        document.getElementById('gif').style.opacity = '1';
    }
    else {
        audio.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        document.getElementById('gif').style.opacity = '0';
    }
});
progressBar.addEventListener('change', () => {
    audio.currentTime = ((progressBar.value * audio.duration) / 100);
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('splay')).forEach((element) => {
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName('splay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        console.log((audio.duration/60).toString().charAt(0));
        makeAllPlays();
        if (audio.paused || audio.currentTime <= 0) {
            if(songIndex === i){
                songIndex = i;
                makeAllPlays();
                document.getElementsByClassName('songNB')[0].innerHTML = songs[i].songName;
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');
                audio.play();
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                document.getElementById('gif').style.opacity = '1';
            }
            else{
                songIndex = i;
                makeAllPlays();
                audio.src = songs[i].filePath;
                document.getElementsByClassName('songNB')[0].innerHTML = songs[i].songName;
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');
                audio.play();
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                document.getElementById('gif').style.opacity = '1';
            }
        }
        else {
            if (songIndex === i) {
                audio.pause();
                e.target.classList.remove('fa-pause');
                e.target.classList.add('fa-play');
                masterPlay.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
                document.getElementById('gif').style.opacity = '0';
            }
            else {
                audio.pause();
                makeAllPlays();
                audio.src = songs[i].filePath;
                document.getElementsByClassName('songNB')[0].innerHTML = songs[i].songName;
                progressBar.value = 0;
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');
                audio.play();
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                document.getElementById('gif').style.opacity = '1';
            }
        }
    })
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex===0){
        songIndex = 4;
    }
    else{
        songIndex--;
    }
    audio.src = songs[songIndex].filePath;
    progressBar.value = 0;
    audio.currentTime=0;
    audio.play();
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex===4){
        songIndex = 0;
    }
    else{
        songIndex++;
    }
    audio.src = songs[songIndex].filePath;
    progressBar.value = 0;
    audio.currentTime=0;
    audio.play();
})
document.getElementById('volBar').addEventListener('change', ()=>{
    audio.volume = (document.getElementById('volBar').value/100);
    // console.log((document.getElementById('volBar').value/100));
})