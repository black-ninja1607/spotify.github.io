console.log("Welcome to spotify!");
let songIndex = 0;
let audioElement = new Audio('songs/.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Maan Meri Jaan", filePath: "songs/0.mp3", coverPath: "covers/MaanMeriJaan.jpeg"},
    {songName: "Airplane Thoughts", filePath: "songs/1.mp3", coverPath: "covers/AirplaneThoughts.jpeg"},
    {songName: "Ajab Si", filePath: "songs/2.mp3", coverPath: "covers/AjabSi.jpeg"},
    {songName: "Dark Red", filePath: "songs/3.mp3", coverPath: "covers/DarkRed.jpeg"},
    {songName: "Dil Nu", filePath: "songs/4.mp3", coverPath: "covers/DilNu.jpeg"},
    {songName: "East Side", filePath: "songs/5.mp3", coverPath: "covers/Eastside.jpeg"},
    {songName: "Kho Gaye", filePath: "songs/6.mp3", coverPath: "covers/KhoGaye.jpeg"},
    {songName: "Memories", filePath: "songs/7.mp3", coverPath: "covers/Memories.jpeg"},
    {songName: "Baarishein", filePath: "songs/8.mp3", coverPath: "covers/Baarishein.jpeg"},
    {songName: "Tu Aake Dekh Le", filePath: "songs/9.mp3", coverPath: "covers/TuAakeDekhLe.jpeg"},
]
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
}); 

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
    } else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause')
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex}.mp3`
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
   })

})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>9){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})