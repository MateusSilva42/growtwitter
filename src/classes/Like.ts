import { v4 as uuidv4 } from 'uuid';

export class Like{
    private id: string
    private userId: string
    originalTweetId: string

    constructor(userId: string, originalTweetId: string) {
        this.id = uuidv4()
        this.userId = userId;
        this.originalTweetId = originalTweetId;
    }
}