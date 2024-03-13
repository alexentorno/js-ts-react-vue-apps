import Brain, { Paddle } from "./brain";
import { AllowedColors } from "./utils";

export default class UI {
    // real screen dimensions
    width: number = -1;
    height: number = -1;


    private scaleX: number = 1;
    private scaleY: number = 1;

    constructor(private brain: Brain, private appContainer: HTMLDivElement) {
        this.setScreenDimensions();

        console.log(this);
    }

    setScreenDimensions(width?: number, height?: number) {
        this.width = width || document.documentElement.clientWidth;
        this.height = height || document.documentElement.clientHeight;

        this.scaleX = this.width / this.brain.width;
        this.scaleY = this.height / this.brain.height;
    }

    calculateScaledX(x: number): number {
        return x * this.scaleX | 0;
    }

    calculateScaledY(y: number): number {
        return y * this.scaleY | 0;
    }

    drawBorderSingle(left: number, top: number, width: number, height: number, color: AllowedColors): void {
        let border = document.createElement('div');

        border.style.zIndex = "10";
        border.style.position = 'fixed';

        border.style.left = left + 'px';
        border.style.top = top + 'px';

        border.style.width = width + 'px';
        border.style.height = height + 'px';
        border.style.backgroundColor = color;

        this.appContainer.append(border);
    }

    drawBorder(): void {
        // top border
        this.drawBorderSingle(0, this.height - this.calculateScaledY(this.brain.borderThickness), this.width, this.calculateScaledY(this.brain.borderThickness), 'gray');
        // left
        this.drawBorderSingle(0, 0, this.calculateScaledX(this.brain.borderThickness), this.height, 'gray');
        // right
        this.drawBorderSingle(this.width - this.calculateScaledX(this.brain.borderThickness), 0, this.calculateScaledX(this.brain.borderThickness), this.height, 'gray');
        //this.drawBorderSingle(0, 0, this.width, this.calculateScaledY(this.brain.borderThickness), 'gray');
     }

    drawPaddle(paddle: Paddle): void {
        let div = document.createElement('div');

        div.style.zIndex = "10";
        div.style.position = 'fixed';

        div.style.left = this.calculateScaledX(paddle.left) + 'px';
        div.style.top = this.calculateScaledY(paddle.top) + 'px';

        div.style.width = this.calculateScaledX(paddle.width) + 'px';
        div.style.height = this.calculateScaledY(paddle.height) + 'px';

        div.style.backgroundColor = paddle.color;

        this.appContainer.append(div);
    }

    draw(): void {
        // clear previous render
        // TODO: optimize - change elems, do not recreate on every frame!!!!!
        this.appContainer.innerHTML = '';
        this.setScreenDimensions();

        this.drawBorder();
        // this.drawPaddle(this.brain.leftPaddle);
        this.drawPaddle(this.brain.paddle);
        
    }
}