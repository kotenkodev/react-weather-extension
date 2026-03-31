import { getStoredOptions, setStoredCities, setStoredOptions } from '../utils/storage';
import { Messages } from '../utils/messages';

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    hasAutoOverlay: false,
    homeCity: 'Toronto',
    tempScale: 'metric',
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  getStoredOptions().then((options) => {
    if (options.hasAutoOverlay) {
      chrome.tabs.sendMessage(tabId, Messages.TOGGLE_OVERLAY);
    }
  });
});
