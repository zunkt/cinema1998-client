import JSEncrypt from "jsencrypt";
export default function({ $axios, app, store, redirect, route }) {
  $axios.defaults.timeout = 30000;
  $axios.defaults.headers.common["Content-Type"] = "application/json";
  process.env.API_KEY;
  $axios.onRequest(config => {
    config.headers.common["X-ApiKey"] = process.env.API_KEY;
    let encryptor = new JSEncrypt();
    // Setting public key
    encryptor.setPublicKey(process.env.PUBLIC_KEY);
    config.headers.common["X-ClientId"] = encryptor.encrypt(
      app.$cookiz.get("anonymous-id")
    );
  });
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
    }
    if (code === 401) {
      setTimeout(() => {
        window.location.href = "/account/login";
      }, 1000);
    }
  });
}
