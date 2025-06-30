
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const handleEnterAnonymously = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-emerald-500/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-teal-500/5 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="text-center space-y-8 z-10 max-w-md">
        {/* App Icon */}
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
          <MessageCircle className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Hello Anonymous
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Chat & Confess Anonymously. Real-time. No signups.
          </p>
        </div>

        {/* Enter Button */}
        <button
          onClick={handleEnterAnonymously}
          className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-lg font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:from-green-500 hover:to-emerald-600"
        >
          Enter Anonymously
        </button>
      </div>
    </div>
  );
};

export default Landing;
