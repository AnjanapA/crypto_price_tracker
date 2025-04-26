import { createSlice } from '@reduxjs/toolkit';
import { sampleCryptoData } from '../../utils/sampleData';
import { simulatePriceChange } from '../../utils/simulateData';

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: sampleCryptoData,
  reducers: {
    updateCryptoData: (state) => {
      return state.map(asset => simulatePriceChange(asset));
    },
  },
});

export const { updateCryptoData } = cryptoSlice.actions;
export default cryptoSlice.reducer;
