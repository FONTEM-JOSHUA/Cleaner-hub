const App = () => {
    const [screen, setScreen] = React.useState('welcome'); // 'welcome', 'signup', 'login'

    const navigate = (screenName) => {
        setScreen(screenName);
    };

    const WelcomeScreen = () => (
        <div className="container">
            <h1>Welcome to Cleaner-Hub</h1>
            <div className="buttons">
                <button className="btn btn-primary" onClick={() => navigate('signup')}>Sign Up</button>
                <button className="btn btn-secondary" onClick={() => navigate('login')}>Log In</button>
            </div>
            <a href="#" className="guest-link">Continue as Guest</a>
        </div>
    );

    const SignupScreen = () => (
        <div className="container">
            <h2>Create Account</h2>
            <form>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Phone" />
                <input type="password" placeholder="Password" />
                <button className="btn btn-primary">Create Account</button>
            </form>
            <a href="#" onClick={() => navigate('login')}>Already have an account? Log In</a>
        </div>
    );

    const LoginScreen = () => (
        <div className="container">
            <h2>Log In</h2>
            <form>
                <input type="email" placeholder="Email/Phone" />
                <input type="password" placeholder="Password" />
                <a href="#">Forgot Password?</a>
                <button className="btn btn-primary" onClick={() => navigate('home')}>Login</button>
            </form>
            <a href="#" onClick={() => navigate('signup')}>Don't have an account? Sign Up</a>
        </div>
    );

    const HomeScreen = () => (
        <div className="home-container">
            <header className="home-header">
                <h2>Welcome, User!</h2>
                <div className="profile-icon"></div>
            </header>
            <div className="main-buttons">
                <button className="main-btn">Find Services</button>
                <button className="main-btn">Book Now</button>
                <button className="main-btn">My Bookings</button>
                <button className="main-btn">Messages</button>
            </div>
            <div className="quick-actions">
                <button className="quick-action-btn">Emergency Clean</button>
                <button className="quick-action-btn">Event Help</button>
                <button className="quick-action-btn">Subscribe</button>
            </div>
        </div>
    );

    return (
        <div>
            {screen === 'welcome' && <WelcomeScreen />}
            {screen === 'signup' && <SignupScreen />}
            {screen === 'login' && <LoginScreen />}
            {screen === 'home' && <HomeScreen />}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));