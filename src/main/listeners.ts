/* eslint-disable no-console */
import { ipcMain } from 'electron';
import getAccountData from './scraper/scrapeLolalytics';
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

export default function registerListeners() {
  const accounts: Account[] = readAccountsFromFile();

  ipcMain.on('acc:add', async (event, acc) => {
    accounts.push(acc);
    writeAccountsToFile(accounts);
  });
  // TODO error logging
  ipcMain.on('acc:reload', async (event) => {
    try {
      const updatedAccounts = await Promise.all(
        accounts.map(async (acc) => {
          try {
            const newData = await getAccountData(acc);
            return { ...acc, data: newData };
          } catch (error) {
            console.error(
              `Error reloading data for account ${acc.username}:`,
              error
            );
            // If an error occurs, return the original account without data
            return acc;
          }
        })
      );
      writeAccountsToFile(updatedAccounts);
      event.reply('acc:reload', updatedAccounts);
    } catch (error) {
      console.error('Error reloading account data:', error);
    }
  });

  ipcMain.on('acc:load', async (event, id) => {
    const account = accounts.find((acc) => acc.username === id);
    event.reply('acc:load', [account]);
  });

  ipcMain.on('acc:edit', async (event, user) => {
    accounts.forEach((account, index) => {
      if (account.username === user.username) {
        accounts[index] = user;
      }
    });
    writeAccountsToFile(accounts);
    event.reply('acc:reload', accounts);
  });

  ipcMain.on('acc:delete', async (event, user) => {
    accounts.forEach((account, index) => {
      if (account.username === user.username) {
        accounts.splice(index, 1);
      }
    });
    writeAccountsToFile(accounts);
    event.reply('acc:reload', accounts);
  });
}
