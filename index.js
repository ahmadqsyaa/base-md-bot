console.log("[ START ]");
const { useSingleFileAuthState, downloadMediaMessage, DisconnectReason } = require('@adiwajshing/baileys');
const makeWASocket = require('@adiwajshing/baileys').default;
const {writeExifImg}= require("./lib/exif.js");
const { Boom } = require("@hapi/boom");
const P = require("pino");
const fs = require('fs');
try{
const startSock = () => {
    const {state, saveState} = useSingleFileAuthState("session.json"); // NAMA SESION
    const sock = makeWASocket({
        printQRInTerminal: true,
        auth: state,
        browser: ["BOTS RICK","safari","1.0.0"],
        logger: P({
        level: "silent"
      })
    });

      sock.ev.on("connection.update", ({ connection, lastDisconnect})=> { 
        if (connection == "open") {
        console.log(connection);
//sock.sendMessage('6283173888147@s.whatsapp.net', {text: 'telah Connect!'})
}
        
        if (connection == "close") 
      {
        const error = new Boom(lastDisconnect.error);
        const alasanError = error?.output?.statusCode;
        if (alasanError === DisconnectReason.loggedOut) {
          sock.logout();
      } else {
          startSock();
        }
      } else {
        console.log("TERHUBUNG!"); 
      }
    });
    
    
    //SAVE SESSIONNYA
    sock.ev.on("creds.update", saveState);
    
    //MESSAGE 
    sock.ev.on("messages.upsert", async m =>{
    
        //CONST 
        const msg = m.messages[0];
          if (!m.messages) return;
          if (msg.key && msg.key.remoteJid == "status@broadcast") return
        console.log(msg)
        const from = msg.key.remoteJid
        const isGroup = msg.key.remoteJid.endsWith('@g.us')
        const quoted = m.quoted ? m.quoted : m
        const reply = (teks) => {sock.sendMessage(from, { text: teks }, { quoted: msg })}
//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//       
        //STICKER 
        try{
        let caption;
        if(msg.message.imageMessage){
        caption = msg.message.imageMessage.caption
        
        if (caption === 'sticker') {
        sock.sendPresenceUpdate('composing', msg.message)
        if (isGroup) return reply('pc aja ngab, ntar brisik!')
        reply('proses!')//KALO DI GRUP BAKAL GA RESPON HAPUS AJA KLO GA PENTING//
          let buffer = await downloadMediaMessage(msg, "buffer", {});
          buffer = await writeExifImg(buffer, {packname:"[ ™ ]", author:"[ ©Rick™ ]"});
          sock.sendMessage(from, {sticker:{url: buffer}}, {quoted: msg});
        }
      } 
      } catch (e) {
console.log(e)
}
//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
        //CHAT RESPON
try{
        let pesan;
        if (msg.message.conversation)
        pesan = msg.message.conversation;
        
        
        if(pesan == ('Rik') || pesan == ('rik') || pesan == ('erick')
        || pesan == ('Erick') || pesan == ('woy') || pesan == ('Woy')){
        if(isGroup) return //KALO DI GRUP BAKAL GA RESPON HAPUS AJA KLO GA PENTING//
        reply('Iyaa? silahkan tinggalkan pesan, dan tunggulah!')
         mo = fs.readFileSync('./2.webp')
        sock.sendMessage(from,{sticker: mo}, {quoted: msg})
        sock.readMessages([msg.key])
        }
        
        if(pesan == 'hallo'){
        if(isGroup) return //KALO DI GRUP BAKAL GA RESPON HAPUS AJA KLO GA PENTING//
        sock.sendMessage(from, {text:'hello juga'}, {quoted: msg})
        sock.readMessages([msg.key])
        }
        
        if(pesan == 'hai'){
        if(isGroup) return 
        socksendMessage(from, { text : 'hallo 😌'}, {quoted: msg})
        sock.readMessages([msg.key])
        }
        
        if(pesan == 'ping'){
        if(isGroup) return
        socksendMessage(from, { text : 'pong'},{quoted: msg})
        sock.readMessages([msg.key])
        }
        
        if(pesan == ('p') || pesan == ('P') || pesan == ('Pp') || pesan == ('pe') || pesan == ('ppp')){
        if(isGroup) return
        sock.sendMessage(from, {text: 'Yaa, ada yang bisa saya bantu?'}, {quoted: msg})
        sock.readMessages([msg.key])
        }
        
        
//KLO ADA ERROR GA BAKAL MATI       
} catch (e) {
console.log(e)
}
//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
   }); //PENUTUP MESSAGE
} 

startSock()
} catch (e) {
console.log(e)
}
