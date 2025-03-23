import dotenv from "dotenv";
dotenv.config();
import  { NODE_ENV }  from './config.js';
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import http from "http";
import { fileURLToPath } from "node:url";

let mainWindow: BrowserWindow;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function waitForFrontend(url: string, callback: () => void): void {
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

app.whenReady().then(async () => {
  
  // Запуск локального сервера

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  
  // win.setMenuBarVisibility(false);

  console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');

  if (NODE_ENV === 'development') {

    waitForFrontend("http://localhost:5173", () => {
      mainWindow.loadURL("http://localhost:5173");
    });

  } else {

     mainWindow.loadFile(path.join(__dirname, "../../frontend/dist/index.html"));
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});