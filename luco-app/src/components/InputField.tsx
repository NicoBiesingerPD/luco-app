import "./InputField.scss"
import React, {useState} from "react";

export const inputRef = React.createRef<HTMLInputElement>();
let b = 0
let i = 0
let j = 0
let multiplikator = 5
const newList = [
    "der", "die", "das", "und", "sein", "in", "zu", "haben", "ich", "werden",
    "sie", "von", "nicht", "mit", "es", "sich", "auch", "auf", "für", "an",
    "er", "so", "dass", "können", "dies", "als", "ihr", "ja", "nein", "müssen",
    "man", "aber", "alle", "oder", "wenn", "nur", "wir", "was", "mein", "bei",
    "um", "ja", "machen", "mehr", "gehen", "kommen", "jetzt", "gut", "vor",
    "sein", "noch", "zeit", "nach", "eben", "ihm", "nein", "durch", "mich",
    "mal", "weil", "wissen", "ja", "deren", "dieser", "auch", "immer", "sehen",
    "lassen", "bitte", "spielen", "will", "wollen", "klingen", "sprechen",
    "schreiben", "lesen", "nehmen", "geben", "stehen", "finden", "bleiben",
    "heute", "möchte", "wohl", "denken", "liegen", "leisten", "tragen",
    "sagen", "arbeiten", "fahren", "denken", "fordern", "finden",
    "dienen", "halten"
];
const InputField = () => {
    let [inputValue, setInputValue] = useState("");

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === " "||event.key === "Enter") {  // Überprüft, ob das Leerzeichen gedrückt wurde
            let anzuzeigenderText = ""
            b++
            if (b%multiplikator == 0){
                j= j+multiplikator
            }
            for (let i = j; i<j+multiplikator; i++){
                anzuzeigenderText= anzuzeigenderText+(newList[i]+" ")
            }
            if (b-1 == 0) {
                inputValue = " " + inputValue
            }

            if (inputValue == (" " + newList[b - 1])) {
                if (b%multiplikator == 0){
                    setValidatedContent("")
                }
                else{
                    setValidatedContent(validatedContent +  ` <span class="green-text">${inputValue}</span>`)

                }

            } else {
                if (b%multiplikator == 0){
                    setValidatedContent("")
                }
                else {
                    setValidatedContent(validatedContent + ` <span class="red-text">${inputValue}</span>`);
                    setMistakeCounter(mistakeCounter+1)
                }
            }

            setTextContent(anzuzeigenderText)
            i++
            console.log(inputValue)

                console.log(textContent)

            setInputValue("")
            return (textContent)

        }
    };
    const firstFiveWords = () =>{
        let displayedText = ""
        for (let i = 0; i<multiplikator; i++){
            displayedText= displayedText+(newList[i]+" ")

        }
        return displayedText
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value); // Aktualisiert den Input-Wert
    };

    let [textContent, setTextContent] = useState(firstFiveWords)
    let [validatedContent, setValidatedContent] = useState("")
    let [mistakeCounter, setMistakeCounter] = useState(0)
    return (
        <>
            <p>
                Counter: {mistakeCounter}
            </p>
            <p dangerouslySetInnerHTML={{ __html: validatedContent }}>
            </p>
            <p dangerouslySetInnerHTML={{__html: textContent}}>
            </p>
            <p>
            <span className="input">
                <input
                    id="inputID"
                    type="text"
                    placeholder="Gib etwas ein"
                    value={inputValue}
                    onChange={handleChange} // Wert im State aktualisieren
                    onKeyPress={handleKeyPress} // Überwacht das Drücken der Tasten
                />
                <span></span>
            </span>
            </p>
        </>
    );
};

export default InputField;


export function clone() {
    return inputRef.current ? inputRef.current.value : "";
}