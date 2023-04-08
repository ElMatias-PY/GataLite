import fs from 'fs'
import { execSync } from 'child_process'
let handler = async (m, { conn, command, usedPrefix, text, isAdmin, isOwner, participants, groupMetadata  }) => {
let fkontak, who, user, number, bot, bant, ownerNumber, aa, users, usr, q, mime, img
fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
const isCommand1 = /^(backup|respaldo|copia)$/i.test(command)
const isCommand2 = /^(ban(user|usuario|earuser|earusuario))$/i.test(command) 
const isCommand3 = /^(seradmin|autoadmin|tenerpoder)$/i.test(command)
const isCommand4 = /^((set|cambiar|nueva|new)(bio|botbio|biobot))$/i.test(command)
const isCommand5 = /^((set|cambiar|nuev(a|o)?|new)(name|botname|namebot|nombre|nombrebot|botnombre))$/i.test(command)
const isCommand6 = /^((set|cambiar|nueva|new)(ppbot|botpp|fotobot|botfoto))$/i.test(command)
const isCommand7 = /^(update|actualizar|ups)$/i.test(command)
const isCommand8 = /^(banchat|banearchat)$/i.test(command)
const isCommand9 = /^(block|unblock|bloquear|desbloquear)$/i.test(command)
const isCommand10 = /^(restablecerdatos|borrardatos|deletedatauser)$/i.test(command)
const isCommand11 = /^(join|nuevogrupo|newgrupo|unete)$/i.test(command)

async function reportError(e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)
}

switch (true) {     
case isCommand1:
await conn.reply(m.sender, lenguajeGB.smsResP1(), fkontak)
try {
let d = new Date
let date = d.toLocaleDateString('fr', { day: 'numeric', month: 'long', year: 'numeric' })
let database = await fs.readFileSync(`./database.json`)
let creds = await fs.readFileSync(`./GataBotSession/creds.json`)
await conn.reply(m.sender, lenguajeGB.smsResP2(date), fkontak)
await conn.sendMessage(m.sender, {document: database, mimetype: 'application/json', fileName: `database.json`}, { quoted: m })
await conn.sendMessage(m.sender, {document: creds, mimetype: 'application/json', fileName: `creds.json`}, { quoted: m })
} catch (e) {
reportError(e)
}   
break
    
case isCommand2:
try{
function no(number){
return number.replace(/\s/g,'').replace(/([@+-])/g,'')}
text = no(text)
if(isNaN(text)) {
number = text.split`@`[1]
} else if(!isNaN(text)) {
number = text
}
user = conn.user.jid.split`@`[0] + '@s.whatsapp.net'
bot = conn.user.jid.split`@`[0] 
bant = lenguajeGB.smsPropban1(usedPrefix, command, bot)
if (!text && !m.quoted) return conn.reply(m.chat, bant, null, { mentions: [user] })               
try {
if(text) {
user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
user = m.quoted.sender
} else if(m.mentionedJid) {
user = number + '@s.whatsapp.net'
}} catch (e) {
} finally {
number = user.split('@')[0]
if(user === conn.user.jid) return conn.reply(m.chat, lenguajeGB.smsPropban2(bot), null, { mentions: [user] })   
for (let i = 0; i < global.owner.length; i++) {
ownerNumber = global.owner[i][0];
if (user.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
aa = ownerNumber + '@s.whatsapp.net'
await conn.reply(m.chat, lenguajeGB.smsPropban3(ownerNumber), null, { mentions: [aa] })
return
}}
users = global.db.data.users
if (users[user].banned === true) conn.reply(m.chat, lenguajeGB.smsPropban4(number), null, { mentions: [user] }) 
users[user].banned = true
usr = m.sender.split('@')[0]     
await conn.reply(m.chat, lenguajeGB.smsPropban5(), null, { mentions: [user] })   
await conn.reply(user, lenguajeGB.smsPropban6(number, usr), null, { mentions: [user, m.sender] })
}} catch (e) {
await conn.reply(m.chat, lenguajeGB.smsPropban7(usedPrefix, command, number), null, m)
console.log(e) 
}
break
        
case isCommand3:
if (m.fromMe) return
if (isAdmin) throw lenguajeGB.smsAutoAdmin1()
try {  
await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")
} catch {
await m.reply(lenguajeGB.smsAutoAdmin2())}        
break
        
case isCommand4:
if (!text) throw lenguajeGB.smsBioEd1()
if (text.length > 139) throw lenguajeGB.smsBioEd2()
try {
await conn.updateProfileStatus(text).catch(_ => _)
await conn.reply(m.chat, lenguajeGB.smsBioEd3(), m)
} catch (e) {
reportError(e)
}        
break
        
case isCommand5:
if (!text) throw lenguajeGB.smsNameEd1()
if (text.length > 25) throw lenguajeGB.smsNameEd2()
try {
await conn.updateProfileStatus(text).catch(_ => _)
await conn.reply(m.chat, lenguajeGB.smsNameEd3(), m)
} catch (e) {
reportError(e)
}        
break
        
case isCommand6:
bot = conn.user.jid
q = m.quoted ? m.quoted : m
mime = (q.msg || q).mimetype || ''
if (/image/.test(mime)) {
img = await q.download()
if (!img) throw  lenguajeGB.smsFotoEd1(usedPrefix, command)
await conn.updateProfilePicture(bot, img)
await conn.reply(m.chat, lenguajeGB.smsFotoEd2(), m)
} else throw lenguajeGB.smsFotoEd3(usedPrefix, command)        
break
        
case isCommand7:
try {  
if (global.conn.user.jid == conn.user.jid) {
let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''))
await conn.reply(m.chat, stdout.toString(), m)}
} catch {
var update = execSync('git remote set-url origin' + md + '.git && git pull')
await m.reply(update.toString())
}        
break
        
case isCommand8:
global.db.data.chats[m.chat].isBanned = true
await conn.reply(m.chat, lenguajeGB.smsBanChE(), m)        
break
        
case isCommand9:
let toUser = `@${m.sender.split("@")[0]}`
let why = lenguajeGB.smsBlockUn1(usedPrefix, command, toUser)
who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
let res = []	
let cmd = command.toLowerCase()
let comd = command.toUpperCase()
if (!who) return conn.reply(m.chat, why, m, { mentions: [m.sender] })		
for (let i = 0; i < global.owner.length; i++) {
ownerNumber = global.owner[i][0]
if (who.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
aa = ownerNumber + '@s.whatsapp.net'
await conn.reply(m.chat, lenguajeGB.smsBlockUn2(comd, ownerNumber), null, { mentions: [aa] })
return
}}
switch (true) {		
case cmd == "block" || cmd == "bloquear":
if (who) {
await conn.updateBlockStatus(who, "block").then(() => { res.push(who) })
} else {
await conn.reply(m.chat, why, m, { mentions: [m.sender] })}
break
case cmd == "unblock" || cmd == "desbloquear":
if (who) {
await conn.updateBlockStatus(who, "unblock").then(() => { res.push(who) })
} else {
await conn.reply(m.chat, why, m, { mentions: [m.sender] })}
break
}
let useB = `${res ? `${res.map(v => '@' + v.split("@")[0])}` : ''}`
if (res[0]) conn.reply(m.chat, lenguajeGB.smsBlockUn3(comd, useB), m, { mentions: res })
break
        
case isCommand10:
function no(number){
return number.replace(/\s/g,'').replace(/([@+-])/g,'')}
text = no(text)
if(isNaN(text)) {
number = text.split`@`[1]
} else if(!isNaN(text)) {
number = text
}
if(!text && !m.quoted) return conn.reply(m.chat, lenguajeGB.smsRestarU1(), m)
if(isNaN(number)) return conn.reply(m.chat, lenguajeGB.smsRestarU2(), m)
try {
if(text) {
user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
user = m.quoted.sender
} else if(m.mentionedJid) {
user = number + '@s.whatsapp.net'
}} catch (e) {
} finally {  
let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
let participants = m.isGroup ? groupMetadata.participants : []
users = m.isGroup ? participants.find(u => u.jid == user) : {}
number = user.split('@')[0] 
delete global.global.db.data.users[user]
conn.reply(m.chat, lenguajeGB.smsRestarU3(number), null, { mentions: [user] })
}        
break
        
case isCommand11:
try {  
user = m.sender.split('@')[0] 
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
let link = (m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text
let [_, code] = link.match(linkRegex) || []
if (!code) throw lenguajeGB.smsJoin1(usedPrefix, command)
if ( isOwner || m.fromMe) {
await m.reply(lenguajeGB.smsJoin2())
res = await conn.groupAcceptInvite(code)
await conn.sendMessage(res, { text: `${packname}\n_SE HA UNIDO AL GRUPO_ 😻😻😻`, mentions: (await conn.groupMetadata(`${res}`)).participants.map(v => v.id) }, { quoted: fkontak })
await conn.reply(res, `🫶 *FUI INVITADA POR: @${user}*`, null, { mentions: [m.sender] })
}} catch (e) {
reportError(e)
}        
break
       
}}

handler.command = /^(backup|respaldo|copia|ban(user|usuario|earuser|earusuario)|seradmin|autoadmin|tenerpoder|(set|cambiar|nueva|new)(bio|botbio|biobot)|(set|cambiar|nuev(a|o)?|new)(name|botname|namebot|nombre|nombrebot|botnombre)|(set|cambiar|nueva|new)(ppbot|botpp|fotobot|botfoto)|update|actualizar|ups|banchat|banearchat|salir|leavegc|salirdelgrupo|leave|block|unblock|bloquear|desbloquear|restablecerdatos|borrardatos|deletedatauser|join|nuevogrupo|newgrupo|unete)$/i
handler.owner = true

export default handler
