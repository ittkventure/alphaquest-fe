export const AQ_BLOG_URL = "https://alphaquest.io";

export const getUserId = () => {
  const userId = localStorage.getItem("userId") || "";
  return userId;
};
