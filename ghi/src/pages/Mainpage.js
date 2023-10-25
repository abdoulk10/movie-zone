import { useNavigate } from "react-router-dom";
import "../styles/Mainpage.css";

function Mainpage() {
    const navigate = useNavigate();
    return (
        <div className="px-4 py-5 my-5 text-center">
            <div className="text-center">
                <h1 className="display-5 fw-bold">Movie Zone</h1>
            </div>
            <div className="d-grid gap-4 mx-auto">
                <button
                    type="button"
                    className="btn btn-lg btn-color btn-hover"
                    style={{ fontSize: "1.5rem", padding: "1rem 2rem" }}
                    onClick={() => navigate("/signup")}
                >
                    Click to Signup!
                </button>
                <button
                    type="button"
                    className="btn btn-lg btn-color2 btn-hover2"
                    style={{ fontSize: "1.5rem", padding: "1rem 2rem" }}
                    onClick={() => navigate("/login")}
                >
                    Movie Zone Member? Click to Login!
                </button>
            </div>
        </div>
    );
}

export default Mainpage;
