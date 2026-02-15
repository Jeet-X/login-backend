import { CONFIG, getAccessToken } from './config';

export const getNotifications = async () => {
    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}api/v1/notifications`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        console.log('📬 [notificationApi] GET /notifications Response (All Categories):', JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

export const getUnreadCount = async () => {
    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}api/v1/notifications/unread-count`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching unread count:', error);
        throw error;
    }
};

export const markAsRead = async (id: string) => {
    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}api/v1/notifications/${id}/read`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
};

export const markAllAsRead = async () => {
    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}api/v1/notifications/read-all`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        throw error;
    }
};

export const deleteNotification = async (id: string) => {
    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}api/v1/notifications/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
};

export const registerToken = async (fcm_token: string, device_type: 'android' | 'ios' | 'web', device_id?: string) => {
    const payload = { fcm_token, device_type, device_id };
    console.log('🚀 [notificationApi] POST /register-token Payload:', JSON.stringify(payload, null, 2));

    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}api/v1/notifications/register-token`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log('✅ [notificationApi] POST /register-token Response:', JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.error('❌ [notificationApi] POST /register-token Error:', error);
        throw error;
    }
};

export const removeToken = async (fcm_token: string) => {
    const payload = { fcm_token };
    console.log('🚀 [notificationApi] POST /remove-token Payload:', JSON.stringify(payload, null, 2));

    try {
        const token = getAccessToken();
        const response = await fetch(`${CONFIG.BASE_URL}api/v1/notifications/remove-token`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log('✅ [notificationApi] POST /remove-token Response:', JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.error('❌ [notificationApi] POST /remove-token Error:', error);
        throw error;
    }
};
