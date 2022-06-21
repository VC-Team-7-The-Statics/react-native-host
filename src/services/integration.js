class IntegrationService {
  constructor(storage) {
    this.storage = storage;
  }

  getTokenFromStorage = async () => await this.storage.getItem("token");

  setTokenToStorage = async (token) => {
    await this.storage.setItem("token", token);
  };
}

export default IntegrationService;
