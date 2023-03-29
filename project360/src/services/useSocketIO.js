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
      // console.log('setting socket io')
      socket.current = io()
      // debugger; 
      function onConnect() {
        console.log('connected');
      }
      socket.on('connect', onConnect);

      socket.on('updateRoom', (data) => {
        console.log("Listening to updateRoom")
        console.log(data);
      }); 
  
    //   socket.current.on('id', (id) => {
    //     console.log('myId = ' + id)
    //     myId.current = id
    //   })
      

    // //recieve message from server
    // socket.on("update/${roomif}", (data) => {
    //   console.log(data);
    //   // add a debounce here
    //   getItems();
    // });

    return () => {
      console.log('in useSocketIO return')
      // clearInterval(intervalId)
      socket.current.off('id')
      // socket.current.off('clients')
      // socket.current.off('removeClient')
    }
  }, [])
}
