import http from "http";
import ngrok from "@ngrok/ngrok";

if (!process.env.NGROK_AUTHTOKEN) {
  throw new Error("NGROK_AUTHTOKEN is not set");
}

// Create webserver
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Congrats you have created an ngrok web server");
  })
  .listen(3001, () => console.info("Node.js web server at 3001 is running..."));

// Get your endpoint online
// ngrok authtoken: process.env.NGROK_AUTHTOKEN
ngrok
  .connect({
    authtoken_from_env: true,
    domain: process.env.NGROK_DOMAIN,
    port: 3000,
  })
  .then((listener) =>
    console.info(`Ingress established at: ${listener.url()}`),
  );
