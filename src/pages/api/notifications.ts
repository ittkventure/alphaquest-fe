// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
    LensLogo,
    LogoCircle,
    StepnLogo,
    UnibotLogo,
    ConduitLogo,
    ArbdogeLogo,
} from '@/assets/images';

type Notification = {
    id: number;
    isRead: boolean;
    avatarUrl: any;
    iconUrl: any;
    projectName: string;
    title: string;
    timeAgo: string;
};

const notifications: Notification[] = [
    {
        id: 1,
        isRead: false,
        avatarUrl: LogoCircle,
        iconUrl: UnibotLogo,
        projectName: "Narratives",
        title:
            "BNB chain, a narrative from your watchlist, hits ATH search in the past 12 months",
        timeAgo: "15 hours",
    },
    {
        id: 2,
        isRead: true,
        avatarUrl: ArbdogeLogo,
        iconUrl: StepnLogo,
        projectName: "Project",
        title:
            "Grok, a project from your watchlist, has been followed by CryptoKratozz testing from",
        timeAgo: "15 hours",
    },
    {
        id: 3,
        isRead: true,
        avatarUrl: LensLogo,
        iconUrl: ConduitLogo,
        projectName: "Alpha Hunter",
        title:
            "CryptoKratozz, an Alpha Hunter from your watchlist, has just started following Grok",
        timeAgo: "15 hours",
    },
    {
        id: 4,
        isRead: true,
        avatarUrl: ArbdogeLogo,
        iconUrl: StepnLogo,
        projectName: "Project",
        title:
            "Grok, a project from your watchlist, has been followed by CryptoKratozz testing from",
        timeAgo: "15 hours",
    },
    {
        id: 5,
        isRead: false,
        avatarUrl: LogoCircle,
        iconUrl: UnibotLogo,
        projectName: "Narratives",
        title:
            "BNB chain, a narrative from your watchlist, hits ATH search in the past 12 months",
        timeAgo: "15 hours",
    },
    {
        id: 6,
        isRead: true,
        avatarUrl: LensLogo,
        iconUrl: ConduitLogo,
        projectName: "Alpha Hunter",
        title:
            "CryptoKratozz, an Alpha Hunter from your watchlist, has just started following Grok",
        timeAgo: "15 hours",
    },
];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Notification[]>
) {
    const { query: { isRead } } = req;
    if (isRead) {
        res.status(200).json([...notifications.filter(a => !(a.isRead))])
    } else {
        res.status(200).json(notifications)
    }
}
