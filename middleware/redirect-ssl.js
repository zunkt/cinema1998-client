import redirectSSL from "redirect-ssl";

export default {
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === "production"
    })
  ]
};
