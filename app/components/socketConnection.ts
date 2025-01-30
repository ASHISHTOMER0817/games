import { Server } from "socket.io";


      const io = new Server()
      io.on('connection', (socket)=>{
            socket.on('message', (total)=>{
                  console.log(total)
            })
      })
