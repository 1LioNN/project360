import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import io from 'socket.io-client'
import {socket} from "../socketConnect"
// const socket = io("localhost:5000");

export default function useSocketIO(model) {
    // const socket = useRef()
    const state = useThree()
    const myId = useRef()
    const otherUsers = useRef({})

    useEffect(() => {
      //console.log('setting socket io')
      // socket.current = io()
      // debugger; 
      function onConnect() {
        
      }
      socket.on('connect', onConnect);
  
      const intervalId = setInterval(() => {
        model.current &&
          socket.emit('update', {
            t: Date.now(),
            p: model.current.position
          })
      })

      socket.on('position', (data) => {
        console.log("Hi"); 
        console.log(data);
      })


    // //send message to server
    // socket.emit("howdy", "Hi"); 

    // //recieve message from server
    // socket.on("hello", (data) => {
    //   console.log(data);
    // });

    return () => {
      console.log('in useSocketIO return')
      clearInterval(intervalId)
      // socket.current.off('id')
      // socket.current.off('clients')
      // socket.current.off('removeClient')
    }
  }, [])
}



