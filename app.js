const App = () => {
  const [screen, setScreen] = React.useState('welcome'); // 'welcome' or 'login'

  const navigateTo = (screen) => {
    setScreen(screen);
  };

  if (screen === 'welcome') {
    return <WelcomeScreen navigateTo={navigateTo} />;
  } else if (screen === 'login') {
    return <LoginSignupScreen navigateTo={navigateTo} />;
  }
};

const WelcomeScreen = ({ navigateTo }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-sky-500">Welcome to Cleaner-hub</h1>
      <p className="text-gray-600 mt-2">The harmony network, where cleaners meet client</p>
      <div className="mt-8 space-y-4">
        <button className="w-full bg-sky-500 text-white py-3 rounded-lg text-lg hover:bg-sky-600 transition" onClick={() => navigateTo('login')}>Sign Up</button>
        <button className="w-full bg-white text-sky-500 border border-sky-500 py-3 rounded-lg text-lg hover:bg-sky-50 transition" onClick={() => navigateTo('login')}>Log In</button>
        <a href="#" className="text-gray-500 hover:text-gray-700">Continue as Guest</a>
      </div>
    </div>
  );
};

const LoginSignupScreen = ({ navigateTo }) => {
  const [signupData, setSignupData] = React.useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loginData, setLoginData] = React.useState({
    emailPhone: '',
    password: '',
  });

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Signup data:', signupData);
    alert('Account created! (Check console for data)');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', loginData);
    alert('Logged in! (Check console for data)');
  };

  return (
    <div className="text-center">
      <button className="absolute top-4 left-4 text-sky-500 hover:text-sky-700" onClick={() => navigateTo('welcome')}>
        &lt; Back
      </button>
      <h2 className="text-3xl font-bold text-sky-500 mb-6">Login or Sign Up</h2>
      <form className="space-y-4" onSubmit={handleSignupSubmit}>
        <input type="text" name="name" placeholder="Name" value={signupData.name} onChange={handleSignupChange} className="w-full px-4 py-2 border rounded-lg" />
        <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} className="w-full px-4 py-2 border rounded-lg" />
        <input type="tel" name="phone" placeholder="Phone" value={signupData.phone} onChange={handleSignupChange} className="w-full px-4 py-2 border rounded-lg" />
        <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} className="w-full px-4 py-2 border rounded-lg" />
        <button type="submit" className="w-full bg-sky-500 text-white py-3 rounded-lg text-lg hover:bg-sky-600 transition">Create Account</button>
      </form>
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-4 text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <form className="space-y-4" onSubmit={handleLoginSubmit}>
        <input type="text" name="emailPhone" placeholder="Email/Phone" value={loginData.emailPhone} onChange={handleLoginChange} className="w-full px-4 py-2 border rounded-lg" />
        <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} className="w-full px-4 py-2 border rounded-lg" />
        <a href="#" className="block text-right text-sm text-sky-500 hover:text-sky-700">Forgot Password?</a>
        <button type="submit" className="w-full bg-white text-sky-500 border border-sky-500 py-3 rounded-lg text-lg hover:bg-sky-50 transition">Login</button>
      </form>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
