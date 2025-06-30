
```javascript
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.6.2/+esm";

const provider = new ethers.BrowserProvider(window.ethereum);
let signer, address;

async function connectWallet() {
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  address = await signer.getAddress();
  document.getElementById("status").innerText = `Connected: ${address}`;
}

document.getElementById("connectWallet").onclick = connectWallet;

// Chat handling with Firebase Realtime DB
const chatRef = FIREBASE_APP.database().ref("chats/" + KIKUNDI_CONFIG.groupId);

document.getElementById("sendBtn").onclick = () => {
  const msg = document.getElementById("chatInput").value;
  if (msg.trim()) {
    chatRef.push({ sender: address, msg });
    document.getElementById("chatInput").value = "";
  }
};

chatRef.on("child_added", (snap) => {
  const data = snap.val();
  const box = document.getElementById("chatBox");
  box.innerHTML += `<p><b>${data.sender}</b>: ${data.msg}</p>`;
});
```
