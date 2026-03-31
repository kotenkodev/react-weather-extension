import { WeatherTempScale } from './api';

export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  hasAutoOverlay: boolean;
  tempScale: WeatherTempScale;
  homeCity: string;
}

export type LocalStorageKeys = keyof LocalStorage;

export function setStoredCities(cities: string[]): Promise<void> {
  const vals: LocalStorage = { cities };
  return chrome.storage.local.set(vals);
}

export function getStoredCities(): Promise<string[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['cities'], (res: LocalStorage) => {
      resolve(res.cities);
    });
  });
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['options'], (res: LocalStorage) => {
      resolve(res.options);
    });
  });
}
