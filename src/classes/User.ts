import { v4 as uuidv4 } from 'uuid';
import { Tweet } from './Tweet';
import {Users, Tweets} from '../db/db'

export class User {
    private _id: string;
    private _name: string;
    private userName: string;
    private email: string;
    private follows: Array<User>;
    private followers: Array<User>;
    password: string;

    constructor(name: string, username: string, email: string, password: string) {
        this._id = uuidv4()
        this._name = name;
        this.userName = username;
        this.email = email;
        this.password = password;
        this.follows = [];
        this.followers = [];

        this.createUser()
    }

    public createUser(){
        try{
            if(Users.find((user) => user.userName == this.userName) || Users.find((user) => user.email == this.email) || Users.find((user) => user.id == this.id)){
                throw new Error('Usuário já existe.')
             }
    
             if(this.password.length < 6){

                throw new Error('Senha muito curta')
             }
    
            Users.push(this)
            console.log(`Usuário ${this.name} criado com sucesso!`)
        } catch(error){
            console.log(error)
        }
       
    }

    public sendTweet(tweet:Tweet):void{
        tweet.userId = this.id;
        tweet.type = 'tweet';

        Tweets.push( tweet)
        console.log(`Tweet enviado por ${this.name}`)
    }

    public reply(reply:Tweet, tweetId:string):void{
        reply.userId = this.id;
        reply.type = 'reply'
        
        const replyTo = Tweets.find((tweet) => tweet.id == tweetId)
        if(!replyTo){
            console.log('Tweet não encontrado')
            return
        } else {
            replyTo?.replies?.push(reply)
            Tweets.push(reply)
        }

        const originalTweetUser = Users.find((user) => user.id == replyTo.userId)

        console.log('--------------------------------------------')
        console.log(`${this.name} respondeu ${originalTweetUser?.name}`)
        console.log('--------------------------------------------')
        console.log(`@${this.userName}: ${reply.content}`)
       
    }

    public follow(user:User):void{

        this.follows.push(user)
        console.log(`${this.name} começou seguir ${user.name}`)

        user.followers.push(this)
    }

    public showFeed(){
        let feedTweets: Array<Tweet> = []

        for( let tweet of Tweets){
            if(tweet.userId == this.id){
                feedTweets.push(tweet)
            }
            for (let user of this.follows){
                if(tweet.userId == user.id){
                    feedTweets.push(tweet)
                }
            }
        }

        console.log('--------------------------------------------')
        console.log(`Seu feed, ${this.name} \n`)

        for(const tweet of feedTweets){
            tweet.show()
        }
    }

    public getUserTweets():Array<Tweet>{
        let userTweets: Array<Tweet> = []

        Tweets.map((tweet:Tweet) => {
            if(tweet.userId == this.id){
                userTweets.push(tweet)
            }
        })

        return userTweets
    }

    public showTweets(){
        const userTweets = this.getUserTweets()

        console.log(`Seus Tweets, ${this.name}`)
        console.log('--------------------------------------------')
        
        for(const tweet of userTweets){
            console.log(`@${this.userName}: ${tweet.content}`)
            console.log('--------------------------------------------')
        }
    }

    public likeTweet(tweetId:string){
        const tweet = Tweets.find((tweet) => tweet.id == tweetId)

        if(!tweet){
            console.log('Tweet não encontrado')
            return
        } else {
            tweet.like(this.id)
        }
    }

    public showFollowers(){
        console.log('--------------------------------------------')
        console.log(`Seguidores de ${this.name} - ${this.followers.length} no total\n`)
        for(const follower of this.followers){
            console.log(`  > ${follower.name}`)
        }
        console.log('--------------------------------------------')
    }
    
    // Getters e Setters
    public get id(): string {
        return this._id;
      }

    public get name(): string {
        return this._name;
      }

}