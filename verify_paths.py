import os

SCREEN_MAP = {
    'WELCOME': 'welcome_screen/code.html',
    'SIGNUP': 'login/signup_screen/code.html',
    'LOGIN': 'login/signup_screen/code.html',
    'CLIENT_HOME': 'home_screen_(main_dashboard)_for_client_app/code.html',
    'FIND_SERVICES': 'find_services_screen_for_client_app/code.html',
    'PROVIDER_PROFILE': 'service_provider_profile_screen_for_client_app/code.html',
    'BOOKING': 'booking_screen_for_client_app/code.html',
    'MY_BOOKINGS': 'my_bookings_screen_for_client_app_1/code.html',
    'MY_BOOKINGS_2': 'my_bookings_screen_for_client_app_2/code.html',
    'MY_BOOKINGS_3': 'my_bookings_screen_for_client_app_3/code.html',
    'PROVIDER_WELCOME': 'provider_welcome_screen/code.html',
    'PROVIDER_SETUP': 'provider_setup_screen/code.html',
    'PROVIDER_DASHBOARD': 'provider_dashboard_screen_1/code.html',
    'PROVIDER_DASHBOARD_2': 'provider_dashboard_screen_2/code.html',
    'PROVIDER_BOOKING_REQUESTS': 'booking_requests_screen_for_provider_app/code.html',
    'MY_CLIENTS': 'my_clients_screen_for_provider_app_(with_report_feature)/code.html',
    'MY_SCHEDULE': 'my_schedule_screen_for_provider_app/code.html',
    'PROVIDER_PROFILE_PUBLIC': 'provider_profile_(public_view)_screen/code.html',
    'ADMIN_LOGIN': 'admin_login_screen/code.html',
    'ADMIN_DASHBOARD': 'admin_dashboard_screen_1/code.html',
    'ADMIN_DASHBOARD_2': 'admin_dashboard_screen_2/code.html',
    'ADMIN_DASHBOARD_3': 'admin_dashboard_screen_3/code.html',
    'ADMIN_DASHBOARD_4': 'admin_dashboard_screen_4/code.html',
    'ADMIN_PROFILE_EDIT': 'admin_profile_edit_screen/code.html',
    'ADMIN_SETTINGS': 'app_settings_screen_for_admin_app/code.html',
    'ADMIN_MANAGE_BOOKINGS': 'manage_bookings_screen_for_admin_app/code.html',
    'ADMIN_MANAGE_USERS': 'manage_users_screen_for_admin_app/code.html',
    'MESSAGES': 'messages_screen_for_client_app/code.html',
    'PROFILE': 'profile_screen_for_client_app/code.html',
    'CHANNEL_MANAGEMENT': 'channel_management_screen_(provider/admin_app)_/code.html',
    'CHANNEL_MEMBER_MANAGEMENT': 'channel_member_management_screen_(provider/admin_app)_/code.html',
    'CHANNELS_CLIENT': 'channels_screen_(client_app_flow)_/code.html',
    'CLIENT_REPORT_CONFIRMATION': 'client_report_confirmation_screen_(provider_app)_/code.html',
    'CREATE_CHANNEL': 'create_new_channel_flow_(provider/admin_app)_/code.html',
    'EASY_PAYMENTS': 'easy_payments_feature_screen/code.html',
    'EMERGENCY_MODE': 'emergency_mode_feature_screen/code.html',
    'FAMILY_SHARING': 'family_sharing_feature_screen/code.html',
    'MULTI_LANGUAGE': 'multi-language_support_screen/code.html',
    'OFFLINE_MODE': 'offline_mode_feature_screen/code.html',
    'PHOTO_VERIFICATION': 'photo_verification_feature_screen/code.html',
    'QUICK_REBOOKING': 'quick_rebooking_feature_screen/code.html',
    'REAL_TIME_TRACKING': 'real-time_tracking_screen/code.html',
    'REPORT_CLIENT': 'report_client_screen_for_provider_app/code.html',
    'REPORT_CONFIRMATION': 'report_confirmation_screen/code.html',
    'REPORT_PROVIDER': 'report_provider_screen_for_client_app/code.html',
    'SMART_NOTIFICATIONS': 'smart_notifications_feature_screen/code.html',
    'SMART_SEARCH': 'smart_search_screen/code.html'
}

base_path = 'extracted_code/stitch_cleaners_hub/'
missing = []
for key, path in SCREEN_MAP.items():
    full_path = os.path.join(base_path, path)
    if not os.path.exists(full_path):
        missing.append((key, full_path))

if missing:
    print("Missing files:")
    for key, path in missing:
        print(f"{key}: {path}")
else:
    print("All files exist!")
