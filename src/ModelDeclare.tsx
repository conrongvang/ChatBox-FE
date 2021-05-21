export interface IobjMessage {
    id: number;
    userId: string | null;
    message: string;
    colorMessage?: string;
}

export interface IMessages {
    messages: IobjMessage[];
}

export interface IData {
    userId: string | null;
    message: string;
    colorMessage?: string;
}

export interface IState {
    userId: string | null;
}

export interface IUser {
    _id: string;
    username: string;
    nickname?: string,
    email?: string,
    avatar?: string,
    phone?: number,
    birthday?: Date,
    friends?: string[],
    messages?: [
        {
            _id?: string,
            content?: string,
            color?: string,
            created_at?: string,
        }?
    ],
};