interface TeamInfoProps {
  currentTeam: string
  scores: { [key: string]: number }
  passCount: number
  wrongCount: number
}

export default function TeamInfo({ currentTeam, scores, passCount, wrongCount }: TeamInfoProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="text-2xl font-bold">{currentTeam}</div>
      <div className="flex space-x-4">
        <div>
          Team A: <span className="font-bold">{scores['Team A']}</span>
        </div>
        <div>
          Team B: <span className="font-bold">{scores['Team B']}</span>
        </div>
        <div>
          Pass: <span className="font-bold text-yellow-500">{passCount}</span>
        </div>
        <div>
          Wrong: <span className="font-bold text-red-500">{wrongCount}</span>
        </div>
      </div>
    </div>
  )
}

