import mixpanel from "mixpanel-browser";

export enum event_name_enum {
  inbound = "Inbound Link",
  outbound = "Outbound Link",
  signed_up = "Signed Up",
  sign_in = "Signed In",
  on_add_watch_list = "On add watchlist",
}

// Replace YOUR_TOKEN with your Project Token
const mixpanelInit = () => {
  mixpanel.init("a68cd632e712fa22e98bba4f2806ea2d", { debug: true });
};

export const mixpanelTrack = (event_name: event_name_enum, item_check: any) => {
  mixpanel.track(event_name, item_check);
};

export const mixpanelSetUserId = (userId: string) => {
  mixpanel.identify(userId);
};

export default mixpanelInit;
