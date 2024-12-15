import React, {useEffect, useState, useRef} from 'react'
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import * as THREE from 'three';
import Title from './Title'

import RadioChannel from './RadioChannel';
import { Font } from 'three/examples/jsm/Addons.js';

extend({ TextGeometry })

const Radio = ({stations, onLoad}) => {
    // Channel turning
    const [font, setFont] = useState(null);
    const [currentStation, setCurrentStation] = useState(0);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [off, setOff] = useState(true);
    const [on, setOn] = useState(false);
    const [isOn, setIsOn] = useState(false);
    const audioRef = useRef(null);

    const rectangle_g = new THREE.BoxGeometry(1, 1, 2);

    const toppanel_g = new THREE.BoxGeometry(0.01, 0.3, 2);
    const tp_on = new THREE.BoxGeometry(0.03, 0.05, 0.08);
    const tp_off = new THREE.BoxGeometry(0.03, 0.05, 0.08);
    const tp_radio_display = new THREE.BoxGeometry(0.01, 0.2, 0.7);
    const tp_volume = new THREE.CylinderGeometry(0.06, 0.08, 0.04, 32);
    const tp_channel = new THREE.CylinderGeometry(0.06, 0.08, 0.04, 32);
    const tp_channel1 = new THREE.BoxGeometry(0.03, 0.05, 0.1);
    const tp_channel2 = new THREE.BoxGeometry(0.03, 0.05, 0.1);
    const tp_channel3 = new THREE.BoxGeometry(0.03, 0.05, 0.1);
    const tp_channel4 = new THREE.BoxGeometry(0.03, 0.05, 0.1);
    const tp_channel5 = new THREE.BoxGeometry(0.03, 0.05, 0.1);
    const tp_channel6 = new THREE.BoxGeometry(0.03, 0.05, 0.1);
    const tp_detail = new THREE.BoxGeometry(0.03, 0.04, 0.06);

    const top_roundbutton = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 32);
    const top_rod = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 32);
    const top_rHandle = new THREE.CylinderGeometry(0.05, 0.05, 2.2, 32);
    const top_rect = new THREE.BoxGeometry(0.15, 0.05, 0.6);

    const speakerGeometry = new THREE.SphereGeometry(0.25, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    speakerGeometry.scale(1, 0.3, 1);
    const cassette_player = new THREE.BoxGeometry(0.01, 0.3, 0.5);
    const cas_button = new THREE.BoxGeometry(0.03, 0.08, 0.08);
    const cas_buttonl = new THREE.BoxGeometry(0.03, 0.08, 0.14);
    const cas_box = new THREE.BoxGeometry(0.01, 0.2, 0.4);
    const cas_circle = new THREE.CylinderGeometry(0.06, 0.06, 0.001, 32);
    const cas_rectangle = new THREE.BoxGeometry(0.01, 0.03, 0.05);
    const cas_minicircle = new THREE.CylinderGeometry(0.03, 0.03, 0.001, 10);

    // (y, z, x)
    //  position={[0.54, 0.2, 0]} -center of front face box side
    useEffect(() => {
        const loader = new FontLoader();
        loader.load('./fonts/helvetiker_regular.typeface.json', (loadedFont) => {
          setFont(loadedFont);
        });
    }, []);

    const handleTurnOff = () => {
        setIsOn(false);
        setOff(true);
        setOn(false);
        if (handleChannelClick){
            audioRef.current.pause();
        }
    }

    const handleTurnOn = () => {
        setIsOn(true);
        setOn(true);
        setOff(false);
        if (handleChannelClick){
            audioRef.current.play();
        }
    }
 
    const handleChannelClick = (index) =>{
        if (stations.length>index){
            setCurrentStation(index);
            setSelectedChannel(index);
            console.log('Playing station:', stations[index].url);
            console.log('Station Name: ', stations[index].name);
        }else{
            console.log('Station not available');
        }
    }

    useEffect(() => {
        if((stations.length > 0 && audioRef.current) && setIsOn){
            console.log('Playing Audio', stations[currentStation].url);
            audioRef.current.src = stations[currentStation].url;
            audioRef.current.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    }, [currentStation, stations]);

    useEffect(() => {
        if (onLoad) {
          onLoad();
        }
    }, [onLoad]);
    
    
   
  return (
    <div>
        <div className="absolute top-15 left-10 z-10 p-4">
            <Title />
        </div>

        <div className = 'bg-[#f15bb5] border-4 rounded-1xl absolute top-40 right-12 z-10 p-4 w-1/3'>
            <button className ='absolute top-2 right-3'>✖️</button>
            <div className='font-sans space-y-4 text-left text-white'>
                <h1 className='text-2xl font-bold font-mono'>Hello! 🎶</h1>
                <h2 className='text-sm'>If you were looking to listen to some 90s Radio Stations, you've come to the right place 📻✨</h2>
                <h2>Click any of the Channel Buttons to listen to the stations, then press Play!🎛️</h2>
                <h1 className='text-sm'>A station should play right away, you can see the station music type on the display screen 📟</h1>
                <h2>Click the Pause Button to stop the station ⏸️</h2>
                <h2>Click the Play Button to resume the station ▶️</h2>
                <h2>You can also zoom in, out, spin, and move the boombox around 📼</h2>
                <h2 className='text-sm'>Enjoy the music! 🎧</h2>
            </div>
        </div>

    <Canvas camera={{position: [2, 1, 2], fov: 60}} style={{height: '100vh', width: '100%',  background: '#00f5d4'}} shadows={true}>
        <ambientLight intensity={2.5} />
        <pointLight position={[5, 5, 5]} intensity={1} castShadow={true}  shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}/>
        <group position={[-0.8, -0.1, 0.7]}>
        {/* Base Radio Shape - Rectangular Prism */}
        <mesh geometry={rectangle_g} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#f15bb5" wireframe={false} roughness={0} metalness={0.2}/>
        </mesh>
        {/* Base Radio Shape - Edges */}
        <lineSegments geometry={new THREE.EdgesGeometry(rectangle_g)}>
            <lineBasicMaterial color="#8c3269" />
        </lineSegments>

        {/* Top Panel on Radio */}
        <mesh geometry={toppanel_g} position={[0.505, 0.35, 0]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5"/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(toppanel_g)} position={[0.505, 0.35, 0]}>
            <lineBasicMaterial color="#573480" />
        </lineSegments>

        {/* Top Panel on Radio - On Button */}
        <mesh geometry={tp_on} onClick={handleTurnOn} position={[0.525, 0.42, 0.9]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color={isOn ? "#18ed22" : "#fee440"} />
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(tp_on)} position={[0.525, 0.42, 0.9]}>
            <lineBasicMaterial color="#ad9a24" />
        </lineSegments>

        {/* Top Panelon Radio - Off Button */}
        <mesh geometry={tp_off} onClick ={handleTurnOff} position={[0.525, 0.42, 0.76]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color={isOn ? "#00bbf9" : "#ed182d"}/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(tp_on)} position={[0.525, 0.42, 0.76]}>
            <lineBasicMaterial color="#037499" />
        </lineSegments>

        <mesh geometry={tp_radio_display} position={[0.515, 0.35, 0]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#bfefff"/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(tp_radio_display)} position={[0.515, 0.35, 0]}>
            <lineBasicMaterial color="#adb1b3" />
        </lineSegments>

        {/* Top Panelon Radio - Channel */}
        <mesh geometry={tp_channel} position={[0.53, 0.37, -0.5]} rotation={[0, Math.PI, Math.PI/2]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#fee440"/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(tp_channel)} position={[0.53, 0.37, -0.5]} rotation={[0, Math.PI, Math.PI/2]}>
            <lineBasicMaterial color="#ad9a24" />
        </lineSegments>

        <mesh geometry={tp_channel1} onClick={() => handleChannelClick(0)} position={[0.53, 0.42, 0.45]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color={selectedChannel === 0 ? "#f15bb5" : "#fee440"} />
            {/* {font && (
                <mesh position={[0, 0, 0.06]}>
                    <TextGeometry args={['Channel 1', {font, size: 0.02, height: 0.01}]} />
                    <meshStandardMaterial color="#8c3269" />
                </mesh>
            )} */}
        </mesh>
    
        <lineSegments geometry={new THREE.EdgesGeometry(tp_channel1)} position={[0.53, 0.42, 0.45]}>
            <lineBasicMaterial color="#ad9a24" />
        </lineSegments>
        <mesh geometry={tp_channel2} onClick={() => handleChannelClick(1)} position={[0.53, 0.35, 0.45]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color={selectedChannel === 1 ? "#f15bb5" : "#fee440"}/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(tp_channel2)} position={[0.53, 0.35, 0.45]}>
            <lineBasicMaterial color="#ad9a24" />
        </lineSegments>
        <mesh geometry={tp_channel3} onClick={() => handleChannelClick(2)} position={[0.53, 0.28, 0.45]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color={selectedChannel === 2 ? "#f15bb5" : "#fee440"}/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(tp_channel3)} position={[0.53, 0.28, 0.45]}>
            <lineBasicMaterial color="#ad9a24" />
        </lineSegments>

        {/* Top Panelon Radio - Volume */}
        <mesh geometry={tp_volume} position={[0.53, 0.37, -0.7]} rotation={[0, Math.PI, Math.PI/2]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#fee440"/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(tp_volume)} position={[0.53, 0.37, -0.7]} rotation={[0, Math.PI, Math.PI/2]}>
            <lineBasicMaterial color="#ad9a24" />
        </lineSegments>

        {/* Top Panelon Radio - Detail */}
        <mesh geometry={tp_detail} position={[0.525, 0.4, -0.87]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#f15bb5"/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(tp_detail)} position={[0.525, 0.4, -0.87]}>
            <lineBasicMaterial color="#8c3269" />
        </lineSegments>
        <mesh geometry={tp_detail} position={[0.525, 0.33, -0.87]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#f15bb5"/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(tp_detail)} position={[0.525, 0.33, -0.87]}>
            <lineBasicMaterial color="#8c3269" />
        </lineSegments>



        {/* Top Face */}
        <mesh geometry={top_roundbutton} position={[0.1, 0.52, -0.5]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5" wireframe={false} roughness={0} metalness={0.2}/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(top_roundbutton)} position={[0.1, 0.52, -0.5]}>
            <lineBasicMaterial color="#573480" />
        </lineSegments>
        <mesh geometry={top_roundbutton} position={[0.1, 0.52, -0.25]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5" wireframe={false} roughness={0} metalness={0.2}/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(top_roundbutton)} position={[0.1, 0.52, -0.25]}>
            <lineBasicMaterial color="#573480" />
        </lineSegments>
        <mesh geometry={top_rod} position={[0, 0.65, 0.75]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5" wireframe={false} roughness={0} metalness={0.2}/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(top_rod)} position={[0, 0.65, 0.75]}>
            <lineBasicMaterial color="#573480" />
        </lineSegments>
        <mesh geometry={top_rod} position={[0, 0.65, -0.75]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5" wireframe={false} roughness={0} metalness={0.2}/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(top_rod)} position={[0, 0.65, -0.75]}>
            <lineBasicMaterial color="#573480" />
        </lineSegments>
        <mesh geometry={top_rHandle} position={[0, 0.8, 0]} rotation={[0, Math.PI/2, Math.PI/2]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5" wireframe={false} roughness={0} metalness={0.2}/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(top_rHandle)} position={[0, 0.8, 0]} rotation={[0, Math.PI/2, Math.PI/2]}>
            <lineBasicMaterial color="#573480" />
        </lineSegments>
        
        <mesh geometry={top_rect} position={[0.1, 0.52, 0.3]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5" wireframe={false} roughness={0} metalness={0.2}/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(top_rect)} position={[0.1, 0.52, 0.3]}>
            <lineBasicMaterial color="#573480" />
        </lineSegments> 



        {/* Speaker */}
        <mesh geometry={speakerGeometry} position={[0.505, -0.15, 0.6]} rotation={[0, Math.PI, Math.PI/2]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#00bbf9" wireframe={false} roughness={0} metalness={0}/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(speakerGeometry)} position={[0.505, -0.15, 0.6]} rotation={[0, Math.PI, Math.PI/2]}>
            <lineBasicMaterial color="#adb1b3" />    
        </lineSegments>

        <mesh geometry={speakerGeometry} position={[0.505, -0.15, -0.6]} rotation={[0, Math.PI, Math.PI/2]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#00bbf9" wireframe={false} roughness={0} metalness={0}/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(speakerGeometry)} position={[0.505, -0.15, -0.6]} rotation={[0, Math.PI, Math.PI/2]}>
            <lineBasicMaterial color="#adb1b3" />    
        </lineSegments>

        {/* Cassette Player */}
        <mesh geometry={cassette_player} position={[0.505, -0.03, 0]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#00bbf9" wireframe={false} roughness={0} metalness={0}/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(cassette_player)} position={[0.505, -0.03, 0]}>
            <lineBasicMaterial color="#adb1b3" />
        </lineSegments>
        <mesh geometry={cas_box} position={[0.5051, -0.03, 0]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#bfefff" wireframe={false} roughness={0} metalness={0}/>    
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(cas_box)} position={[0.5051, -0.03, 0]}>
            <lineBasicMaterial color="#adb1b3" />
        </lineSegments>
        <mesh geometry={cas_circle} position={[0.511, -0.035, 0.11]} rotation={[0, Math.PI, Math.PI/2]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5" wireframe={false} roughness={0} metalness={0}/>    
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(cas_circle)} position={[0.511, -0.035, 0.11]} rotation={[0, Math.PI, Math.PI/2]}>    
            <lineBasicMaterial color="#573480" />
        </lineSegments>
        <mesh geometry={cas_circle} position={[0.511, -0.035, -0.11]} rotation={[0, Math.PI, Math.PI/2]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5" wireframe={false} roughness={0} metalness={0}/>    
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(cas_circle)} position={[0.511, -0.035, -0.11]} rotation={[0, Math.PI, Math.PI/2]}>    
            <lineBasicMaterial color="#573480" />
        </lineSegments>
        <mesh geometry={cas_rectangle} position={[0.511, -0.035, 0]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#fee440" wireframe={false} roughness={0} metalness={0}/>    
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(cas_rectangle)} position={[0.511, -0.035, 0]}>
            <lineBasicMaterial color="#ad9a24" />
        </lineSegments>
        <mesh geometry={cas_minicircle} position={[0.511, -0.035, -0.11]} rotation={[0, Math.PI, Math.PI/2]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5" wireframe={false} roughness={0} metalness={0}/>    
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(cas_minicircle)} position={[0.5111, -0.035, -0.11]} rotation={[0, Math.PI, Math.PI/2]}>    
            <lineBasicMaterial color="#573480" />
        </lineSegments>
        <mesh geometry={cas_minicircle} position={[0.511, -0.035, 0.11]} rotation={[0, Math.PI, Math.PI/2]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5" wireframe={false} roughness={0} metalness={0}/>    
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(cas_minicircle)} position={[0.511, -0.035, 0.11]} rotation={[0, Math.PI, Math.PI/2]}>    
            <lineBasicMaterial color="#573480" />
        </lineSegments>

        


        {/* Cassette Player - Buttons */}
        <mesh geometry={cas_button} position={[0.505, -0.28, 0.21]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5"/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(cas_button)} position={[0.505, -0.28, 0.21]}>
            <lineBasicMaterial color="#573480" />
        </lineSegments>
        <mesh geometry={cas_button} position={[0.505, -0.28, 0.12]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5"/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(cas_button)} position={[0.505, -0.28, 0.12]}>
            <lineBasicMaterial color="#573480" />
        </lineSegments>
        <mesh geometry={cas_button} position={[0.505, -0.28, 0.03]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5"/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(cas_button)} position={[0.505, -0.28, 0.03]}>
            <lineBasicMaterial color="#573480" />
        </lineSegments>
        <mesh geometry={cas_button} position={[0.505, -0.28, -0.06]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#9b5de5"/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(cas_button)} position={[0.505, -0.28, -0.06]}>
            <lineBasicMaterial color="#573480" />
        </lineSegments>
        <mesh geometry={cas_buttonl} position={[0.505, -0.28, -0.18]} castShadow={true} receiveShadow={true}>
            <meshStandardMaterial color="#fee440"/>
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(cas_buttonl)} position={[0.505, -0.28, -0.18]}>
            <lineBasicMaterial color="#ad9a24" />
        </lineSegments>
            
        {/* -0.8, -0.1, 0.7 */}
        {/* Text for Play Button */}
        {/* 0.535, 0.42, 0.915 */}
        {font && (
            <mesh position={[0.535, 0.42, 0.915 ]} rotation={[0, Math.PI/2, 0]}>
                <textGeometry attach="geometry" args={['PLAY', { font, size: 0.01, height: 0.01 }]} />
                <meshStandardMaterial attach="material" color="#000000" />
            </mesh>
        )}

        {/* Text for Pause Button */}
        {font && (
            <mesh position={[0.535, 0.42, 0.78]} rotation={[0, Math.PI/2, 0]}>
                <textGeometry attach="geometry" args={['PAUSE', { font, size: 0.01, height: 0.01 }]} />
                <meshStandardMaterial attach="material" color="#000000" />
            </mesh>
        )}

        {font && (
            <mesh position={[0.5351, 0.415, 0.48]} rotation={[0, Math.PI/2, 0]}>
                <textGeometry attach="geometry" args={['Channel 1', { font, size: 0.01, height: 0.01 }]} />
                <meshStandardMaterial attach="material" color="#000000" />
            </mesh>
        )}
        {font && (
            <mesh position={[0.5351, 0.345, 0.48]} rotation={[0, Math.PI/2, 0]}>
                <textGeometry attach="geometry" args={['Channel 2', { font, size: 0.01, height: 0.01 }]} />
                <meshStandardMaterial attach="material" color="#000000" />
            </mesh>
        )}
        {font && (
            <mesh position={[0.5351, 0.275, 0.48]} rotation={[0, Math.PI/2, 0]}>
                <textGeometry attach="geometry" args={['Channel 3', { font, size: 0.01, height: 0.01 }]} />
                <meshStandardMaterial attach="material" color="#000000" />
            </mesh>
        )}

        {font && (
            <mesh position={[0.515, 0.4, 0.3]} rotation={[0, Math.PI/2, 0]}>
                <textGeometry attach="geometry" args={['Radio Channel ', { font, size: 0.015, height: 0.01 }]} />
                <meshStandardMaterial attach="material" color="#000000" />
            </mesh>
        )}
        
        {font && (
            <mesh position={[0.515, 0.355, 0.3]} rotation={[0, Math.PI/2, 0]}>
                <textGeometry attach="geometry" args={['Description ', { font, size: 0.03, height: 0.01 }]} />
                <meshStandardMaterial attach="material" color="#000000" />
            </mesh>
        )}

        {font && (
            <mesh position={[0.515, 0.3, 0.31]} rotation={[0, Math.PI/2, 0]}>
                <textGeometry attach="geometry" args={[stations[currentStation]?.name || 'No Channel' , { font, size: 0.02, height: 0.01 }]} />
                <meshStandardMaterial attach="material" color="#000000" />
            </mesh>
        )}
        
        <OrbitControls />
        </group>
    </Canvas>

    <audio ref={audioRef} controls style={{ display: 'none' }} />
    </div>
  )
}

export default Radio
