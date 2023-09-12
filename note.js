io.on("connection",(socket)=>{
  socket.on("joinSession",(convId)=>{
    socket.join(convId)
  })

  socket.on("sendMsg",(convId,message)=>{
    io.to(convId).emit('message',message)
  })
})

function ({convId,senderId,content,contentType,sendTime}) {
    return new Promise(async (resolve,reject)=>{
        try {
            await chatInfo.create({
                data:{
                    convId,
                    senderId,
                    content,
                    contentType,
                    sendTime,
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

model Logs{
  logsId Int @id @default(autoincrement()) @map("logs_id") 
  useId Int 
  isShow Boolean @map("is_show")
  text String
  picture String 

  Users User @map("",fields:[useId],references:[uid])
  Comments LogsComments[]?  
}

model LogsComments{
  commentId Int @id @default(autoincrement()) @map("comment_id")
  LogsId Int @map("Logs_id")

  
}
