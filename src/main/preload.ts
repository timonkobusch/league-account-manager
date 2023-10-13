// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Account } from '../interface/accounts.interface';

export type Channels = 'acc:reload';

const electronHandler = {
  textHandler: {
    sendMessage(channel: 'acc:delete' | 'acc:add', ...args: string[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (args: string) => void) {
      const subscription = (_event: IpcRendererEvent, args: string) =>
        func(args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  accountHandler: {
    sendMessage(channel: Channels) {
      ipcRenderer.send(channel);
    },
    on(
      channel: 'acc:reload',
      func: (
        accs: Account[],
        successful: boolean,
        reportMessage: string
      ) => void
    ) {
      const subscription = (
        _event: IpcRendererEvent,
        accs: Account[],
        success: boolean,
        message: string
      ) => func(accs, success, message);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(
      channel: 'acc:reload',
      func: (accs: Account[], success: boolean, message: string) => void
    ) {
      ipcRenderer.once(channel, (_event, accs, success, message) =>
        func(accs, success, message)
      );
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
