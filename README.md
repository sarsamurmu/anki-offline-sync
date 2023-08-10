# anki-offline-sync
This repository demonstrates how you can use Anki's own sync server to sync data between a computer and a phone.

Some Anki decks are very big (like AnKing which is 3.1GB with all the media). If you have one of these decks, then it would take a lot of time to sync with AnkiWeb, and it's not like everyone's got a good internet connection all the time. For me, while I'm traveling, I lose my network connection temporarily, in such cases it becomes impossible to sync Anki with AnkiDroid. Also, it feels morally wrong to use AnkiWeb's free server to store a very big collection (4GB+). Anki 2.1.57 released its sync server, so you won't have to use AnkiWeb for syncing data, you can directly sync data from your computer to your phone without any third party and it's very fast.

Make sure you have the latest version of Anki Desktop and AnkiDroid. When this tutorial was written the versions were:
- Anki Desktop - `2.1.65`
- AnkiDroid - `2.16.2`

This tutorial was written for Windows 11. But I think things are pretty similar for other OSs.

There are many ways to make proxy servers but we will use Node.js with `http-proxy` because it's easy and download size is small.

## Setting up computer
First install [Node.js](https://nodejs.org/en/download/current) using appropriate installer (choose current version, don't install `chocolatey` if it asks). After installing open terminal or command prompt (anywhere) and run these commands to make sure it's installed properly
```shell
node -v
npm -v
```
If running these commands produces no error then you're good to go.

[Download](https://github.com/sarsamurmu/anki-offline-sync/archive/refs/heads/main.zip) this repository and extract it. Open the extracted directory and run this command in the terminal (or command prompt) (NOTE: terminal or cmd should be opened in the extracted directory)
```shell
npm i
```
This command installs the required dependency (`http-proxy`).


### Modifying `index.js`
Before editing the file, you have to find and note down these things
- *Anki executable path:* You have to find where Anki is installed in your system. In my case, it was installed in `C:/Users/sarsa/AppData/Local/Programs/Anki/anki.exe`
- *Host:* You would use the IP address of your currently connected network. In windows 11 you can find it by - WiFi icon on taskbar > Small right arrow/chevron icon beside the WiFi > Small `i` icon on top right corner of the currently connected network > Scroll down to end then find `IPv4 address`. This is your host.
- *Port:* Can be any number between 0 and 65536, but I personally prefer 27701. You won't need to do anything about this. You can change this if you're an advanced user. If you're going to change this then replace all 27701 with your port in next steps.
- *User:* Create a username and a password that you would use for your Anki. It can be anything.

Now editing the file, open `index.js` in Notepad or VS Code.
Find these lines
```js
const ANKI_PATH = ''
const HOST = '0.0.0.0'
const PORT = 27701
const USER = 'username:password'
```
Set the value of the respective variable. Note, Replace all backslash (`\`) with slash (`/`) in `ANKI_PATH`.

This is what it looked like in my case (example)
```js
const ANKI_PATH = 'C:/Users/sarsa/AppData/Local/Programs/Anki/anki.exe'
const HOST = '42.105.1.208'
const PORT = 27701
const USER = 'sarsa:doanki'
```

### Starting the server
Open terminal or cmd in the current directory then run
```
node .
```
If you are using windows then just double click on `start-server.bat` to launch the server.

You will see something like

![Screenshot 2023-08-09 001222](https://github.com/sarsamurmu/anki-offline-sync/assets/44255990/3bbadeb6-8ebf-4b7f-a754-8949bd63cb88)

Note down the proxy link (here `http://42.105.1.208:27701`). You would need it for AnkiDroid.

### Setting up Anki desktop
***NOTE:*** Make a backup before you do anything, I am not responsible for any damage it may cause.

Open Tool > Preferences > Syncing. At the very end you will find `Self-hosted sync server`, in that input box write `http://127.0.0.1:27701`

Now the syncing should work in Anki desktop. Do a complete sync. It would ask for AnkiWeb ID and password. Put the username as the AnkiWeb ID and enter password. In the above example `index.js` the username is `sarsa` and the password is `doanki`

## Setting up mobile
On AnkiDroid, go to Sidebar > Settings > Sync > Custom sync server > Sync url. Write down the proxy link (here it was `http://42.105.1.208:27701`), `OK`. Also, don't forget to enable switch on the right side of `Sync url`.

Return to homepage of the app. Tap the sync button on top right side of the screen, it would ask you for the email and password. Put the username in place of email and enter the password, then `Sign in/Log in` to sign in. Now the sync should work in AnkiDroid.

## FAQs
### Q. AnkiDroid is not syncing even though I followed all steps properly. What to do?
Make sure you've enabled "Node.js JavaScript Runtime" to access both private and public network in your ***firewall***.

### Q. Do I have to set it up again if I restart my computer?
No, just follow "Starting the server" method after the initial setup.

### Q. What should I do if my network changes?
Update the `HOST` in `index.js` and `Sync url` to the updated proxy url in AnkiDroid. 

### Q. How can I make a local network? I don't have/use WiFi router.
Just turn on the hotspot on your mobile and connect the computer to your mobile's network. It would make a local network. Turn off the cell data when doing this, so that you don't use cell data and get charged by mistake.

### Q. How to turn off the server?
Just close the terminal or cmd window.

### Q. More info?
You can read more on the [official page](https://docs.ankiweb.net/sync-server.html)
