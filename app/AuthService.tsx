import AsyncStorage from '@react-native-async-storage/async-storage';

export const refreshToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('No refresh token available');

        const response = await fetch('https://x2r9rfvwwi.execute-api.eu-north-1.amazonaws.com/dev/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        const refreshResponse = await response.json();
        if (response.ok) {
            await AsyncStorage.setItem('access_token', refreshResponse.access_token);
            await AsyncStorage.setItem('refresh_token', refreshResponse.refresh_token);
            return refreshResponse.access_token;
        } else {
            throw new Error(refreshResponse.message || 'Failed to refresh token');
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};


export const logout = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('access_token');
        const refreshToken = await AsyncStorage.getItem('refresh_token');

        if (!accessToken) throw new Error('No access token available');

        const response = await fetch(`https://azhzx0jphc.execute-api.eu-north-1.amazonaws.com/dev/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken })
        });

        console.log('Logout response:', response);

        if (response.ok) {
            await AsyncStorage.removeItem('access_token');
            await AsyncStorage.removeItem('refresh_token');
            await AsyncStorage.removeItem('user_code');
        } else {
            const errorResponse = await response.json();
            console.error('Error response body:', errorResponse);
            throw new Error(errorResponse.message || 'Failed to log out');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await fetch('https://azhzx0jphc.execute-api.eu-north-1.amazonaws.com/dev/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const loginResponse = await response.json();

        if (response.ok) {
            // Assuming loginResponse contains tokens, set them in AsyncStorage
            await AsyncStorage.setItem('access_token', loginResponse.access_token);
            await AsyncStorage.setItem('refresh_token', loginResponse.refresh_token);
            return loginResponse; // or just return true if no response data needed
        } else {
            throw new Error(loginResponse.message || 'Failed to log in user');
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

const getUserInfo = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    if (!accessToken) return null;
  
    try {
      const response = await fetch('https://azhzx0jphc.execute-api.eu-north-1.amazonaws.com/dev/users/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  };
  
