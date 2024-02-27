// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Account } from '../interface/accounts.interface';

export type Channels = 'acc:reload';

const electronHandler = {
  accountChangeHandler: {
    sendMessage(channel: 'acc:edit' | 'acc:delete' | 'acc:add', arg: Account) {
      ipcRenderer.send(channel, arg);
    },
    on(
      channel: 'acc:edit' | 'acc:delete' | 'acc:add',
      func: (acc: Account) => void
    ) {
      const subscription = (_event: IpcRendererEvent, acc: Account) =>
        func(acc);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
  },
  accountLoadHandler: {
    sendMessage(channel: 'acc:reload' | 'acc:load', ...args: string[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: 'acc:reload' | 'acc:load', func: (accs: Account[]) => void) {
      const subscription = (_event: IpcRendererEvent, accs: Account[]) =>
        func(accs);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: 'acc:reload' | 'acc:load', func: (accs: Account[]) => void) {
      ipcRenderer.once(channel, (_event, accs) => func(accs));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
