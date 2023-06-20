export const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z])/i;

export const addLinksToText = (text: string) => {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return (
      '<a href="' +
      url +
      '" className="a-custom" target="_blank">' +
      url +
      "</a>"
    );
  });
};
