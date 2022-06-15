import getEnvVars from "../../secrets";

const { SERVER_URL } = getEnvVars();

class ApiService {
  constructor(axios) {
    this.API = axios.create({
      baseURL: `${SERVER_URL}`,
      timeout: 5000,
    });
  }

  getFriendInfo = (friendId, JWT) => async () =>
    await this.API.get(`/user/${friendId}/chat-info`, {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    });
}

export default ApiService;
