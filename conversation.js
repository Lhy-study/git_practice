const { conversation , ChatInfo } = require("../prisma");

//首先要找
function startConversation(id1, id2) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await conversation.findFirst({
                where: {
                    isGroup: false,
                    AND: [
                        {
                            Users: {
                                some: {
                                    uid: id1
                                }
                            }
                        },
                        {
                            Users: {
                                some: {
                                    uid: id2
                                }
                            }
                        },
                    ]
                },
                include: {
                    Users: true,
                    endChat:true,
                }
            })
            if(result.length===0){
                const createResult=await conversation.create({
                    data:{
                        isGroup:false,
                        createTime:new Date(),
                        Users:{
                            connect:[
                                {uid:id1,},
                                {uid:id2}
                            ]
                        }
                    }
                });
                resolve(createResult);
            }else{
                resolve(result);
            }   
        } catch (error) {
            reject(error)
        }
    })
}

//获取会话id
function getConversationId(uid){
    return new Promise(async(resolve,rejcet)=>{
        try {
            const=await conversation.findMany({
                where:{
                    isGroup:true,
                    AND:[
                        {
                            Users:{
                                some:uid
                            }
                        }
                    ]
                },
                include:{
                    chatInfo:{
                        include:{
                            senderInfo:true
                        }
                    }
                }
            })
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

//获取某个会话的信息
function getConverChatInfo(convId){
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await conversation.findMany({
                where:{
                    convId,
                },
                include:{
                    ChatInfos:true
                }
            })
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

function recordingChat(senderId,content,contentType,convId){
    return new Promise(async (resolve,reject)=>{
        try {
            await ChatInfo.create({
                senderId,
                content,
                contentType,
                convId
            })
            resolve()
        } catch (error) {
            rejcet(error)
        }
    })
}




