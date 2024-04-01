const nodemailer=require('nodemailer')
require("dotenv").config();
const mailSender= async(email,title,body)=>{
    try{
        let Transport=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
        let info= await Transport.sendMail({
            from:"Ankul Raja" ,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        console.log(info)
        return info;

    }catch(err){
        console.error("MailSender",err);
    }
}

module.exports=mailSender;
