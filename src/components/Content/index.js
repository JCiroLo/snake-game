export default {
  name: 'Content',
  data () {
    return {
      board: null,
      score: null,
      snake: null,
      direction: null,
      boardSquares: null,
      emptySquares: null,
      moveInterval: null,
      gameStatus: false,
      drugs: false,

      gameSettings: {
        boardSize: 10,
        gameSpeed: 100,
        squareTypes: {
          emptySquare: 0,
          snakeSquare: 1,
          foodSquare: 2
        },
        directions: {
          ArrowUp: -10,
          ArrowDown: 10,
          ArrowRight: 1,
          ArrowLeft: -1
        },
        canMove: true
      }
    }
  },
  computed: {},
  methods: {
    drawSnake () {
      this.snake.forEach(square => this.drawSquare(square, 'snakeSquare'))
    },
    drawSquare (square, type) {
      const [row, column] = square.split('')
      this.boardSquares[row][column] = this.gameSettings.squareTypes[type]
      const squareElement = document.getElementById(square)
      squareElement.setAttribute('class', `square ${type}`)

      if (type === 'emptySquare') {
        this.emptySquares.push(square)
      } else {
        if (this.emptySquares.indexOf(square) !== -1) {
          this.emptySquares.splice(this.emptySquares.indexOf(square), 1)
        }
      }
    },
    moveSnake () {
      const newSquare = String(
        Number(this.snake[this.snake.length - 1]) +
          this.gameSettings.directions[this.direction]
      ).padStart(2, '0')
      const [row, column] = newSquare.split('')

      if (
        newSquare < 0 ||
        newSquare > this.gameSettings.boardSize * this.gameSettings.boardSize ||
        (this.direction === 'ArrowRight' && column == 0) ||
        (this.direction === 'ArrowLeft' && column == 9) ||
        this.boardSquares[row][column] ===
          this.gameSettings.squareTypes.snakeSquare
      ) {
        this.gameOver()
      } else {
        this.snake.push(newSquare)
        if (
          this.boardSquares[row][column] ===
          this.gameSettings.squareTypes.foodSquare
        ) {
          this.addFood()
        } else {
          const emptySquare = this.snake.shift()
          this.drawSquare(emptySquare, 'emptySquare')
        }
        this.drawSnake()
      }
    },
    resetFrame () {
      if (!this.gameSettings.canMove) {
        this.gameSettings.canMove = true
      }
    },
    addFood () {
      this.score++
      this.createRandomFood()
    },
    gameOver () {
      this.gameStatus = false
      clearInterval(this.moveInterval)
    },
    setDirection (newDirection) {
      if (this.gameSettings.canMove) {
        this.direction = newDirection
        this.gameSettings.canMove = false
      }
    },
    directionEvent ({ code }) {
      if (!this.gameStatus) {
        if (code === 'Space') {
          this.startGame()
        }
      } else {
        if (code === 'ArrowUp' || code === 'KeyW') {
          this.direction != 'ArrowDown' && this.setDirection('ArrowUp')
        } else if (code === 'ArrowDown' || code === 'KeyS') {
          this.direction != 'ArrowUp' && this.setDirection('ArrowDown')
        } else if (code === 'ArrowLeft' || code === 'KeyA') {
          this.direction != 'ArrowRight' && this.setDirection('ArrowLeft')
        } else if (code === 'ArrowRight' || code === 'KeyD') {
          this.direction != 'ArrowLeft' && this.setDirection('ArrowRight')
        }
      }
    },
    createRandomFood () {
      const randomEmptySquare = this.emptySquares[
        Math.floor(Math.random() * this.emptySquares.length)
      ]
      this.drawSquare(randomEmptySquare, 'foodSquare')
    },
    createBoard () {
      this.boardSquares.forEach((row, rowIndex) => {
        row.forEach((column, columnndex) => {
          const squareValue = `${rowIndex}${columnndex}`
          const squareElement = document.createElement('div')
          squareElement.setAttribute('class', 'square emptySquare')
          squareElement.setAttribute('id', squareValue)
          this.$refs.boardGrid.appendChild(squareElement)
          this.emptySquares.push(squareValue)
        })
      })
    },
    setGame () {
      this.snake = ['00', '01', '02', '03']
      this.score = this.snake.length
      this.direction = 'ArrowRight'
      this.boardSquares = Array.from(Array(this.gameSettings.boardSize), () =>
        new Array(this.gameSettings.boardSize).fill(
          this.gameSettings.squareTypes.emptySquare
        )
      )
      this.$refs.boardGrid.innerHTML = ''
      this.emptySquares = []
      this.createBoard()
    },
    startGame () {
      this.setGame()
      this.drawSnake()
      this.createRandomFood()
      this.gameStatus = true

      setTimeout(() => {
        this.moveInterval = setInterval(() => {
          this.moveSnake()
          this.resetFrame()
        }, this.gameSettings.gameSpeed)
      }, 1000)
    }
  },
  mounted () {
    this.setGame()
  },
  beforeMount () {
    document.addEventListener('keydown', this.directionEvent)
  },
  beforeUnmount () {
    document.removeEventListener('keydown', this.directionEvent)
  }
}
