const router=require("express").Router();
const prisma = require("../prisma")
const { startConversation, getConversationId,getConverChatInfo} = require("../api/conversation")

//获取会话id
router.get("/getConverId",(resquest,response)=>{
    const { uid } = request.user
    getConversationId(uid)
        .then((data)=>{
            response.send({
                code:200,
                msg:"获取成功",
                data,
            })
        })
        .catch((e)=>{
            response.send({
                code:500,
                msg:"系统出错，请稍后再试",
                errMsg:e
            })
        })
        .finally(() => {
            prisma.$disconnect();
        })
})

//  创建/开始聊天
router.post("/startChat",(resquest,response)=>{
    const { friendId } = request.body
    const { uid } = request.user
    startConversation(friendId,uid)
        .then((data)=>{
            response.send({
                code:200,
                data,
                msg:"创建会话成功"
            })
        })
        .catch((e)=>{
            response.send({
                code:500,
                msg:"很抱歉，系统出错，请稍后重试",
                errMsg:e
            })
        })
        .finally(() => {
            prisma.$disconnect();
        })
})


module.exports=router