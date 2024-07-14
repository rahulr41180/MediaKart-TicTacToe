
import React, { useState, useEffect } from 'react';
import "../CSS/FunctionalityComponent.css";
import "../CSS/styles.css";
import { BoardComponent } from './BoardComponent';
import { CalculateWinnerLogic } from '../Logic/CalculateWinnerLogic';

export const FunctionalityComponent = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const [winner, setWinner] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    // checking that square is free or not
    useEffect(() => {
        if (!xIsNext && !isGameFinished && !isPaused) {
            const timeout = setTimeout(() => {
                const current = history[stepNumber];
                const emptyIndexes = current.reduce((acc, val, idx) => {
                    if (val === null) acc.push(idx);
                    return acc;
                }, []);
                if (emptyIndexes.length > 0) {
                    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
                    handleClick(randomIndex);
                }
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [xIsNext, history, stepNumber, isGameFinished, isPaused]);

    // Square clicked functionality
    const handleClick = (i) => {
        if (isPaused) return;
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        const squares = [...current];
        if (CalculateWinnerLogic(squares) || squares[i]) return;

        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXIsNext(!xIsNext);

        const gameResult = CalculateWinnerLogic(squares);
        if (gameResult) {
            setWinner(gameResult);
            setIsGameFinished(true);
        } else if (!squares.includes(null)) {
            setIsGameFinished(true);
        }
    };

    // reset game
    const resetGame = () => {
        setHistory([Array(9).fill(null)]);
        setStepNumber(0);
        setXIsNext(true);
        setIsGameFinished(false);
        setWinner(null);
        setIsPaused(false);
    };

    // pause game
    const pauseGame = () => {
        setIsPaused(true);
    };

    // resume game
    const resumeGame = () => {
        setIsPaused(false);
    };

    // game status checking here
    useEffect(() => {
        if (isGameFinished) {
            setTimeout(() => {
                if (winner) {
                    if (winner === 'X') {
                        window.open('https://www.amazon.com', '_blank');
                    }
                    if (window.confirm(`Game Over. ${winner === 'X' ? 'You have won the game.' : 'You have lost the game.'} Click OK to restart.`)) {
                        resetGame();
                    }
                } else {
                    if (window.confirm('Match tied. Click OK to restart.')) {
                        resetGame();
                    }
                }
            }, 100);
        }
    }, [isGameFinished, winner]);

    return (
        <div className="game">
            <div className="game-board">
                <BoardComponent squares={history[stepNumber]} onClick={handleClick} />
            </div>
            <div className="game-controls">
                <button className="game_control_btn" onClick={resetGame}>Restart</button>
                <button className="game_control_btn" onClick={pauseGame} disabled={isPaused || isGameFinished}>Pause</button>
                <button className="game_control_btn" onClick={resumeGame} disabled={!isPaused || isGameFinished}>Resume</button>
            </div>
        </div>
    )
}