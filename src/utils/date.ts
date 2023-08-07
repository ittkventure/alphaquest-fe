import moment from "moment";

export const formattedDate = (date: Date) => moment(date).format("MMM D");
