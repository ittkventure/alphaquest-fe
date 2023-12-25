export enum NOTIFICATION_TYPE {
    AlphaHunterFollowProject = "ALPHA_HUNTER_FOLLOWING_NEW_PROJECT",
    AlphaHunterUpdateInfo = "ALPHA_HUNTER_UPDATE_THEIR_INFO",
    ProjectFollowAlphaHunter = "PROJECT_HAS_FOLLOWED_BY_NEW_ALPHA_HUNTER",
    ProjectUpdateInfo = "PROJECT_HAS_UPDATE_THEIR_INFO",
    NarrativeChange = "NARRATIVE_CHANGE",
}

export type Notification = {
    id: string;
    type: NOTIFICATION_TYPE;
    message: string;
    ref1: string;
    ref2: string;
    imageUrl: string;
    title: string;
    createdAt: Date;
    unread: boolean;
}