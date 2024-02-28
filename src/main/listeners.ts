/* eslint-disable no-console */
import { app, ipcMain } from 'electron';
import getAccountData from './scraper/scrapeLolalytics';
import { Account } from '../interface/accounts.interface';

const fs = require('fs');
const path = require('path');

const ACCOUNT_DATA_PATH = `${app.getPath(
  'appData'
)}\\League Account Manager\\accounts.json`;

function readAccountsFromFile() {
  try {
    // Ensure directory exists
    const dir = path.dirname(ACCOUNT_DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Check if the file exists
    if (!fs.existsSync(ACCOUNT_DATA_PATH)) {
      // If the file doesn't exist, create an empty file
      fs.writeFileSync(ACCOUNT_DATA_PATH, '[]', 'utf-8');
      return []; // Return an empty array
    }

    // If the file exists, read its contents and parse the JSON
    const data = fs.readFileSync(ACCOUNT_DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Handle errors, such as file read or write errors
    console.error('Error reading accounts file:', error);
    return []; // Return an empty array in case of errors
  }
}

function writeAccountsToFile(accounts: Account[]) {
  const data = JSON.stringify(accounts, null, 2);
  fs.writeFileSync(ACCOUNT_DATA_PATH, data, 'utf-8');
}

export default function registerListeners() {
  const accounts: Account[] = readAccountsFromFile();

  ipcMain.on('acc:add', async (event, acc) => {
    accounts.push(acc);
    writeAccountsToFile(accounts);
  });
  // TODO error logging
  ipcMain.on('acc:reload', async (event) => {
    event.reply('acc:reload', accounts);
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
        if (
          account.password === user.password &&
          account.server === user.server &&
          account.displayName === user.displayName &&
          account.displayTag === user.displayTag
        ) {
          return;
        }
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
