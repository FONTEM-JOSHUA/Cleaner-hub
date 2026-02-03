const { useState, useEffect, useRef } = React;

const SCREENS_BASE_PATH = 'extracted_code/stitch_cleaners_hub';

const screens = {
  'Welcome': 'welcome_screen',
  'Signup': 'login/signup_screen',
  'Home': 'home_screen_(main_dashboard)_for_client_app',
  'Find Services': 'find_services_screen_for_client_app',
  'Provider Profile': 'service_provider_profile_screen_for_client_app',
  'Booking': 'booking_screen_for_client_app',
  'My Bookings': 'my_bookings_screen_for_client_app_1',
  'Messages': 'messages_screen_for_client_app',
  'Profile': 'profile_screen_for_client_app',
  'Provider Welcome': 'provider_welcome_screen',
  'Provider Setup': 'provider_setup_screen',
  'Provider Dashboard': 'provider_dashboard_screen_1',
  'My Schedule': 'my_schedule_screen_for_provider_app',
  'Booking Requests': 'booking_requests_screen_for_provider_app',
  'My Clients': 'my_clients_screen_for_provider_app_(with_report_feature)',
  'Admin Login': 'admin_login_screen',
  'Admin Dashboard': 'admin_dashboard_screen_1',
  'Manage Users': 'manage_users_screen_for_admin_app',
  'Manage Bookings': 'manage_bookings_screen_for_admin_app',
  'App Settings': 'app_settings_screen_for_admin_app',
  'Emergency Mode': 'emergency_mode_feature_screen',
  'Real-time Tracking': 'real-time_tracking_screen',
  'Photo Verification': 'photo_verification_feature_screen',
  'Easy Payments': 'easy_payments_feature_screen',
  'Smart Notifications': 'smart_notifications_feature_screen',
  'Offline Mode': 'offline_mode_feature_screen',
  'Family Sharing': 'family_sharing_feature_screen',
  'Multi-language Support': 'multi-language_support_screen',
  'Smart Search': 'smart_search_screen',
  'Quick Rebooking': 'quick_rebooking_feature_screen',
  'Channels': 'channels_screen_(client_app_flow)_',
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('Welcome');
  const [history, setHistory] = useState(['Welcome']);
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const contentRef = useRef(null);

  const navigateTo = (screenName) => {
    if (screens[screenName]) {
      console.log('Navigating to:', screenName);
      setCurrentScreen(screenName);
      setHistory(prev => [...prev, screenName]);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const lastScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScreen(lastScreen);
    }
  };

  useEffect(() => {
    const loadScreen = async () => {
      setLoading(true);
      const screenPath = screens[currentScreen];
      try {
        const response = await fetch(`${SCREENS_BASE_PATH}/${screenPath}/code.html`);
        const html = await response.text();

        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Clean up previous screen assets
        document.querySelectorAll('[data-screen-assets]').forEach(el => el.remove());

        // Extract and inject styles
        const styles = doc.querySelectorAll('style, link[rel="stylesheet"]');
        styles.forEach(style => {
          const newStyle = style.cloneNode(true);
          newStyle.setAttribute('data-screen-assets', 'true');
          document.head.appendChild(newStyle);
        });

        // Extract and inject scripts
        const scripts = doc.querySelectorAll('script:not([src*="tailwindcss"])');
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          if (script.src) {
            newScript.src = script.src;
          } else {
            newScript.textContent = script.textContent;
          }
          newScript.setAttribute('data-screen-assets', 'true');
          document.head.appendChild(newScript);
        });

        // Handle tailwind config if present
        const tailwindConfigs = Array.from(doc.querySelectorAll('script')).filter(s => s.textContent.includes('tailwind.config'));
        tailwindConfigs.forEach(tailwindConfig => {
           const script = document.createElement('script');
           script.textContent = tailwindConfig.textContent;
           script.setAttribute('data-screen-assets', 'true');
           document.head.appendChild(script);
        });

        setHtmlContent(doc.body.innerHTML);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Failed to load screen:', error);
        setHtmlContent('<div class="p-8 text-red-500">Error loading screen.</div>');
      } finally {
        setLoading(false);
      }
    };

    loadScreen();
  }, [currentScreen]);

  // Global click listener for navigation heuristics
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('button, a');
      if (!target) return;
      if (target.closest('.dev-menu')) return; // Ignore dev menu clicks here

      const text = target.innerText.toLowerCase().replace(/\s+/g, ' ').trim();
      const iconElement = target.querySelector('.material-icons-round, .material-symbols-outlined, .material-icons');
      const iconText = iconElement ? iconElement.innerText.toLowerCase() : '';

      console.log('Clicked:', text, 'Icon:', iconText);

      // Navigation Heuristics - Order matters!
      if (text.includes('view profile')) navigateTo('Provider Profile');
      else if (text.includes('sign up as provider')) navigateTo('Provider Setup');
      else if (text.includes('sign up')) navigateTo('Signup');
      else if (text.includes('log in')) {
          if (currentScreen === 'Welcome') navigateTo('Signup');
          else if (currentScreen === 'Admin Login') navigateTo('Admin Dashboard');
          else navigateTo('Signup');
      }
      else if (text.includes('continue as guest')) navigateTo('Home');
      else if (text.includes('find services') || iconText === 'grid_view' || text === 'explore') navigateTo('Find Services');
      else if (text.includes('book now') || iconText === 'add') navigateTo('Booking');
      else if (text.includes('my bookings') || iconText === 'confirmation_number' || iconText === 'calendar_today' || text === 'bookings') navigateTo('My Bookings');
      else if (text.includes('messages') || iconText === 'chat_bubble') navigateTo('Messages');
      else if (text.includes('search')) navigateTo('Find Services');
      else if (text.includes('profile') || iconText === 'person') {
          if (text.includes('edit')) {} // stay on profile or go to edit
          else navigateTo('Profile');
      }
      else if (text.includes('book this service')) navigateTo('Booking');
      else if (text.includes('confirm booking')) navigateTo('My Bookings');
      else if (text.includes('provider login')) navigateTo('Provider Dashboard');
      else if (text.includes('my schedule')) navigateTo('My Schedule');
      else if (text.includes('new requests')) navigateTo('Booking Requests');
      else if (text.includes('my clients')) navigateTo('My Clients');
      else if (text.includes('admin login')) navigateTo('Admin Dashboard');
      else if (text.includes('manage users')) navigateTo('Manage Users');
      else if (text.includes('manage bookings')) navigateTo('Manage Bookings');
      else if (text.includes('emergency clean')) navigateTo('Emergency Mode');
      else if (iconText === 'arrow_back' || text === 'back' || text.includes('cancel')) goBack();
      else if (text === 'home' || iconText === 'home') navigateTo('Home');
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [currentScreen, history]);

  return (
    <div className="relative min-h-screen">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-[150]">
          <div className="loader"></div>
        </div>
      )}
      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Developer Menu */}
      <div className="fixed bottom-4 right-4 z-[100] dev-menu">
        <details className="bg-white p-4 rounded-xl shadow-2xl border border-blue-100 max-h-[80vh] overflow-y-auto w-64">
          <summary className="font-bold text-blue-600 cursor-pointer select-none">Dev Menu</summary>
          <div className="mt-4 space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase">Client Flow</h3>
            {['Welcome', 'Signup', 'Home', 'Find Services', 'Provider Profile', 'Booking', 'My Bookings', 'Messages', 'Profile'].map(s => (
              <button key={s} onClick={() => navigateTo(s)} className="block w-full text-left px-2 py-1 text-sm hover:bg-blue-50 rounded">{s}</button>
            ))}

            <h3 className="text-xs font-bold text-gray-400 uppercase mt-4">Provider Flow</h3>
            {['Provider Welcome', 'Provider Setup', 'Provider Dashboard', 'My Schedule', 'Booking Requests', 'My Clients'].map(s => (
              <button key={s} onClick={() => navigateTo(s)} className="block w-full text-left px-2 py-1 text-sm hover:bg-blue-50 rounded">{s}</button>
            ))}

            <h3 className="text-xs font-bold text-gray-400 uppercase mt-4">Admin Flow</h3>
            {['Admin Login', 'Admin Dashboard', 'Manage Users', 'Manage Bookings', 'App Settings'].map(s => (
              <button key={s} onClick={() => navigateTo(s)} className="block w-full text-left px-2 py-1 text-sm hover:bg-blue-50 rounded">{s}</button>
            ))}

            <h3 className="text-xs font-bold text-gray-400 uppercase mt-4">Features</h3>
            {['Emergency Mode', 'Real-time Tracking', 'Photo Verification', 'Easy Payments', 'Smart Notifications', 'Offline Mode', 'Family Sharing', 'Multi-language Support', 'Smart Search', 'Quick Rebooking', 'Channels'].map(s => (
              <button key={s} onClick={() => navigateTo(s)} className="block w-full text-left px-2 py-1 text-sm hover:bg-blue-50 rounded">{s}</button>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
