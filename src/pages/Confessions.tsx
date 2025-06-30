
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface Confession {
  id: number;
  text: string;
  timestamp: Date;
}

const Confessions = () => {
  const navigate = useNavigate();
  const [confessions, setConfessions] = useState<Confession[]>([
    {
      id: 1,
      text: "I'm secretly in love with my best friend's sibling.",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      text: "I'm secretly in love with my best friend's sibling.",
      timestamp: new Date(Date.now() - 7200000)
    }
  ]);
  const [newConfession, setNewConfession] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmitConfession = () => {
    if (newConfession.trim()) {
      const confession: Confession = {
        id: Date.now(),
        text: newConfession,
        timestamp: new Date()
      };
      setConfessions(prev => [confession, ...prev]);
      setNewConfession('');
      setIsDialogOpen(false);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm p-4 flex items-center space-x-4 border-b border-red-500/20">
        <button
          onClick={() => navigate('/chat')}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-6 h-6 text-red-400" />
          <h1 className="text-xl font-semibold text-white">Confessions</h1>
        </div>
      </div>

      {/* Confessions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {confessions.map((confession) => (
          <div
            key={confession.id}
            className="bg-gradient-to-r from-red-800/40 to-red-900/40 backdrop-blur-sm p-6 rounded-2xl border border-red-600/20 shadow-lg"
          >
            <p className="text-white text-lg leading-relaxed mb-3">
              {confession.text}
            </p>
            <p className="text-red-300 text-sm">
              {formatTimeAgo(confession.timestamp)}
            </p>
          </div>
        ))}
      </div>

      {/* Write Confession Button */}
      <div className="p-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-lg font-semibold py-6 rounded-2xl shadow-lg transition-all duration-200">
              <Edit3 className="w-5 h-5 mr-2" />
              Write Your Confession
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                Share Your Secret
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={newConfession}
                onChange={(e) => setNewConfession(e.target.value)}
                placeholder="Write your anonymous confession here..."
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-32 resize-none"
              />
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitConfession}
                  className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600"
                >
                  Submit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Confessions;
