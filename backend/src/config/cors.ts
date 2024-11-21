import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.URL_FRONTEND) {
      callback(null, true);
    } else {
      callback(new Error("Errro de cors"));
    }
  },
};
