import {Snake} from "./snake.js";
import {Food} from "./food.js";

export class Game {
    context = null;
    snake = null;
    positionsCount = null;
    positionsSize = null;
    scoreElement = null;
    interval = null;
    score = 0

    constructor(context, settings) {
        this.context = context
        this.positionsCount = settings.positionsCount;
        this.positionsSize = settings.positionsSize;

        this.scoreElement = document.getElementById('score')

        document.getElementById('start').onclick = () => {
            this.startGame()
        }
    }

    startGame() {
        if (this.interval) {
            clearInterval(this.interval)
        }

        this.snake = new Snake(this.context, this.positionsCount, this.positionsSize);
        this.food = new Food(this.context, this.positionsCount, this.positionsSize);

        this.food.setNewFoodPosition()
        this.interval = setInterval(this.gameProcess.bind(this), 100)

    }

    gameProcess() {
        this.context.clearRect(0, 0, this.positionsSize * this.positionsCount,
            this.positionsSize * this.positionsCount);
        this.showGrid()
        this.food.showFood()
        let result = this.snake.showSnake(this.food.foodPosition)
        if (result) {
            if (result.collision) {
                this.endGame()

            } else if (result.gotFood) {
                this.score += 1
                this.scoreElement.innerText = this.score;
                this.food.setNewFoodPosition()
            }
        }

    }

    endGame() {
        clearInterval(this.interval)
        this.context.fillStyle = 'black';
        this.context.font = 'bold 48px Arial';
        this.context.textAlign = 'center';
        this.context.fillText('Вы набрали: ' + this.score + ' Очков!', (this.positionsSize * this.positionsCount) / 2,
            (this.positionsSize * this.positionsCount) / 2)
    }

    showGrid() {
        const size = this.positionsSize * this.positionsCount;
        for (let x = 0; x <= size; x += this.positionsSize) {
            this.context.moveTo(0.5 + x + this.positionsSize, 0);
            this.context.lineTo(0.5 + x + this.positionsSize, size + this.positionsSize);
        }

        for (let x = 0; x <= size; x += this.positionsSize) {
            this.context.moveTo(0, 0.5 + x + this.positionsSize);
            this.context.lineTo(size + this.positionsSize, 0.5 + x + this.positionsSize);
        }

        this.context.strokeStyle = "#2D2A2AFF";
        this.context.stroke();
    }

}