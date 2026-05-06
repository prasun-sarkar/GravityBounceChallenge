body {
    margin: 0;
    overflow: hidden;
    background: black;
    text-align: center;
}

canvas {
    display: block;
    background: #111;
}

.controls {
    position: fixed;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.controls button {
    width: 100px;
    height: 60px;
    font-size: 30px;
    border: none;
    border-radius: 10px;
    background: orange;
}

#restartBtn {
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 25px;
    font-size: 20px;
    display: none;
}
