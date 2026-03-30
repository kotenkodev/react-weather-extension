export interface LocalStorage {
  cities?: string[];
}

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
