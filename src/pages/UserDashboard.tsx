
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Clock, 
  User,
  LogOut,
  Settings,
  Wallet,
  History,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TradingChart from "@/components/TradingChart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [balance] = useState(10000);
  const [tradeAmount, setTradeAmount] = useState('100');
  const [selectedAsset, setSelectedAsset] = useState('EUR/USD');

  const assets = [
    { name: 'EUR/USD', price: '1.0856', change: '+0.23%', trend: 'up' },
    { name: 'GBP/USD', price: '1.2743', change: '-0.15%', trend: 'down' },
    { name: 'USD/JPY', price: '149.82', change: '+0.45%', trend: 'up' },
    { name: 'BTC/USD', price: '43,250', change: '+2.1%', trend: 'up' },
    { name: 'ETH/USD', price: '2,685', change: '-1.2%', trend: 'down' },
    { name: 'Gold', price: '2,025', change: '+0.8%', trend: 'up' },
  ];

  const recentTrades = [
    { asset: 'EUR/USD', type: 'CALL', amount: 250, profit: '+$47.50', time: '2 min ago', status: 'win' },
    { asset: 'BTC/USD', type: 'PUT', amount: 500, profit: '-$500.00', time: '5 min ago', status: 'loss' },
    { asset: 'Gold', type: 'CALL', amount: 150, profit: '+$28.50', time: '8 min ago', status: 'win' },
    { asset: 'USD/JPY', type: 'CALL', amount: 300, profit: '+$57.00', time: '12 min ago', status: 'win' },
  ];

  const handleTrade = (direction: 'call' | 'put') => {
    const amount = parseFloat(tradeAmount);
    if (amount <= 0 || amount > balance) {
      toast.error('Invalid trade amount');
      return;
    }
    
    toast.success(`${direction.toUpperCase()} trade placed for ${selectedAsset}`);
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TradePro</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <Wallet className="w-4 h-4" />
              <span className="font-semibold">${balance.toLocaleString()}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                JD
              </AvatarFallback>
            </Avatar>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-300 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trading Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Chart */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{selectedAsset}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-white">1.0856</span>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                        +0.23%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <TradingChart />
                </CardContent>
              </Card>

              {/* Trade Execution */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Place Trade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Asset</Label>
                      <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {assets.map((asset) => (
                            <SelectItem key={asset.name} value={asset.name} className="text-white">
                              {asset.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Amount</Label>
                      <Input
                        type="number"
                        value={tradeAmount}
                        onChange={(e) => setTradeAmount(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleTrade('call')}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      CALL (UP)
                    </Button>
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleTrade('put')}
                    >
                      <TrendingDown className="w-4 h-4 mr-2" />
                      PUT (DOWN)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Summary */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Account Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Balance:</span>
                    <span className="text-white font-semibold">${balance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Today's P&L:</span>
                    <span className="text-green-400 font-semibold">+$247.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Win Rate:</span>
                    <span className="text-white font-semibold">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Active Trades:</span>
                    <span className="text-white font-semibold">2</span>
                  </div>
                </CardContent>
              </Card>

              {/* Assets */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Popular Assets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {assets.slice(0, 4).map((asset) => (
                    <div 
                      key={asset.name} 
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 cursor-pointer transition-colors"
                      onClick={() => setSelectedAsset(asset.name)}
                    >
                      <div>
                        <div className="text-white font-medium">{asset.name}</div>
                        <div className="text-slate-400 text-sm">{asset.price}</div>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={asset.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                      >
                        {asset.change}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Trades */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <History className="w-5 h-5 mr-2" />
                    Recent Trades
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentTrades.map((trade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                      <div>
                        <div className="text-white text-sm font-medium">{trade.asset}</div>
                        <div className="text-slate-400 text-xs">{trade.type} • ${trade.amount}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${trade.status === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                          {trade.profit}
                        </div>
                        <div className="text-slate-400 text-xs">{trade.time}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
