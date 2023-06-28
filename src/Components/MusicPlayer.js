import React,{useState, useRef, useEffect} from 'react';
import '../Styles/MusicPlayer.css';
import { FaBackward, FaHeart, FaRegHeart, FaStepBackward, FaPause, FaPlay, FaForward, FaStepForward, FaShareAlt } from 'react-icons/fa';
import {BsDownload} from 'react-icons/bs';


function MusicPlayer({song,imgSrc}) { //receiving two parameters i.e. song and image*/

const [isLove,setLoved]=useState(false);
const [isPlaying, setPlaying]=useState(false);
const [duration, setDuration]=useState(0);
const [currentTime, setCurrentTime]=useState(0);

const audioPlayer=useRef();   //for audio tag
const progressBar=useRef();    //for progress bar

const animationRef=useRef();

useEffect(()=>{
    const seconds=Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
},[
    audioPlayer?.current?.loadedmetadata,
    audioPlayer?.current?.readyState,
]);

const changePlayPause=()=>{
    const prevValue=isPlaying; //capture the previous value then change the start to play or pause accordingly
    if(!prevValue){
        audioPlayer.current.play();  //audio ha it's inbuild play function and pause
        animationRef.current=requestAnimationFrame(whilePlaying);
    }
    else{
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
    }
    setPlaying(!prevValue);
};

const CalculateTime=(sec)=>{  //function to display the end time of music in music player
    const minutes=Math.floor(sec/60);
    const returnMin=minutes<10 ? `0${minutes}` : `${minutes}`;   //if value is less than 10 then display like 08 or 06 otherwise display as it as like 10 or 30 minutes
    const seconds=Math.floor(sec%60);
    const returnSec=seconds<10 ? `0${seconds}` : `${seconds}`;

    return `${returnMin}:${returnSec}`;
};

const whilePlaying=()=>{
    progressBar.current.value=audioPlayer.current.currentTime;
    changeCurrentTime();
    animationRef.current=requestAnimationFrame(whilePlaying);
};

const changeProgress=()=>{
  audioPlayer.current.currentTime=progressBar.current.value;
  changeCurrentTime();
};

const changeCurrentTime=()=>{
    progressBar.current.style.setProperty('--player-played', `${(progressBar.current.value/duration)*100}%`);
    setCurrentTime(progressBar.current.value);
};

const changeLoved=()=>{
    setLoved(!isLove);
};

  return (
    <div className='musicPlayer'>
        <div className='songImage'>
            <img src={imgSrc}/>
        </div>
        <div className='songAttributes'>
            <audio src={song} preload='metadata' ref={audioPlayer}/>

            <div className='top'>
                <div className='left'>
                    <div className='loved' onClick={changeLoved}>
                    {isLove ? <i><FaHeart/></i> : <i><FaRegHeart/></i>}
                    </div>
                    <div className='download'><i><BsDownload/></i></div>
                </div>
                <div className='middle'>
                    <div className='back'>
                        <i><FaStepBackward/></i>
                        <i><FaBackward/></i>
                    </div>
                    <div className='playPause' onClick={changePlayPause}>
                        {isPlaying ? <i><FaPause/></i> : <i><FaPlay/></i>}
                    </div>
                    <div className='forward'>
                        <i><FaForward/></i>
                        <i><FaStepForward/></i>
                    </div>
                </div>
                <div className='right'><i><FaShareAlt/></i></div>
            </div>
            <div className='bottom'>
                <div className='currentTime'>{CalculateTime(currentTime)}</div>
                <input type='range' className='progressBar' ref={progressBar} onChange={changeProgress}/>
                <div className='duration'>{(duration && !isNaN(duration) && CalculateTime(duration)) ?  //if it is valid display minute otherwise display 00;00
                 CalculateTime(duration) : '00:00'}</div>
            </div>
        </div>
    </div>
  )
}

export { MusicPlayer };
