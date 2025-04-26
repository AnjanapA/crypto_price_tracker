export const simulatePriceChange = (asset) => {
  const fluctuation = 1 + ((Math.random() - 0.5) * 0.02); // ±1%
  const newPrice = +(asset.price * fluctuation).toFixed(2);

  const newSparkline = [...(asset.sparkline || [])];

  if (newSparkline.length >= 7) {
    newSparkline.shift(); // keep only 7 days
  }
  newSparkline.push({ price: newPrice });

  return {
    ...asset,
    price: newPrice,
    sparkline: newSparkline,
    volume24h: +(asset.volume24h * (1 + ((Math.random() - 0.5) * 0.1))).toFixed(2),
    marketCap: +(newPrice * asset.circulatingSupply).toFixed(2),
    changes: {
      '1h': +(Math.random() * 4 - 2).toFixed(2),   
      '24h': +(Math.random() * 10 - 5).toFixed(2), 
      '7d': +(Math.random() * 20 - 10).toFixed(2)
    }
  };
};





// export const simulatePriceChange = (asset) => {
//     const fluctuation = 1 + ((Math.random() - 0.5) * 0.02); // ±1%
//     const newPrice = +(asset.price * fluctuation).toFixed(2);
//     const newVolume = +(asset.volume24h * (1 + ((Math.random() - 0.5) * 0.1))).toFixed(2);
//     const newMarketCap = +(newPrice * asset.circulatingSupply).toFixed(2);
  
//     return {
//       ...asset,
//       price: newPrice,
//       volume24h: newVolume,
//       marketCap: newMarketCap,
//       changes: {
//         '1h': +(Math.random() * 4 - 2).toFixed(2),   // ±2%
//         '24h': +(Math.random() * 10 - 5).toFixed(2), // ±5%
//         '7d': +(Math.random() * 20 - 10).toFixed(2), // ±10%
//       },
//     };
//   };
  