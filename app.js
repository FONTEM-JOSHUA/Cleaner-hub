const App = () => {
    return (
        <div className="container">
            <div className="logo">
                <img src="stitch_cleaners_hub/welcome_screen/screen.png" alt="Cleaners Hub Logo" />
            </div>
            <h1>CLEANERS HUB</h1>
            <p>THE HARMONY NETWORK</p>
            <h2>Your Home, Perfectly Managed</h2>
            <p>Find trusted professionals for cleaning, cooking, caregiving, and more in just a few taps.</p>
            <button className="btn btn-primary">Sign Up</button>
            <button className="btn btn-secondary">Log In</button>
            <a href="#" className="guest-link">Continue as Guest</a>
            <p className="terms">By continuing, you agree to our Terms & Privacy Policy</p>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
