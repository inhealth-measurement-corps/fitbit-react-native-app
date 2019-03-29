import { observable, action } from 'mobx';

export default class appState {
  @observable
  user = {};

  @action
  setUser(user) {
    this.user = user;
  }
}
