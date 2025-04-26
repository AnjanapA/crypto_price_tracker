import React, { useEffect, useState } from 'react';
import { fetchCryptoData } from './utils/fetchData';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import './App.css';


const App = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoData();
      setAssets(data);
      setLoading(false);
    };

    getData();
    const interval = setInterval(getData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">1h %</th>
              <th className="p-2 border">24h %</th>
              <th className="p-2 border">7d %</th>
              <th className="p-2 border">Market Cap</th>
              <th className="p-2 border">Volume (24h)</th>
              <th className="p-2 border">Circulating Supply</th>
              <th className="p-2 border">7d Chart</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={asset.id} className="text-center">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border"><img src={asset.logo} alt={asset.name}  width="20" /> {asset.symbol}</td>
                <td className="p-2 border">${asset.price}</td>
                <td className="p-2 border" style={{ color: asset.changes['1h'] > 0 ? 'green' : 'red' }}>
                  {asset.changes['1h']}%
                </td>
                <td className="p-2 border" style={{ color: asset.changes['24h'] > 0 ? 'green' : 'red' }}>
                  {asset.changes['24h']}%
                </td>
                <td className="p-2 border" style={{ color: asset.changes['7d'] > 0 ? 'green' : 'red' }}>
                  {asset.changes['7d']}%
                </td>
                <td className="p-2 border">${asset.marketCap}</td>
                <td className="p-2 border">${asset.volume24h}</td>
                <td className="p-2 border">{asset.circulatingSupply} {asset.symbol}</td>
                <td className="p-2 border">
                <td style={{ width: 100, height: 50 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={asset.sparkline}>
                    <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                </td>                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
