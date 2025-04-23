# 🎮 Tic-Tac-Toe AI Challenge

![Tic-Tac-Toe Game](https://img.shields.io/badge/Game-Tic--Tac--Toe-blue)
![React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)
![Min-Max Algorithm](https://img.shields.io/badge/AI-Min--Max%20Algorithm-red)
![License](https://img.shields.io/badge/License-MIT-green)

An elegant, modern implementation of the classic Tic-Tac-Toe game built with React and powered by an unbeatable AI using the Min-Max algorithm.

![Game Screenshot](../assets/ss1.png)
![Game Screenshot](../assets/ss2.png)

## ✨ Features

- 💻 Clean, responsive interface built with React
- 🧠 Unbeatable AI opponent using Min-Max algorithm
- 🎯 Real-time win/draw detection
- 🔄 Instant game restart functionality
- 📱 Fully responsive design - play on any device

## 🚀 Live Demo

[Play the game online!](https://VEDLESS.github.io/tic-tac-toe-ai.git/) 

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend framework |
| JavaScript | Game logic & AI algorithm |
| CSS | Styling and animations |
| HTML | Structure and semantics |

## 🤖 AI Implementation

The computer opponent uses the **Min-Max algorithm**, a recursive decision-making algorithm that:
- Simulates all possible game states
- Evaluates each outcome
- Chooses the optimal move assuming the opponent plays perfectly

This creates an unbeatable opponent that will either win or force a draw against any player.

## 📂 Project Structure

```
tic-tac-toe-ai/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Board.js
│   │   ├── Square.js
│   │   └── GameStatus.js
│   ├── utils/
│   │   └── minmax.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed on your machine

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VEDLESS/tic-tac-toe-ai.git
   cd tic-tac-toe-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open the game in your browser**
   ```
   http://localhost:3000
   ```

## 🎯 How to Play

1. You play as 'X', and the AI plays as 'O'
2. Click on any empty square to make your move
3. The AI will automatically respond with its move
4. The first player to get 3 in a row (horizontally, vertically, or diagonally) wins
5. If all squares are filled and no one has 3 in a row, the game ends in a draw
6. Click "Play Again" to restart the game at any time

## 🧪 Running Tests

```bash
npm test
```

## 📱 Responsive Design

The game is designed to work flawlessly across all devices:
- 💻 Desktop
- 📱 Mobile phones
- 🖥️ Tablets

## 🔮 Future Enhancements

- [ ] Add difficulty levels (Easy, Medium, Hard)
- [ ] Implement local multiplayer mode
- [ ] Add sound effects and animations
- [ ] Create a leaderboard with localStorage
- [ ] Add dark/light theme toggle

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ by [VEDLESS](https://github.com/VEDLESS)

---

*Feel free to star ⭐ this repository if you find it helpful!*
