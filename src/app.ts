import { Users, Tweets } from './db/db';
import { User } from './classes/User';
import { Tweet } from './classes/Tweet';

const user1 = new User('John', 'john', 'john@email.com', '123456');
const user2 = new User('Mary', 'mary', 'mary@email.com', '123456');
const user3 = new User('Michael', 'Michael', 'Michael@email.com', '123456');
const user4 = new User('Tobias', 'Tobias', 'tobias@email.com', '123456');

user1.sendTweet(new Tweet('Hello World!'))
user1.sendTweet(new Tweet('Tá sendo osso programar em Typescript em.'))

user2.sendTweet(new Tweet('Olá, Estou aqui, sou a Mary!'))

user1.follow(user2)

user2.reply(new Tweet('Aqui tá impossível'), user1.getUserTweets()[1].id)
user3.reply(new Tweet('Nossa, sério? Tô achando mó fácil'), user1.getUserTweets()[1].id)
user1.reply(new Tweet('Cala a boca Michael!'), user1.getUserTweets()[1].id)
user2.reply(new Tweet('É. Cala a boca cara.'), user1.getUserTweets()[1].id)

user2.likeTweet(user1.getUserTweets()[1].id)
user3.likeTweet(user1.getUserTweets()[1].id)
user4.likeTweet(user1.getUserTweets()[1].id)

const tweet1 = Tweets.find((tweet) => tweet.id == user1.getUserTweets()[1].id)

const user1Reply = tweet1?.replies?.find((reply) => reply.userId == user1.id)

user1Reply? user2.likeTweet(user1Reply.id) : 'Não foi possível dar like nesse tweet'

tweet1?.show()

user2.follow(user1)
user3.follow(user1)

user1.showFollowers()

user2.sendTweet(new Tweet('Que dia agradável para ficar em casa e programar. ;)'))
user1.likeTweet(user2.getUserTweets()[3].id)
user1.reply(new Tweet('Concordo plenamente!'), user2.getUserTweets()[3].id)

user1.showFeed()
