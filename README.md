# anki-offline-sync
This repository demonstrates how you can use Anki's own sync server to sync data between a computer and a phone.

Some Anki decks are very large (like AnKing which is 3.1GB with all the media). If you have one of these decks, it can take a long time to sync with AnkiWeb, and not everyone has a good internet connection all the time. When I'm traveling, I sometimes lose my network connection temporarily. In such cases, syncing Anki with AnkiDroid becomes impossible. I also feel that it's unfair to use AnkiWeb's free servers to store such a large collection (4 GB or more). Anki 2.1.57 introduced its own sync server, so you don't have to use AnkiWeb to sync your data. You can sync data directly between your computer and phone without relying on any third-party service. It's also very fast.

Make sure you have the latest versions of Anki Desktop and AnkiDroid. At the time this tutorial was first written, the versions were:
- Anki Desktop - `2.1.65`
- AnkiDroid - `2.16.2`

This tutorial was written for Windows 11, but the steps should be quite similar for other operating systems.

There are many ways to set up a proxy server but we will use Node.js with `http-proxy-3` because it's easy to use and has a small download size.

## Setting up the computer
First, install [Node.js](https://nodejs.org/en/download/current) using the appropriate installer (choose current version). After installation, open a terminal or command prompt (you can open it in any directory) and run these commands to make sure it was installed correctly
```shell
node -v
npm -v
```
If running these commands produces no errors, you're good to go.

[Download](https://github.com/sarsamurmu/anki-offline-sync/archive/refs/heads/main.zip) this repository and extract the archive. Open the extracted directory and run the following command in a terminal (or command prompt). (NOTE: terminal or cmd should be opened in the extracted directory)
```shell
npm i
```
This command installs the required dependency (`http-proxy-3`).


### Modifying `index.js`
Before editing the file, you need to find and note down the following information
- *Anki executable path:* You need to find where Anki is installed on your system. In my case, it was installed in `C:/Users/sarsa/AppData/Local/Programs/Anki/anki.exe`
- *Host:* You need to use the IP address of your currently connected network. In Windows 11, you can find it by following these steps - WiFi icon on taskbar > Small right arrow/chevron icon beside the WiFi > Small `i` icon on top-right corner of the currently connected network > Scroll to the bottom and look for `IPv4 address`. This is your host.
- *Port:* It can be any number between 0 and 65535, but I personally prefer 27701. You don't need to change this. You can change it if you're an advanced user. If you decide to change it, replace every occurrence of 27701 with your chosen port number in the following steps.
- *User*: Create a username and password that you will use for Anki.

Now, open `index.js` in Notepad or VS Code.
Find these lines
```js
const ANKI_PATH = ''
const HOST = '0.0.0.0'
const PORT = 27701
const USER = 'username:password'
```
Set the values of the respective variables. Note: Replace all backslashes (`\`) with forwarded slashes (`/`) in `ANKI_PATH`.

This is what it looked like in my case (example)
```js
const ANKI_PATH = 'C:/Users/sarsa/AppData/Local/Programs/Anki/anki.exe'
const HOST = '42.105.1.208'
const PORT = 27701
const USER = 'sarsa:doanki'
```

### Starting the server
Open a terminal or command prompt in the current directory, then run:
```
node .
```
If you are using Windows, simply double-click `start-server.bat` to launch the server.

You should see something like this

![Screenshot 2023-08-09 001222](https://github.com/sarsamurmu/anki-offline-sync/assets/44255990/3bbadeb6-8ebf-4b7f-a754-8949bd63cb88)

Make a note of the proxy URL (here `http://42.105.1.208:27701`). You will need it to configure AnkiDroid.

### Setting up Anki desktop
***NOTE:*** Make a backup before proceeding. I am not responsible for any damage that may occur.

Open Tools > Preferences > Syncing. At the bottom, you will find `Self-hosted sync server`. Enter the following URL in that input box: `http://127.0.0.1:27701`

Syncing should now work in Anki Desktop. Perform a full sync. Anki will ask for your AnkiWeb ID and password. Enter your username as the AnkiWeb ID and provide your password. In the `index.js` example above, the username is `sarsa` and the password is `doanki`.

## Setting up AnkiDroid
In AnkiDroid, go to Sidebar > Settings > Sync > Custom sync server > Sync url. Enter the proxy URL (here it was `http://42.105.1.208:27701`), `OK`. Also, don't forget to turn on the switch next to `Sync url`.

Return to the app's home screen. Tap the sync button in the top-right corner of the screen. It will ask you for your email and password. Enter your username in the email field and provide your password, then `Sign in/Log in` to sign in. Syncing should now work in AnkiDroid.

## FAQs
### Q. Do I have to set it up again after restarting my computer?
No, just follow the instructions in the "Starting the server" section.

### Q. What should I do if I change networks?
Update `HOST` in `index.js` and the `Sync url` in AnkiDroid to use the updated proxy URL.

### Q. How can I create a local network if I don't have or use a Wi-Fi router?
Simply turn on your phone's hotspot and connect your computer to it. This will create a local network. Turn off mobile data while doing this to avoid accidentally using it and incurring charges.

### Q. How to turn off the server?
Simply close the terminal or command prompt window.

### Q. More info?
You can read more on the [official documentation page](https://docs.ankiweb.net/sync-server.html).
