import mixpanel from "mixpanel-browser";

export enum event_name_enum {
  inbound = "Inbound Link",
  outbound = "Outbound Link",
  signed_up = "Signed Up",
  sign_in = "Signed In",
  on_add_watch_list = "On add watchlist",
  open_project_detail = "open_project_detail",
  on_filter_project = "On filter project",
  on_filter_category = "On filter category",
  on_filter_chain = "On filter chain",
  on_sort_project = "On sort project",
  upgrade_to_pro = "Start 7-day trial",
  on_search_keyword = "On project search",
  on_open_project_detail = "On click project",
  on_open_alpha_hunter = "On alpha hunter",
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
