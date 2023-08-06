import { v4 as uuidv4 } from 'uuid';

export class Like{
    private id: string
    private _userId: string
    private originalTweetId: string

    constructor(userId: string, originalTweetId: string) {
        this.id = uuidv4()
        this._userId = userId;
        this.originalTweetId = originalTweetId;
    }

    get userId(){
        return this._userId
    }

}