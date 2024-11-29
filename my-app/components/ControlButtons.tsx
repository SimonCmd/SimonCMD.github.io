interface ControlButtonsProps {
  onPass: () => void
  onWrong: () => void
  onCorrect: () => void
  isPlaying: boolean
}

export default function ControlButtons({ onPass, onWrong, onCorrect, isPlaying }: ControlButtonsProps) {
  return (
    <div className="mt-8 flex justify-center space-x-4">
      <button
        onClick={onPass}
        disabled={!isPlaying}
        className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50"
      >
        Pass
      </button>
      <button
        onClick={onWrong}
        disabled={!isPlaying}
        className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
      >
        Wrong
      </button>
      <button
        onClick={onCorrect}
        disabled={!isPlaying}
        className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
      >
        Correct
      </button>
    </div>
  )
}

