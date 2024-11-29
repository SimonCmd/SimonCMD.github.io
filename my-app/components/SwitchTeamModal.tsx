interface SwitchTeamModalProps {
  show: boolean
  onSwitch: () => void
  nextTeam: string
}

export default function SwitchTeamModal({ show, onSwitch, nextTeam }: SwitchTeamModalProps) {
  if (!show) return null

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Time&apos;s Up!</h2>
          <p className="mb-6">It&apos;s {nextTeam}&apos;s turn now.</p>
          <button
              onClick={onSwitch}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Start {nextTeam}&apos;s Turn
          </button>
        </div>
      </div>
  )
}