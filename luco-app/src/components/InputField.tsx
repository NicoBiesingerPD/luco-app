import React, {useState, useRef, useEffect} from "react";
import "./InputField.scss";
import {newList} from "../assets/wordlist.tsx";

let b = 1
let geschwindigkeit = 50
let delta = 1000


const InputField = () => {
    const [inputValue, setInputValue] = useState("");
    const [mistakeCounter, setMistakeCounter] = useState(0);
    const [validatedContent, setValidatedContent] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [flyingWords, setFlyingWords] = useState<{
        id: number;
        word: string;
        x: number;
        y: number;
        opacity: number;
        color: string
    }[]>([]);
    const nextId = useRef(0);
    const [, setCurrentWord] = useState<string | null>(null);


    useEffect(() => {
        const interval = setInterval(() => {
            const nextWord = newList[currentWordIndex % newList.length];
            setCurrentWord(nextWord);
            setCurrentWordIndex((prev) => prev + 1);
            addFlyingWord(nextWord);
        }, delta);

        return () => clearInterval(interval);
    }, [currentWordIndex]);
    delta = delta / 100 * 99.95
    geschwindigkeit = geschwindigkeit / 100 * 101


    useEffect(() => {
        const interval = setInterval(() => {
            setFlyingWords((words) =>
                words
                    .map((word) => {
                        if (word.y >= 450) {
                            return null;
                        }
                        return {...word, y: word.y + 5};
                    })
                    .filter((word) => word !== null) as typeof flyingWords
            );
        }, geschwindigkeit);

        return () => clearInterval(interval);
    }, []);

    const addFlyingWord = (word: string) => {
        const positionX = Math.random() * (1350 - 300) + 300;
        setFlyingWords((prev) => [
            ...prev,
            {id: nextId.current++, word, x: positionX, y: 0, opacity: 1, color: "black"}
        ]);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === " " || event.key === "Enter") {
            const trimmedInput = inputValue.trim();
            const currentWord = newList[(b - 1) % newList.length];
            b++
            if (trimmedInput === currentWord) {
                setValidatedContent((prev) => prev + ` <strong><span class="green-text">${trimmedInput}</span></strong>`);
                setFlyingWords((prevWords) =>
                    prevWords.map((word) =>
                        word.word === currentWord
                            ? {...word, color: "green", opacity: 1}
                            : word
                    )
                );
                setTimeout(() => {
                    setFlyingWords((prevWords) =>
                        prevWords.map((word) =>
                            word.word === currentWord
                                ? {...word, opacity: 0}
                                : word
                        )
                    );
                });
            } else {
                setValidatedContent((prev) => prev + ` <span class="red-text">${trimmedInput}</span>`);
                setMistakeCounter((prev) => prev + 1);
            }

            setInputValue("");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <>
            <div>
                {flyingWords.map((word) => (
                    <span
                        key={word.id}
                        className="flying-word"
                        style={{
                            position: "absolute",
                            left: `${word.x}px`,
                            top: `${word.y}px`,
                            color: word.color,
                            opacity: word.opacity,
                            transition: "top 0.1s linear, opacity 1s ease-out",
                        }}
                    >
                        {word.word}
                    </span>
                ))}
            </div>

            <p>Counter: {mistakeCounter}</p>
            <p dangerouslySetInnerHTML={{__html: validatedContent}}></p>
            <div className="input">
                <input
                    id="inputID"
                    type="text"
                    placeholder="Gib etwas ein"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </>
    );
};

export default InputField;
