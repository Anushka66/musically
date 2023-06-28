import {useState, useEffect} from 'react';
import React from 'react';
import { FaHeadphones, FaHeart, FaRegHeart, FaRegClock } from 'react-icons/fa';
import {Songs} from './Songs';
import {MusicPlayer} from './MusicPlayer';

function AudioList() {
const [songs,setSongs]=useState(Songs);
const [song, setSong]= useState(Songs[0].song);//music player is set to first song and first image when page is refreshed*/
const [img, setImage]= useState(Songs[0].imgSrc);

const changeFavourite=(id)=>{
    Songs.forEach(song=> {
        if(song.id==id){
            song.favourite=!song.favourite;
        }
    });
    setSongs([...Songs]);
};

useEffect(() => {
    const songs = document.querySelectorAll(".songs");
  
    function changeMenuActive(){
      songs.forEach(n=>n.classList.remove("active"));
      this.classList.add('active');
    }
  
    songs.forEach(n=> n.addEventListener('click',changeMenuActive))
  }, []); //so that when you click a song it should be active


const setMainSong=(songSrc,imgSrc)=>{
    setSong(songSrc); 
    setImage(imgSrc); /*whenever you refresh the page it will take the first song but when you click a song music player will change it to the clicked song*/
}

  return (
    <div className='audioList'>
        <h2 className='title'>The List <span>{`${Songs.length} songs`}</span></h2>

        <div className='songsContainer'>

        {
             songs && songs.map((song, index)=>(   //instead of directly using the object i.e. Songs use state i.e. songs so that every time you refresh state is changed
                <div className='songs' key={song?.id}
                  onClick={()=>setMainSong(song?.song, song?.imgSrc)} /*so that whatever song you click is given to audio player and is played*/
                >  
                <div className='count'>{`#${index+1}`}</div>
                <div className='song'>
                    <div className='imgBox'>
                        <img src={song?.imgSrc} alt=''/> 
                    </div>
    
                    <div className='section'>
                        <p className='songName'> {song?.songName} <span className='spanArtist'>{song?.artist}</span></p>
                        <div className='hits'>
                            <p className='hit'><i><FaHeadphones/></i> 95,120,490</p>
                            <p className='duration'>
                                <i><FaRegClock/></i>02.30
                            </p>
    
                            <div className='favourite' onClick={()=>changeFavourite(song?.id)}>

                                {
                                    song?.favourite ?   //if song is favourite mark it
                                    (<i><FaHeart/></i>):(<i><FaRegHeart/></i>)
                                }

                               
                            </div>
                        </div>
                    </div>
                </div>
               </div>
             ))
        }

           
        </div>

        <MusicPlayer song={song} imgSrc={img}/> 
    </div>
  );
}

export { AudioList };