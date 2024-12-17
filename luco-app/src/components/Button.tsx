import "./Button.scss"
import "./Button.scss";
import {clone} from "./InputField";

const Button = () => {
    return (
        <>
            <main>
                <button
                    onClick={() =>{
                        console.log(clone());

                    }}>
                    <div>
                        <span>Join today!</span>
                    </div>
                </button>
            </main>

            <div
                className="info-box"
                data-info=""
                data-issue=""
                id="button_rainbow"
            ></div>
        </>
    );
};
export default Button;




