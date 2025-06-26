
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TradingChart = () => {
  // Generate sample trading data
  const generateTradingData = () => {
    const data = [];
    let basePrice = 1.0856;
    
    for (let i = 0; i < 100; i++) {
      const time = new Date(Date.now() - (100 - i) * 60000).toLocaleTimeString();
      const volatility = (Math.random() - 0.5) * 0.01;
      basePrice += volatility;
      
      data.push({
        time: time,
        price: parseFloat(basePrice.toFixed(4)),
      });
    }
    
    return data;
  };

  const data = generateTradingData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-slate-300 text-sm">{`Time: ${label}`}</p>
          <p className="text-white font-semibold">
            {`Price: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            fontSize={12}
            interval="preserveStartEnd"
            tickCount={5}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
            domain={['dataMin - 0.01', 'dataMax + 0.01']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#3B82F6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TradingChart;
