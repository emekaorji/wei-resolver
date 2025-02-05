import { useCallback, useEffect, useState } from 'react';

import { getStorage, setStorage } from '../common/storage';

const useStorage = (key, defaultValue) => {
  const [value, _setValue] = useState(defaultValue);

  // Configure the default zeroes amount to input.
  const setupChromeStorage = useCallback(async () => {
    // Existing zeroes amount value
    const zeroesAmount = await getStorage(key);

    // If the `zeroesAmount` is not found in storage, set it to the default value.
    if (!zeroesAmount) {
      await setStorage(key, defaultValue);
    } else {
      _setValue(zeroesAmount);
    }
  }, []);

  // Update the zeroes amount value in storage.
  const setValue = useCallback(async (value) => {
    await setStorage(key, value);
    _setValue(value);
  }, []);

  useEffect(() => {
    setupChromeStorage();
  }, []);

  return [value, setValue];
};

export default useStorage;
