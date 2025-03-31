# Wordle Clone 🎮

A modern, responsive Wordle-style game built with **React** (frontend) and **Node.js/Express** (backend). Supports 5- and 6-letter word modes, clean dark UI, real-time keyboard feedback, and secure game logic.

---

## ✨ Features

- ✅ 5- and 6-letter word modes
- 🎨 Smooth UI with responsive dark theme
- ⌨️ On-screen keyboard with feedback colors
- 🔒 Anti-cheat (word stays on the server)
- ✅ Correct word displayed after loss
- 🔁 "Play Again" button resets the board

---

## 📦 Tech Stack

- **Frontend**: React + CSS
- **Backend**: Node.js + Express
- **Dev**: Docker

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Kobumbo/wordle_clone.git
cd wordle-clone
```

---

### 2. Docker Setup

```bash
docker-compose up --build
```

Runs frontend and backend in containers.

---

## 📁 Project Structure

```
/frontend                ← React app
/backend                 ← Express API
/docker-compose.yml      ← Full stack runner
```

---

## 🧪 Sample Word List Format

**words_5_letters.txt**

```
apple
trend
guess
plant
clock
```

**words_6_letters.txt**

```
planet
monkey
button
silver
candle
```

---

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/Kobumbo/images/blob/main/wordle_clone/1.png?raw=true" alt="Start Screen Image" width="400"/>
</p>
<p align="center">
  <img src="https://github.com/Kobumbo/images/blob/main/wordle_clone/2.png?raw=true" alt="Game Image 1" width="400"/>
</p>
<p align="center">
  <img src="https://github.com/Kobumbo/images/blob/main/wordle_clone/3.png?raw=true" alt="Game Image 2" width="400"/>
</p>
<p align="center">
  <img src="https://github.com/Kobumbo/images/blob/main/wordle_clone/4.png?raw=true" alt="Game Image 3" width="400"/>
</p>
<p align="center">
  <img src="https://github.com/Kobumbo/images/blob/main/wordle_clone/5.png?raw=true" alt="Game Image 4" width="400"/>
</p>
<p align="center">
  <img src="https://github.com/Kobumbo/images/blob/main/wordle_clone/6.png?raw=true" alt="Game Image Win" width="400"/>
</p>
<p align="center">
  <img src="https://github.com/Kobumbo/images/blob/main/wordle_clone/7.png?raw=true" alt="Game Image Loss" width="400"/>
</p>

---

## 📄 License

MIT — Free to use, modify and distribute.

---

## 🙌 Credits

Inspired by the original [Wordle](https://www.nytimes.com/games/wordle/index.html).  
Built with ❤️ by Bartłomiej Janota
