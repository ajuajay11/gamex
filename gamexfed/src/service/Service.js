import axios from "axios";
import store from "@/store/Store.js";
const API_BASE_URL = 'http://localhost:5000/api/';
// User Authentications starts

export const register = async (regData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}register/`, regData);
      return response.data;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };
  export const login = async (logData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}login/`, logData);
      return response.data;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

export const wallet = async (wallet) => {
  try {
    const response = await axios.get( `${API_BASE_URL}wallet/${wallet}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${store.state.user.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
export const createMatch = async (match) => {
  try {
    const response = await axios.post(`${API_BASE_URL}create-match/`,match,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${store.state.user.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const walletDeposite = async (walletdepo) => {
    try {
      const response = await axios.put(`${API_BASE_URL}wallet/${walletdepo.userId}/`,
        {
            amount:walletdepo.amount,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.state.user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // http://localhost:5000/api/subscribe/6714e48dbcd98c14f02f6b85
  export const Subscribed = async (id, money) => {
    try {
      const response = await axios.post(`${API_BASE_URL}subscribe/${id}/`,money,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.state.user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };