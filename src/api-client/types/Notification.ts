export type Notification = {
    id: string;
    type: string;
    messsage: string;
    ref1: string;
    ref2: string;
    imageUrl: string;
    title: string;
    createdAt: Date;
    unread: boolean;
}