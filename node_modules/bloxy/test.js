/* eslint-disable */

const memUsage = () => {
    let mem = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Use: ${mem} MB`);
};
const bloxy = require("./");
const client = new bloxy.Client();

client.login({
    cookie: ""
}).then(async user => {
    console.log(`Logged in as ${user.id}`);
    client.initWS();
});

client.on("ready", () => {
    console.log("WebSocket is ready");
});

client.on("loggedIn", () => {
    console.log("logged in");
});

client.on("chatTyping", (data) => {
    console.log(data);
});

client.on("chatMessage", async (id, get) => {

});
