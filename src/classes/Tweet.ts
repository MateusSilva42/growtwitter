import { v4 as uuidv4 } from 'uuid';
import { Like } from './Like';
import { Users, Tweets } from '../db/db';

export class Tweet{
    private _id: string;
    private _content: string;
    private _type: string;
    private _userId: string;
    private _likes: Array<Like>;
    private _replies: Array<Tweet>;
    private createdAt: string;

    constructor(content: string) {
        this._id = uuidv4()
        this._userId = '';
        this._likes = [];
        this._replies = [];
        this._content = content;
        this._type = '';
        this.createdAt = new Date().toLocaleString();
    }

    public like(userId: string){
        const like = new Like(userId, this.id)
        this.likes.push(like)

        const tweetUser = Users.find((user) => user.id == this.userId)


        console.log(`Novo Like no tweet de ${tweetUser?.name}`)
    }

    public show(){
        const qtdLikes = this.likes? this.likes.length : 0
        const qtdReplies = this.replies? this.replies.length : 0
        const user = Users.find((user) => user.id == this.userId)
        let likeText = 'Ninguém curtiu ainda. Seja o primeiro :)'

        if(qtdLikes == 1){
            const replyUser = Users.find((user) => user.id == this.likes[0].userId)
            likeText = `@${replyUser?.name} curtiu isso`
        } else if(qtdLikes > 1){
            const replyUser = Users.find((user) => user.id == this.likes[0].userId)
            likeText = `@${replyUser?.name} e mais ${qtdLikes - 1} ${(qtdLikes-1 == 1? 'pessoa curtiu': 'pessoas curtiram')} isso`
        }

        console.log('--------------------------------------------')
        console.log(`@${user?.name}: ${this.content}`)
        console.log(`[${likeText}]`)

        console.log('Respostas: ')
        for(const reply of this.replies){
            const replyLikes = reply.likes? reply.likes.length : 0

            const replyUser = Users.find((user) => user.id == reply.userId)
            console.log(`  > @${replyUser?.name}: ${reply.content}`)

        }
    }

    public showReplies(){
        console.log(`Replies for ${this.content}`)
    }

    //Setter e Getters
    public get id(): string {
        return this._id;
      }
    
    public get userId(): string {
        return this._userId;
      }
    
    public get content(): string {
        return this._content;
      }
    
    public get type(): string {
        return this._type;
      }

    public set id(id: string){
        this._id = id}

    public set userId(userId: string){
        this._userId = userId
    }

    public set type(type: string){
        this._type = type
    }

    public set content(content: string){
        this._content = content
    }

    public set replies(replies: Array<Tweet>){
        this._replies = replies
    }

    public get likes(): Array<Like> {
        return this._likes;
    }

    public get replies(): Array<Tweet> {
        return this._replies;
    }
}