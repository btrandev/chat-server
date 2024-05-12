
export class Room {
    id: string;
    messages: Message[];
}

export type Message = {
    text: string;
    sender: any;
    date: Date;
}