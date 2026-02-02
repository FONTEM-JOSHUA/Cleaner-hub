const { useState, useEffect } = React;

const SCREENS = {
  // Common
  welcome: 'extracted_code/stitch_cleaners_hub/welcome_screen/code.html',
  signup: 'extracted_code/stitch_cleaners_hub/login/signup_screen/code.html',

  // Client Flow
  client_home: 'extracted_code/stitch_cleaners_hub/home_screen_(main_dashboard)_for_client_app/code.html',
  find_services: 'extracted_code/stitch_cleaners_hub/find_services_screen_for_client_app/code.html',
  provider_profile: 'extracted_code/stitch_cleaners_hub/service_provider_profile_screen_for_client_app/code.html',
  booking: 'extracted_code/stitch_cleaners_hub/booking_screen_for_client_app/code.html',
  my_bookings: 'extracted_code/stitch_cleaners_hub/my_bookings_screen_for_client_app_1/code.html',
  messages: 'extracted_code/stitch_cleaners_hub/messages_screen_for_client_app/code.html',
  client_profile: 'extracted_code/stitch_cleaners_hub/profile_screen_for_client_app/code.html',

  // Provider Flow
  provider_welcome: 'extracted_code/stitch_cleaners_hub/provider_welcome_screen/code.html',
  provider_setup: 'extracted_code/stitch_cleaners_hub/provider_setup_screen/code.html',
  provider_home: 'extracted_code/stitch_cleaners_hub/provider_dashboard_screen_1/code.html',
  provider_schedule: 'extracted_code/stitch_cleaners_hub/my_schedule_screen_for_provider_app/code.html',
  booking_requests: 'extracted_code/stitch_cleaners_hub/booking_requests_screen_for_provider_app/code.html',

  // Admin Flow
  admin_login: 'extracted_code/stitch_cleaners_hub/admin_login_screen/code.html',
  admin_home: 'extracted_code/stitch_cleaners_hub/admin_dashboard_screen_1/code.html',
  manage_users: 'extracted_code/stitch_cleaners_hub/manage_users_screen_for_admin_app/code.html',
  manage_bookings: 'extracted_code/stitch_cleaners_hub/manage_bookings_screen_for_admin_app/code.html',
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [history, setHistory] = useState([]);
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDevMenu, setShowDevMenu] = useState(false);

  const navigateTo = (screen) => {
    if (screen !== currentScreen) {
      setHistory([...history, currentScreen]);
      setCurrentScreen(screen);
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('client_home');
    }
  };

  useEffect(() => {
    loadScreen(currentScreen);
  }, [currentScreen]);

  const loadScreen = async (screenKey) => {
    setLoading(true);
    try {
      const response = await fetch(SCREENS[screenKey]);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Extract body content
      const bodyContent = doc.body.innerHTML;

      // Extract styles from head
      const styles = Array.from(doc.head.querySelectorAll('style')).map(s => s.outerHTML).join('\n');

      // Extract scripts from head (especially tailwind config)
      const headScripts = Array.from(doc.head.querySelectorAll('script')).map(s => s.outerHTML).join('\n');

      setHtmlContent(styles + headScripts + bodyContent);

      // We need to re-execute scripts after the content is in the DOM
      // This will be handled in a separate useEffect or after state update
    } catch (error) {
      console.error('Failed to load screen:', error);
      setHtmlContent('<div class="p-8 text-red-500">Failed to load screen: ' + screenKey + '</div>');
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest('button, a, [role="button"]');
      if (!target) return;

      const text = target.innerText?.trim();
      const icon = target.querySelector('.material-icons-round, .material-symbols-outlined')?.innerText?.trim();

      // Navigation Heuristics
      if (text === 'Sign Up' || text === 'Log In' || text === 'Create Account') {
        navigateTo('signup');
      } else if (text === 'Continue as Guest' || icon === 'home') {
        navigateTo('client_home');
      } else if (text?.toLowerCase().includes('find services') || text?.toLowerCase().includes('browse categories') || icon === 'grid_view' || icon === 'search' || text === 'Explore') {
        navigateTo('find_services');
      } else if (text?.toLowerCase().includes('book now') || icon === 'add' || icon === 'calendar_today' || text === 'Bookings') {
        navigateTo('booking');
      } else if (text?.toLowerCase().includes('my bookings') || icon === 'confirmation_number' || icon === 'calendar_month') {
        navigateTo('my_bookings');
      } else if (text === 'Messages' || icon === 'chat_bubble' || icon === 'mail' || icon === 'inbox') {
        navigateTo('messages');
      } else if (text === 'Profile' || icon === 'person') {
        navigateTo('client_profile');
      } else if (text === 'View Profile' || text === 'Book This Service' || text === 'View Details') {
        navigateTo('provider_profile');
      } else if (text === 'Confirm Booking') {
        navigateTo('my_bookings');
      } else if (icon === 'arrow_back' || icon === 'chevron_left') {
        goBack();
      } else if (text === 'Log Out') {
        setCurrentScreen('welcome');
        setHistory([]);
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [currentScreen]);

  useEffect(() => {
    if (!loading && htmlContent) {
      // Re-execute scripts
      const container = document.getElementById('screen-content');
      if (container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.appendChild(document.createTextNode(oldScript.innerHTML));
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
      }
    }
  }, [htmlContent, loading]);

  return (
    <div className="app-container">
      {/* Dev Menu */}
      <div className="fixed top-4 right-4 z-[9999]">
        <button
          onClick={() => setShowDevMenu(!showDevMenu)}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>

        {showDevMenu && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 animate-fade-in">
            <h3 className="text-lg font-bold mb-3 text-slate-900 border-b pb-2">Demo Flows</h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Client Flow</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => {navigateTo('welcome'); setShowDevMenu(false)}} className="text-xs bg-slate-100 px-2 py-1 rounded hover:bg-slate-200">Welcome</button>
                  <button onClick={() => {navigateTo('client_home'); setShowDevMenu(false)}} className="text-xs bg-slate-100 px-2 py-1 rounded hover:bg-slate-200">Home</button>
                  <button onClick={() => {navigateTo('find_services'); setShowDevMenu(false)}} className="text-xs bg-slate-100 px-2 py-1 rounded hover:bg-slate-200">Find Services</button>
                  <button onClick={() => {navigateTo('my_bookings'); setShowDevMenu(false)}} className="text-xs bg-slate-100 px-2 py-1 rounded hover:bg-slate-200">Bookings</button>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Provider Flow</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => {navigateTo('provider_welcome'); setShowDevMenu(false)}} className="text-xs bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">Welcome</button>
                  <button onClick={() => {navigateTo('provider_home'); setShowDevMenu(false)}} className="text-xs bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">Dashboard</button>
                  <button onClick={() => {navigateTo('provider_schedule'); setShowDevMenu(false)}} className="text-xs bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">Schedule</button>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Admin Flow</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => {navigateTo('admin_login'); setShowDevMenu(false)}} className="text-xs bg-purple-50 px-2 py-1 rounded hover:bg-purple-100">Login</button>
                  <button onClick={() => {navigateTo('admin_home'); setShowDevMenu(false)}} className="text-xs bg-purple-50 px-2 py-1 rounded hover:bg-purple-100">Dashboard</button>
                  <button onClick={() => {navigateTo('manage_users'); setShowDevMenu(false)}} className="text-xs bg-purple-50 px-2 py-1 rounded hover:bg-purple-100">Users</button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowDevMenu(false)}
              className="mt-4 w-full py-2 bg-slate-900 text-white rounded-lg text-sm font-bold"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-screen bg-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      ) : (
        <div
          id="screen-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app-root'));
root.render(<App />);
