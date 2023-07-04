const TelegramApi = require('node-telegram-bot-api')
const{gameOption, againOption} = require('./options')
const token = '6010867227:AAGT9Q4-A2MnIL7ie8_2bypLgOuQ_OALdLA'

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен будешь ее отгадать`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOption)
}

const start = () => {
    const bot = new TelegramApi(token, { polling: true })
    bot.setMyCommands([
        { command: '/start', description: 'Начальное приветствие' },
        { command: '/info', description: 'Получить информацию о пользователе' },
        { command: '/game', description: 'Игра угадай число' }
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ff3/b34/ff3b3412-3876-3d4d-8e43-aed38f7f8d6a/192/10.webp')
            return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот Que Pasa`);
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зоввут ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        if (text === '/again') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!')


    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Поздравляю, ты угадал цифру ${chats[chatId]}`, againOption)
        } else {
            bot.sendMessage(chatId, `К сожелению ты не угадал цифру - ${chats[chatId]}`, againOption)
        }

    })
}
start()     