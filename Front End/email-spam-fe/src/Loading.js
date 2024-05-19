import "./Loading.css";

function Loading (){
    return (
        <div className="loading-container">
            <div className="loading"></div>
            <div><p className="wave-text">
                <span>The</span> <span>mail</span> <span>is</span> <span>predicting</span> <span>if</span> <span>spamming</span> <span>or</span> <span>not</span> <span>...</span>
                </p>
            </div>
        </div>
    )
}

export default Loading;