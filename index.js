const TelegramApi = require('node-telegram-bot-api')

const token = '5827315209:AAE0OS3mnDT3pDKJXvAsqMoIWXu_3DbVBcc'

const bot = new TelegramApi(token, {polling: true})

const arrPersons = [
    {
        sex: 'female',
        is_real: false,
        features: ['имеет черные волосы', 'имеет рога', 'имеет зеленые глаза', 'имеет друга ворона', 'злая', 'имеет посох', 'имеет крылья'],
        name: 'Малефисента',
        coincidenceFeature: 0,
        image: 'https://upload.wikimedia.org/wikipedia/ru/4/4d/%D0%9C%D0%B0%D0%BB%D0%B5%D1%84%D0%B8%D1%81%D0%B5%D0%BD%D1%82%D0%B0_%D0%94%D0%B6%D0%BE%D0%BB%D0%B8.jpg'
    },
    {
        sex: 'female',
        is_real: false,
        features: ['имеет черные волосы', 'имеет лассо', 'имеет суперсилу', 'амазонка', 'имеет щит'],
        name: 'Чудо-женщина',
        coincidenceFeature: 0,
        image: 'https://i.ibb.co/0hQ9CT4/pj-Rg-Nj-Pxqc-T48-ow-Zb-SIa69m-N5z-G7-s-Lt94w-S0-HNq-Rpaw-AAv-D6g-QDM2-EGk-Qilb-J9o-MAf9-On-Yv-ACDxo.jpg'
    },
    {
        sex: 'male',
        is_real: true,
        features: ['cильный', 'играл в фильмах', 'был губернатором', 'старше 50', 'имеет троих сыновей'],
        name: 'Арнольд Шварценеггер',
        coincidenceFeature: 0,
        image: 'https://avatars.dzeninfra.ru/get-zen_doc/4375924/pub_608ba5b1b2349843c0499012_608ba89a5b922143a7f5df69/scale_2400'
    },
    {
        sex: 'male',
        is_real: false,
        features: ['имеет шрам на лбу', 'волшебник', 'жил в чулане', 'разговаривал со змеями', 'имеет черные волосы'],
        name: 'Гарри Поттер',
        coincidenceFeature: 0,
        image: 'https://kartinkin.net/uploads/posts/2022-03/1646326580_6-kartinkin-net-p-kartinki-s-garri-potterom-6.jpg'
    },
    {
        sex: 'female',
        is_real: true,
        features: ['певица', 'популярная', 'уехала из страны', 'блондинка', 'старше 50'],
        name: 'Алла Пугачева',
        coincidenceFeature: 0,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Alla_Pugacheva_on_Slavianski_Bazaar_in_Vitebsk_01_%28cropped%29.jpg/800px-Alla_Pugacheva_on_Slavianski_Bazaar_in_Vitebsk_01_%28cropped%29.jpg'
    }
]

let allFeatures = [
    {
        sex: 'female',
        features: [
            'имеет черные волосы',
            'имеет рога',
            'имеет зеленые глаза',
            'имеет друга ворона',
            'злая',
            'имеет посох',
            'имеет крылья',
            'певица',
            'популярная',
            'уехала из страны',
            'блондинка',
            'старше 50',
            'имеет суперсилу',
            'имеет лассо',
            'амазонка',
            'имеет щит'
        ]
    },
    {
        sex: 'male',
        features: [
            'cильный',
            'играл в фильмах',
            'был губернатором',
            'седой',
            'русый',
            'имеет австрийские корни',
            'рыжий',
            'хилый',
            'черные волосы',
            'шрам на лбу',
            'имеет троих сыновей',
            'старше 50'
        ]
    }
]

let allFeaturesDeepCopy = JSON.parse(JSON.stringify(allFeatures))

let chatId
let text

let questions = []
let questionNumber = 0

let currentPersons
let currentFeatures
let randomFeature

let currentImage
let currentName
let found = false

const options = {
    reply_markup: JSON.stringify({
        keyboard: [
            [{text: 'Начать игру👍'}]
        ],
        resize_keyboard: true
    })
}

const gameOptions = {
    reply_markup: JSON.stringify({
        keyboard: [
            [{text: 'Да✅'}, {text: 'Нет❌'}],
            [{text: 'Перезапустить игру'}]
        ],
        resize_keyboard: true
    })
}

const gameComplete = {
    reply_markup: JSON.stringify({
        keyboard: [
            [{text: 'Перезапустить игру'}]
        ],
        resize_keyboard: true
    })
}

const checkQuestion = async (ask) => {
    questions.push({number: questionNumber, ask: ask})
    switch (questionNumber) {
        case 0:
            await bot.sendSticker(chatId, 'https://d16u9y6cg00afk.cloudfront.net/AnyaVid/431914.160.gif')
            if (questions[questionNumber].ask) {
                updateQuestionsArr(questionNumber, {sex: 'female'})
                getCurrentArrayElement(true, arrPersons, 'sex', 'female')
                getCurrentArrayElement(false, allFeaturesDeepCopy, 'sex', 'female')
                questionNumber += 1
                return bot.sendMessage(chatId, 'Следующий вопрос😊\n' + 'Ваш персонаж существует на самом деле?🤔', gameOptions)
            } else {
                updateQuestionsArr(questionNumber, {sex: 'male'})
                getCurrentArrayElement(true, arrPersons, 'sex', 'male')
                getCurrentArrayElement(false, allFeaturesDeepCopy, 'sex', 'male')
                questionNumber += 1
                return bot.sendMessage(chatId, 'Следующий вопрос😊\n' + 'Ваш персонаж существует на самом деле?🤔', gameOptions)
            }
        case 1:
            await bot.sendSticker(chatId, 'https://d16u9y6cg00afk.cloudfront.net/AnyaVid/431914.160.gif')
            getRandomArrayElement(currentFeatures[0].features)
            if (questions[questionNumber].ask) {
                updateQuestionsArr(questionNumber, {is_real: true})
                getCurrentArrayElement(true, currentPersons,'is_real', true)
                questionNumber += 1
                return bot.sendMessage(chatId, `Следующий вопрос😊\n` + `Ваш персонаж ${randomFeature}?🤔`, gameOptions)
            } else {
                updateQuestionsArr(questionNumber, {is_real: false})
                getCurrentArrayElement(true, currentPersons, 'is_real', false)
                questionNumber += 1
                return bot.sendMessage(chatId, `Следующий вопрос😊\n` + `Ваш персонаж ${randomFeature}?🤔`, gameOptions)
            }
        default:
            currentPersons.map(async item => {
                if (item.coincidenceFeature === 3) {
                    found = true
                    currentImage = item.image
                    currentName = item.name
                }
            })
            if (!found) {
                if (questions[questionNumber].ask) {
                    updateQuestionsArr(questionNumber, {feature: randomFeature})
                    findFeature(currentPersons)
                    await getRandomArrayElement(currentFeatures[0].features)
                    if (randomFeature) {
                        await bot.sendSticker(chatId, 'https://d16u9y6cg00afk.cloudfront.net/AnyaVid/431914.160.gif')
                        questionNumber += 1
                        return await bot.sendMessage(chatId, `Следующий вопрос😊\n` + `Ваш персонаж ${randomFeature}?🤔`, gameOptions)
                    } else {
                        bot.sendSticker(chatId, 'https://aniyuki.com/wp-content/uploads/2022/05/aniyuki-anya-spy-x-family-3.gif')
                        return bot.sendMessage(chatId, `Очень жаль, но я ещё научусь угадывать😎`, gameComplete)
                    }
                } else {
                    updateQuestionsArr(questionNumber, {feature: randomFeature})
                    await getRandomArrayElement(currentFeatures[0].features)
                    if (randomFeature) {
                        await bot.sendSticker(chatId, 'https://d16u9y6cg00afk.cloudfront.net/AnyaVid/431914.160.gif')
                        questionNumber += 1
                        return await bot.sendMessage(chatId, `Следующий вопрос😊\n` + `Ваш персонаж ${randomFeature}?🤔`, gameOptions)
                    } else {
                        bot.sendSticker(chatId, 'https://aniyuki.com/wp-content/uploads/2022/05/aniyuki-anya-spy-x-family-3.gif')
                        return bot.sendMessage(chatId, `Очень жаль, но я ещё научусь угадывать😎`, gameComplete)
                    }
                }
            } else {
                await  bot.sendPhoto(chatId, currentImage)
                return bot.sendMessage(chatId, `Ваш персонаж ${currentName}?`, gameOptions)
            }
    }
}

const endGame = async () => {
    questionNumber += 1
    if (text === 'Да✅') {
        await bot.sendSticker(chatId, 'https://aniyuki.com/wp-content/uploads/2022/05/aniyuki-anya-spy-x-family-6.gif')
        return bot.sendMessage(chatId, `Ура😊\n` + `Я снова угадала😆`, gameComplete)
    } else {
        await bot.sendSticker(chatId, 'https://aniyuki.com/wp-content/uploads/2022/05/aniyuki-anya-spy-x-family-3.gif')
        return bot.sendMessage(chatId, `Очень жаль, но я ещё научусь угадывать😎`, gameComplete)
    }
}

const updateQuestionsArr = (questionNumber, obj) => {
    questions[questionNumber]['answers'] = obj
}

const getCurrentArrayElement = (forpersons, array, key, value) => {
    if (forpersons) {
        return currentPersons =  array.filter(item => item[key] === value)
    } else {
        return currentFeatures = array.filter(item => item[key] === value)
    }
}

const getRandomArrayElement = (array) => {
    randomFeature = array[Math.floor(Math.random() * array.length)]
    if (!randomFeature) {
        return
    }
    let index = array.indexOf(randomFeature)
    array.splice(index, 1)
}

const findFeature = (array) => {
    array.map(item => {
        if (item.features.find(i => i === randomFeature)) {
            item.coincidenceFeature += 1
        }
    })
}

const start = () => {
    bot.on('message', async msg => {
        text = msg.text
        chatId = msg.chat.id
        switch (text) {
            case '/start':
                await bot.sendSticker(chatId, 'https://aniyuki.com/wp-content/uploads/2022/05/aniyuki-anya-spy-x-family-12.gif')
                return bot.sendMessage(chatId, `Привет! Это игра Акинатор. В ней я угадаю персонажа задуманного тобой)`, options)
            case 'Начать игру👍':
                await bot.sendSticker(chatId, 'https://aniyuki.com/wp-content/uploads/2022/05/aniyuki-anya-spy-x-family-10.gif')
                return bot.sendMessage(chatId, 'Отлично!😊\n' + 'Ваш персонаж женского пола?🤔', gameOptions)
            case 'Да✅':
                if (questionNumber > 3 && found) {
                    return endGame()
                }
                return checkQuestion(true)
            case 'Нет❌':
                if (questionNumber > 3 && found) {
                    return endGame()
                }
                return checkQuestion(false)
            case 'Перезапустить игру':
                found = false
                allFeaturesDeepCopy = JSON.parse(JSON.stringify(allFeatures))
                questions = []
                questionNumber = 0
                arrPersons.forEach(item => {
                    item.coincidenceFeature = 0
                })
                await bot.sendSticker(chatId, 'https://aniyuki.com/wp-content/uploads/2022/05/aniyuki-anya-spy-x-family-12.gif')
                return bot.sendMessage(chatId, `Привет! Это игра Акинатор. В ней я угадаю персонажа задуманного тобой)`, options)
            default:
                await bot.sendSticker(chatId, 'https://aniyuki.com/wp-content/uploads/2022/05/aniyuki-anya-spy-x-family-2.gif')
                return bot.sendMessage(chatId, 'Я тебя не понимаю( Пожалуйста пользуйся кнопками😄')
        }
    })
}

start()
