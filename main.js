require("dotenv").config();
const { app, BrowserWindow } = require("electron");
const path = require("path");
const http = require("http");
const { NODE_ENV } = require('./config');

function waitForFrontend(url, callback) {
  const checkServer = () => {
    http.get(url, (res) => {
      if (res.statusCode === 200) {
        callback();
      } else {
        setTimeout(checkServer, 500);
      }
    }).on("error", () => setTimeout(checkServer, 500));
  };
  checkServer();
}

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // win.setMenuBarVisibility(false);

  console.log(NODE_ENV, 'NODE_ENV');

  if (NODE_ENV === 'development') {

    waitForFrontend("http://localhost:5173", () => {
      mainWindow.loadURL("http://localhost:5173");
    });

  } else {
     mainWindow.loadFile(path.join(__dirname, "frontend/dist/index.html"));
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});