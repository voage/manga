import axios from 'axios';

const creds = {
  grant_type: 'password',
  username: process.env.EXPO_PUBLIC_MANGADEX_USERNAME,
  password: process.env.EXPO_PUBLIC_MANGADEX_PASSWORD,
  client_id: process.env.EXPO_PUBLIC_MANGADEX_CLIENT_ID,
  client_secret: process.env.EXPO_PUBLIC_MANGADEX_CLIENT_SECRET,
};

const getAccessToken = async () => {
  try {
    const response = await axios({
      method: 'POST',
      url: `https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: creds,
    });

    const { access_token, refresh_token } = response.data;

    return { access_token, refresh_token };
  } catch (error) {
    throw error;
  }
};

const refreshCreds = {
  grant_type: 'refresh_token',
  client_id: process.env.EXPO_PUBLIC_MANGADEX_CLIENT_ID,
  client_secret: process.env.EXPO_PUBLIC_MANGADEX_CLIENT_SECRET,
};

const refreshToken = async (refreshToken) => {
  refreshCreds.refresh_token = refreshToken;

  try {
    const response = await axios({
      method: 'POST',
      url: `https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token/auth/refresh`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: refreshCreds,
    });

    const { access_token } = response.data;

    return access_token;
  } catch (error) {
    throw error;
  }
};
