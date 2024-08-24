/* eslint-disable no-console */
// @ts-nocheck
/* tslint:disable */
// TODO fix tslint errors
import fetch from 'electron-fetch';
import { Account, IData } from '../../interface/accounts.interface';

const { JSDOM } = require('jsdom');

async function readFlexData(htmlDocument: Document) {
  try {
    const rankingProfile = htmlDocument.querySelector('.other-league .txt');

    if (!rankingProfile) {
      throw new Error('Flex ranking profile not found');
    }

    const league = rankingProfile
      .querySelector('.leagueTier')
      .textContent.trim();
    const lp = parseInt(
      rankingProfile.querySelector('.leaguePoints').textContent.trim(),
      10
    );
    const win = parseInt(
      rankingProfile.querySelector('.winsNumber').textContent.trim(),
      10
    );
    const lose = parseInt(
      rankingProfile.querySelector('.lossesNumber').textContent.trim(),
      10
    );

    return {
      win,
      lose,
      lp,
      league,
    };
  } catch (e) {
    return undefined;
  }
}

async function readSoloData(htmlDocument: Document) {
  try {
    const rankingProfile = htmlDocument.querySelector(
      '.mainRankingDescriptionText'
    );
    if (!rankingProfile) {
      throw new Error('Solo ranking profile not found');
    }

    const lpHTML = rankingProfile
      .querySelector('.leaguePoints')
      .textContent.trim();
    const lp = parseInt(lpHTML.split(' ')[0], 10);

    const leagueHTML = rankingProfile
      .querySelector('.leagueTier')
      .textContent.trim();
    const league = leagueHTML.split(' ').slice(0, 2).join(' ');

    const win = parseInt(
      rankingProfile.querySelector('.winslosses .wins span').textContent,
      10
    );
    const lose = parseInt(
      rankingProfile.querySelector('.winslosses .losses span').textContent,
      10
    );

    return {
      win,
      lose,
      lp,
      league,
    };
  } catch (e) {
    return undefined;
  }
}
export default async function getAccountData(acc: Account) {
  const tag = acc.displayTag.slice(1);
  const name = acc.displayName.replace(' ', '+');
  const url = `https://www.leagueofgraphs.com/en/summoner/${acc.server}/${name}-${tag}`;

  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.error('Request failed ERROR:', err);
    return undefined;
  }

  const text = await response.text();
  const dom = new JSDOM(text);
  const flexData = await readFlexData(dom.window.document);
  const soloData = await readSoloData(dom.window.document);

  const data = {
    solo: soloData,
    flex: flexData,
  } as IData;

  return data;
}
