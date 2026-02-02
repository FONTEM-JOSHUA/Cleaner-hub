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

  // Special Features
  emergency_mode: 'extracted_code/stitch_cleaners_hub/emergency_mode_feature_screen/code.html',
  smart_search: 'extracted_code/stitch_cleaners_hub/smart_search_screen/code.html',
  tracking: 'extracted_code/stitch_cleaners_hub/real-time_tracking_screen/code.html',
  notifications: 'extracted_code/stitch_cleaners_hub/smart_notifications_feature_screen/code.html',
  payments: 'extracted_code/stitch_cleaners_hub/easy_payments_feature_screen/code.html',
  family_sharing: 'extracted_code/stitch_cleaners_hub/family_sharing_feature_screen/code.html',
  language: 'extracted_code/stitch_cleaners_hub/multi-language_support_screen/code.html',
  offline_mode: 'extracted_code/stitch_cleaners_hub/offline_mode_feature_screen/code.html',
  quick_rebooking: 'extracted_code/stitch_cleaners_hub/quick_rebooking_feature_screen/code.html',
  photo_verification: 'extracted_code/stitch_cleaners_hub/photo_verification_feature_screen/code.html',
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

      // Cleanup previous screen assets from Head
      document.querySelectorAll('[data-screen-assets]').forEach(el => el.remove());

      // Extract and inject styles into head
      const styles = doc.querySelectorAll('style, link[rel="stylesheet"]');
      styles.forEach(style => {
        const newStyle = document.createElement(style.tagName);
        Array.from(style.attributes).forEach(attr => newStyle.setAttribute(attr.name, attr.value));
        newStyle.innerHTML = style.innerHTML;
        newStyle.setAttribute('data-screen-assets', 'true');
        document.head.appendChild(newStyle);
      });

      // Extract and inject scripts (like tailwind config) into head
      const scripts = doc.querySelectorAll('script');
      scripts.forEach(script => {
        if (script.src && script.src.includes('tailwindcss.com')) return; // Already in index.html
        const newScript = document.createElement('script');
        Array.from(script.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.innerHTML = script.innerHTML;
        newScript.setAttribute('data-screen-assets', 'true');
        document.head.appendChild(newScript);
      });

      // Set body content
      setHtmlContent(doc.body.innerHTML);

    } catch (error) {
      console.error('Failed to load screen:', error);
      setHtmlContent('<div class="p-8 text-red-500">Failed to load screen: ' + screenKey + '</div>');
    }
    setLoading(false);
  };

  useEffect(() => {
    /**
     * Navigation Heuristics
     * NOTE: This is a prototype-level navigation system using string matching
     * on buttons and icons to simulate app flow between static HTML screens.
     */
    const handleGlobalClick = (e) => {
      const target = e.target.closest('button, a, [role="button"], input, .cursor-pointer');
      if (!target) return;

      const text = target.innerText?.trim() || target.placeholder || target.value;
      const icon = target.querySelector('.material-icons-round, .material-symbols-outlined')?.innerText?.trim() ||
                   (target.classList.contains('material-symbols-outlined') ? target.innerText?.trim() : null);

      // Navigation Heuristics
      if (text === 'Sign Up' || text === 'Log In' || text === 'Create Account') {
        navigateTo('signup');
      } else if (text === 'Continue as Guest' || icon === 'home') {
        navigateTo('client_home');
      } else if (text?.toLowerCase().includes('find services') || text?.toLowerCase().includes('browse categories') || icon === 'grid_view' || icon === 'search' || text === 'Explore' || text === 'What service do you need?') {
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
      } else if (text === 'Emergency Clean' || icon === 'bolt' || icon === 'e911_emergency') {
        navigateTo('emergency_mode');
      } else if (text?.includes('20% off') || text === 'Claim Offer') {
        navigateTo('payments');
      } else if (icon === 'tune' || text === 'Smart Search') {
        navigateTo('smart_search');
      } else if (icon === 'notifications' || text === 'Notifications') {
        navigateTo('notifications');
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

              <div>
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Special Features</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => {navigateTo('emergency_mode'); setShowDevMenu(false)}} className="text-xs bg-red-50 px-2 py-1 rounded hover:bg-red-100">Emergency</button>
                  <button onClick={() => {navigateTo('smart_search'); setShowDevMenu(false)}} className="text-xs bg-green-50 px-2 py-1 rounded hover:bg-green-100">Search</button>
                  <button onClick={() => {navigateTo('tracking'); setShowDevMenu(false)}} className="text-xs bg-green-50 px-2 py-1 rounded hover:bg-green-100">Tracking</button>
                  <button onClick={() => {navigateTo('notifications'); setShowDevMenu(false)}} className="text-xs bg-yellow-50 px-2 py-1 rounded hover:bg-yellow-100">Alerts</button>
                  <button onClick={() => {navigateTo('payments'); setShowDevMenu(false)}} className="text-xs bg-emerald-50 px-2 py-1 rounded hover:bg-emerald-100">Payments</button>
                  <button onClick={() => {navigateTo('family_sharing'); setShowDevMenu(false)}} className="text-xs bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">Family</button>
                  <button onClick={() => {navigateTo('language'); setShowDevMenu(false)}} className="text-xs bg-slate-50 px-2 py-1 rounded hover:bg-slate-100">Language</button>
                  <button onClick={() => {navigateTo('offline_mode'); setShowDevMenu(false)}} className="text-xs bg-slate-50 px-2 py-1 rounded hover:bg-slate-100">Offline</button>
                  <button onClick={() => {navigateTo('quick_rebooking'); setShowDevMenu(false)}} className="text-xs bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">Rebooking</button>
                  <button onClick={() => {navigateTo('photo_verification'); setShowDevMenu(false)}} className="text-xs bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">Verify</button>
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
