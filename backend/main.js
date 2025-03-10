// const { app, BrowserWindow } = require("electron");
// const http = require("http");

// let mainWindow;

// function waitForFrontend(url, callback) {
//   const checkServer = () => {
//     http.get(url, (res) => {
//       if (res.statusCode === 200) {
//         callback();
//       } else {
//         setTimeout(checkServer, 500);
//       }
//     }).on("error", () => setTimeout(checkServer, 500));
//   };
//   checkServer();
// }

// app.whenReady().then(() => {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//     },
//   });

//   waitForFrontend("http://localhost:5173", () => {
//     mainWindow.loadURL("http://localhost:5173");
//   });
// });