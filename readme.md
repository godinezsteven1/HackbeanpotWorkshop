# 3Js Workshop

This project was created for the **2025 HackBeanpot Hackathon**. In this workshop, I am giving users a brief one-hour intermediate introduction to 3D web development using Three.js. In these files, you will find our main (`script.js`), which will contain all of our code commented out, this is meant for teaching purposes but a simple select-All + "/" will uncomment. There is some basic HTML here, which if you do not understand here is a brief explanation of how its working. Its just dividing the page into class(or for the racket warriors, structure) 'sections' and from there i just made them link to other htmls (<a href =...>) which are just copy paste of eachother(meaning they are all using the exact same js and css file meaning you can make new js files for all of these for ultra cool stuff!) just with out the other sections there!(for simplicity) essentially i tried to make the most simple HTML with a basic cascading style sheet (css). This was sampled and inspired by three.js journey Bruno Simmons course who is a wonderful teacher who goes from completely new to js to making you a js pro!

## In order to get this to work, follow these steps :)

**All dependencies should be installed already with the JSON files and Vite configuration. Go to Step 1; if Step 1 isn't working, skip to Step 2. Otherwise, enjoy!**

### Step 1:
```bash
npm install

npm run dev
```
---- 
### Step 2: 


Install Node.js 

// MacOS
```bash
brew install node
```

// Windows

//if you have chocolatey

```bash
choco install nodejs
```

//if you have scoop

```bash
scoop install nodejs
```

// Linux environments 

```bash
sudo apt update

sudo apt install nodejs npm
```

// if you do not have brew (mac and linux)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Apple only; add Homebrew to your shell.
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Linux only: add homebrew to your shell 

```bash
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```
---- ---- 
### Step2 pt 2 

```bash
npm install                 
npm install --save three
npm install --save-dev vite
```

### Go back to Step 1 :) 



Happy Hacking 
