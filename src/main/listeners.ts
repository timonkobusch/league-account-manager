import { ipcMain } from 'electron';

import { Account } from '../interface/accounts.interface';

const fs = require('fs');
const path = require('path');

function readAccountsFromFile() {
  const data = fs.readFileSync(
    path.join(__dirname, '../renderer/accounts.json'),
    'utf-8'
  );
  return JSON.parse(data);
}

function writeAccountsToFile(accounts: Account[]) {
  const data = JSON.stringify(accounts, null, 2);
  fs.writeFileSync(
    path.join(__dirname, '../renderer/accounts.json'),
    data,
    'utf-8'
  );
}
const accounts: Account[] = readAccountsFromFile();

export default function registerListeners() {
  ipcMain.on(
    'acc:add',
    async (event, displayName, displayTag, username, password) => {
      const newAccount: Account = {
        username,
        displayName,
        displayTag,
        password,
      };

      accounts.push(newAccount);
      writeAccountsToFile(accounts);
      event.reply('acc:reload', accounts, true, '');
      setTimeout(() => {
        event.reply('acc:reload', accounts, true, 'Account added successfully');
      }, 1000);
    }
  );

  ipcMain.on('acc:reload', async (event) => {
    event.reply('acc:reload', accounts);
  });

  ipcMain.on('acc:delete', async (event, user) => {
    accounts.forEach((account, index) => {
      if (account.username === user) {
        accounts.splice(index, 1);
      }
    });
    writeAccountsToFile(accounts);
    event.reply('acc:reload', accounts);
  });
}
