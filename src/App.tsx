import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

interface LapTime {
  id: number;
  time: number;
  lapDuration: number;
}

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<LapTime[]>([]);
  const intervalRef = useRef<number | null>(null);
  const lastLapTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      milliseconds: ms.toString().padStart(2, '0'),
    };
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    lastLapTimeRef.current = 0;
  };

  const handleLap = () => {
    if (time > 0) {
      const lapDuration = time - lastLapTimeRef.current;
      setLaps((prevLaps) => [
        {
          id: prevLaps.length + 1,
          time: time,
          lapDuration: lapDuration,
        },
        ...prevLaps,
      ]);
      lastLapTimeRef.current = time;
    }
  };

  const displayTime = formatTime(time);
  const fastestLap = laps.length > 0 ? Math.min(...laps.map(lap => lap.lapDuration)) : 0;
  const slowestLap = laps.length > 0 ? Math.max(...laps.map(lap => lap.lapDuration)) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">Stopwatch</h1>

          <div className="bg-slate-900/50 rounded-2xl p-8 mb-8 border border-slate-700/30">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-6xl font-mono font-bold text-white mb-2">
                <span className="w-20 text-right">{displayTime.hours}</span>
                <span className="text-slate-500">:</span>
                <span className="w-20">{displayTime.minutes}</span>
                <span className="text-slate-500">:</span>
                <span className="w-20">{displayTime.seconds}</span>
              </div>
              <div className="text-3xl font-mono font-semibold text-blue-400">
                .{displayTime.milliseconds}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={handleStartPause}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
                isRunning
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start
                </>
              )}
            </button>

            <button
              onClick={handleLap}
              disabled={time === 0}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              <Flag className="w-5 h-5" />
              Lap
            </button>

            <button
              onClick={handleReset}
              disabled={time === 0 && laps.length === 0}
              className="px-6 py-4 rounded-xl font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-all transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {laps.length > 0 && (
            <div className="bg-slate-900/30 rounded-2xl p-4 border border-slate-700/30">
              <h2 className="text-lg font-semibold text-white mb-3 px-2">Lap Times</h2>
              <div className="max-h-64 overflow-y-auto space-y-2 custom-scrollbar">
                {laps.map((lap) => {
                  const lapTime = formatTime(lap.lapDuration);
                  const isGreatest = lap.lapDuration === slowestLap && laps.length > 1;
                  const isLeast = lap.lapDuration === fastestLap && laps.length > 1;

                  return (
                    <div
                      key={lap.id}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        isGreatest
                          ? 'bg-red-500/20 border border-red-500/30'
                          : isLeast
                          ? 'bg-emerald-500/20 border border-emerald-500/30'
                          : 'bg-slate-800/50 border border-slate-700/30'
                      }`}
                    >
                      <span className="font-semibold text-slate-400 min-w-[60px]">
                        Lap {lap.id}
                      </span>
                      <span className={`font-mono font-semibold ${
                        isGreatest ? 'text-red-400' : isLeast ? 'text-emerald-400' : 'text-white'
                      }`}>
                        {lapTime.hours !== '00' && `${lapTime.hours}:`}
                        {lapTime.minutes}:{lapTime.seconds}.{lapTime.milliseconds}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
