import {
  getActiveWindow,
  Key,
  keyboard,
  mouse,
  screen,
  pixelWithColor,
  RGBA,
  Point,
  sleep,
} from '@nut-tree-fork/nut-js';

async function focusLeagueClient() {
  try {
    const location = await screen.find(
      pixelWithColor(new RGBA(235, 0, 41, 255)),
    );
    await mouse.setPosition(location);
    await mouse.leftClick();
  } catch (e) {
    return false;
  }
  return true;
}

async function inputCredentials(username: string, password: string) {
  let windowRef;
  const MAX_TRIES = 30;
  let tries = 0;
  let title = '';
  while (title === 'Riot Client') {
    /* eslint-disable no-await-in-loop */
    windowRef = await getActiveWindow();
    await sleep(100);
    title = await windowRef.title;
    if (title === 'Riot Client') {
      break;
    }
    if (tries >= MAX_TRIES) {
      return false;
    }
    tries += 1;
  }
  if (!windowRef) {
    return false;
  }
  const region = await windowRef.region;
  await mouse.setPosition(new Point(region.left + 100, region.top + 250));
  await mouse.leftClick();
  await keyboard.type(Key.LeftControl, Key.A);
  await keyboard.type(username);
  await keyboard.type(Key.Tab);
  await keyboard.type(password);
  await keyboard.type(Key.Enter);
  return true;
}

async function autoLogin(username: string, password: string) {
  keyboard.config.autoDelayMs = 0;
  const foundClient = await focusLeagueClient();
  if (!foundClient) {
    return {
      success: false,
      message: 'Could not find League Client. Is it open?',
    };
  }
  const inputSuccessful = await inputCredentials(username, password);
  if (!inputSuccessful) {
    return {
      success: false,
      message: 'Could not input credentials. Is the client open?',
    };
  }
  const message = `Account ${username} logged in.`;
  return { success: true, message };
}

export default autoLogin;
