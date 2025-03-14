const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendMessage: (message) => ipcRenderer.send("message", message),
  onMessage: (callback) => ipcRenderer.on("message", (_, data) => callback(data)),
});
