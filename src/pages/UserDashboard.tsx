
import { useState, useEffect } from "react";
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
  Bell,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TradingChart from "@/components/TradingChart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(10000);
  const [tradeAmount, setTradeAmount] = useState('100');
  const [selectedAsset, setSelectedAsset] = useState('EUR/USD');
  const [countdown, setCountdown] = useState(0);
  const [isTrading, setIsTrading] = useState(false);
  const [winRate, setWinRate] = useState(78);
  const [todaysPnL, setTodaysPnL] = useState(247.50);

  // Trading countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isTrading) {
      setIsTrading(false);
      // Simulate trade result
      const isWin = Math.random() > 0.3;
      const amount = parseFloat(tradeAmount);
      const payout = isWin ? amount * 0.8 : -amount;
      setBalance(prev => prev + payout);
      setTodaysPnL(prev => prev + payout);
      
      toast.success(
        isWin ? `Trade Won! +$${payout.toFixed(2)}` : `Trade Lost! -$${Math.abs(payout).toFixed(2)}`,
        {
          description: `${selectedAsset} trade completed`,
        }
      );
    }
    return () => clearInterval(interval);
  }, [countdown, isTrading, tradeAmount, selectedAsset]);

  const assets = [
    { name: 'EUR/USD', price: '1.0856', change: '+0.23%', trend: 'up', payout: '85%' },
    { name: 'GBP/USD', price: '1.2743', change: '-0.15%', trend: 'down', payout: '82%' },
    { name: 'USD/JPY', price: '149.82', change: '+0.45%', trend: 'up', payout: '88%' },
    { name: 'BTC/USD', price: '43,250', change: '+2.1%', trend: 'up', payout: '80%' },
    { name: 'ETH/USD', price: '2,685', change: '-1.2%', trend: 'down', payout: '83%' },
    { name: 'Gold', price: '2,025', change: '+0.8%', trend: 'up', payout: '85%' },
  ];

  const recentTrades = [
    { asset: 'EUR/USD', type: 'HIGHER', amount: 250, profit: '+$200.00', time: '2 min ago', status: 'win', payout: '80%' },
    { asset: 'BTC/USD', type: 'LOWER', amount: 500, profit: '-$500.00', time: '5 min ago', status: 'loss', payout: '85%' },
    { asset: 'Gold', type: 'HIGHER', amount: 150, profit: '+$127.50', time: '8 min ago', status: 'win', payout: '85%' },
    { asset: 'USD/JPY', type: 'HIGHER', amount: 300, profit: '+$246.00', time: '12 min ago', status: 'win', payout: '82%' },
  ];

  const handleTrade = (direction: 'higher' | 'lower') => {
    const amount = parseFloat(tradeAmount);
    if (amount <= 0 || amount > balance) {
      toast.error('Invalid trade amount');
      return;
    }
    
    if (isTrading) {
      toast.error('Please wait for current trade to finish');
      return;
    }
    
    setIsTrading(true);
    setCountdown(60); // 1 minute trade
    setBalance(prev => prev - amount);
    
    toast.success(`${direction.toUpperCase()} trade placed for ${selectedAsset}`, {
      description: `Amount: $${amount} • Duration: 1 minute`,
    });
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TradePro</span>
            <div className="hidden md:flex items-center space-x-4 ml-8">
              <span className="text-sm text-slate-400">Live Trading</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white bg-slate-800 px-4 py-2 rounded-lg">
              <Wallet className="w-4 h-4" />
              <span className="font-bold text-lg">${balance.toLocaleString()}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-9 h-9">
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
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
            {/* Chart Section */}
            <div className="xl:col-span-3 space-y-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <CardTitle className="text-white text-xl">{selectedAsset}</CardTitle>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-sm">
                        Payout: {assets.find(a => a.name === selectedAsset)?.payout}
                      </Badge>
                    </div>
                    {isTrading && (
                      <div className="flex items-center space-x-2 bg-blue-600/20 px-3 py-1 rounded-lg">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 font-mono text-lg">{formatTime(countdown)}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <TradingChart />
                </CardContent>
              </Card>

              {/* Trade Execution Panel */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center">
                    <Play className="w-5 h-5 mr-2" />
                    Binary Options Trading
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300 text-sm font-medium">Asset</Label>
                      <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {assets.map((asset) => (
                            <SelectItem key={asset.name} value={asset.name} className="text-white">
                              <div className="flex items-center justify-between w-full">
                                <span>{asset.name}</span>
                                <span className="text-green-400 ml-4">{asset.payout}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300 text-sm font-medium">Investment Amount</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={tradeAmount}
                          onChange={(e) => setTradeAmount(e.target.value)}
                          className="bg-slate-800 border-slate-700 text-white h-12 pl-8"
                          placeholder="Enter amount"
                        />
                        <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300 text-sm font-medium">Potential Profit</Label>
                      <div className="bg-slate-800 border border-slate-700 rounded-md h-12 flex items-center px-3">
                        <span className="text-green-400 font-bold">
                          +${(parseFloat(tradeAmount || '0') * 0.8).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white h-14 text-lg font-semibold"
                      onClick={() => handleTrade('higher')}
                      disabled={isTrading}
                    >
                      <TrendingUp className="w-5 h-5 mr-2" />
                      HIGHER
                    </Button>
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white h-14 text-lg font-semibold"
                      onClick={() => handleTrade('lower')}
                      disabled={isTrading}
                    >
                      <TrendingDown className="w-5 h-5 mr-2" />
                      LOWER
                    </Button>
                  </div>
                  
                  {isTrading && (
                    <div className="mt-4 p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400">Active Trade: {selectedAsset}</span>
                        <span className="text-white font-mono text-lg">{formatTime(countdown)}</span>
                      </div>
                      <div className="mt-2 bg-slate-800 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${((60 - countdown) / 60) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Account Summary */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center text-lg">
                    <User className="w-5 h-5 mr-2" />
                    Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Balance:</span>
                    <span className="text-white font-bold text-lg">${balance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Today's P&L:</span>
                    <span className={`font-bold ${todaysPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {todaysPnL >= 0 ? '+' : ''}${todaysPnL.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Win Rate:</span>
                    <span className="text-white font-bold">{winRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Active Trades:</span>
                    <span className="text-white font-bold">{isTrading ? '1' : '0'}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Assets */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center text-lg">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Assets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {assets.slice(0, 5).map((asset) => (
                    <div 
                      key={asset.name} 
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                        selectedAsset === asset.name 
                          ? 'bg-blue-600/20 border border-blue-600/30' 
                          : 'bg-slate-800/50 hover:bg-slate-800'
                      }`}
                      onClick={() => setSelectedAsset(asset.name)}
                    >
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">{asset.name}</div>
                        <div className="text-slate-400 text-xs">{asset.price}</div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${asset.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                        >
                          {asset.change}
                        </Badge>
                        <div className="text-xs text-slate-400 mt-1">{asset.payout}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Trades */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center text-lg">
                    <History className="w-5 h-5 mr-2" />
                    Recent Trades
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {recentTrades.map((trade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{trade.asset}</div>
                        <div className="text-slate-400 text-xs">{trade.type} • ${trade.amount}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${trade.status === 'win' ? 'text-green-400' : 'text-red-400'}`}>
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
