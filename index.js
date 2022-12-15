//JANGAN DI JUAL BELIKAN YA 🙏 PAKE AJA UNTUK KEBUTUHAN PRIBADI//
// WHATSAPP: wa.me//:6283273888147
// @erickqusyaerick

console.log("[ START ]");
const { useSingleFileAuthState, downloadMediaMessage, DisconnectReason } = require('@adiwajshing/baileys');
const makeWASocket = require('@adiwajshing/baileys').default;
const {writeExifImg}= require("./lib/exif.js");
const { Boom } = require("@hapi/boom");
const P = require("pino");
const fs = require('fs');

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
        if (connection === "close") 
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
        let caption;
        if(msg.message.imageMessage){
        caption = msg.message.imageMessage.caption
        
        if (caption === 'sticker') {
        if (isGroup) return reply('pc aja ngab, ntar brisik!')
        reply('proses!')//KALO DI GRUP BAKAL GA RESPON HAPUS AJA KLO GA PENTING//
          let buffer = await downloadMediaMessage(msg, "buffer", {});
          buffer = await writeExifImg(buffer, {packname:"[ ™ ]", author:"[ ©Rick™ ]"});
          sock.sendMessage(from, {sticker:{url: buffer}}, {quoted: msg});
        }
      }
//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
        //CHAT RESPON 
        let pesan;
        if (msg.message.extendedTextMessage)
        pesan = msg.message.extendedTextMessage.text
        
        
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
        socksendMessage(from, { text : 'hallo 😌'})
        sock.readMessages([msg.key])
        }
        
        if(pesan == 'ping'){
        if(isGroup) return
        socksendMessage(from, { text : 'pong'})
        sock.readMessages([msg.key])
        }
        
        if(pesan == 'p'){
        if(isGroup) return
        sock.sendMessage(from, {text: 'Yaa, ada yang bisa saya bantu?'}, {quoted: msg})
        sock.readMessages([msg.key])
        }
        
//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
   }); //PENUTUP MESSAGE
} 

startSock();