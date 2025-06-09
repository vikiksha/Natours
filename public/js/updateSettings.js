import axios from 'axios';
import { showAlert } from './alerts';
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updatepassword'
        : '/api/v1/users/updateme';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} saved successfully`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
