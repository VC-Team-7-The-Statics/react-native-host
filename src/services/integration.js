class IntegrationService {
  constructor(storage) {
    this.storage = storage;
  }

  getTokenFromStorage = async () => {
    return await this.storage.getItem("token");
  };

  setTokenToStorage = async (token) => {
    await this.storage.setItem("token", token);
  };
}

export default IntegrationService;
