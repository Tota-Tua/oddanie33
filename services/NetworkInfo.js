import NetInfo from '@react-native-community/netinfo';

class NetworkInfo {
  _isConnected = false;
  constructor() {
    this._checkConnection();
    this.subscribe();
  }
  subscribe() {
    this._unsubscribe && this._unsubscribe();
    this._unsubscribe = NetInfo.addEventListener(state => {
      this._isConnected = state.isConnected;
    });
  }
  unsubscribe() {
    this._unsubscribe();
  }
  _checkConnection() {
    NetInfo.fetch()
      .then(state => {
        this._isConnected = state.isConnected;
      })
      .catch(() => {
        this._isConnected = undefined;
      });
  }
  get isConnected() {
    return this._isConnected;
  }
}
const NetworkInfoObj = new NetworkInfo();
export default NetworkInfoObj;
