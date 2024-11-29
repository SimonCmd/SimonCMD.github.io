import { useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Play, Pause, RotateCcw } from 'lucide-react'

interface TimerProps {
  timeLeft: number
  // Change the type to accept a function that returns a number
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  onTimeUp: () => void
}

export default function Timer({ timeLeft, setTimeLeft, isPlaying, setIsPlaying, onTimeUp }: TimerProps) {
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            if (interval) clearInterval(interval);
            setIsPlaying(false);
            onTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, timeLeft, setTimeLeft, setIsPlaying, onTimeUp]);

  const toggleTimer = () => {
    setIsPlaying(!isPlaying)
  }

  const resetTimer = () => {
    setTimeLeft(60)
    setIsPlaying(false)
  }

  return (
      <div className="w-48 flex flex-col items-center">
        <div className="w-32 h-32 relative mb-4">
          <CircularProgressbar
              value={timeLeft}
              maxValue={60}
              styles={buildStyles({
                pathColor: `rgba(62, 152, 199, ${timeLeft / 60})`,
                trailColor: '#d6d6d6',
              })}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">{timeLeft}</span>
            <span className="text-xl font-semibold text-gray-600 ml-1">s</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
              onClick={toggleTimer}
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
              aria-label={isPlaying ? "Pause timer" : "Start timer"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
              onClick={resetTimer}
              className="bg-gray-300 text-gray-700 p-3 rounded-full hover:bg-gray-400 transition-colors"
              aria-label="Reset timer"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
  )
}