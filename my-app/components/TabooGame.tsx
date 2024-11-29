'use client'

import { useState, useCallback } from 'react'
import Timer from './Timer'
import TeamInfo from './TeamInfo'
import TabooCard from './TabooCard'
import ControlButtons from './ControlButtons'
import SwitchTeamModal from './SwitchTeamModal'

const INITIAL_TIME = 60

// Sample card data (in a real app, this would come from an API or database)
const sampleCards = [
  { tabooWord: "Apple", forbiddenWords: ["Fruit", "Red", "Tree", "Pie", "iPhone"] },
  { tabooWord: "Beach", forbiddenWords: ["Sand", "Ocean", "Sun", "Waves", "Vacation"] },
  { tabooWord: "Coffee", forbiddenWords: ["Drink", "Caffeine", "Bean", "Morning", "Cup"] },
  { tabooWord: "Dog", forbiddenWords: ["Pet", "Animal", "Bark", "Leash", "Puppy"] },
  { tabooWord: "Movie", forbiddenWords: ["Film", "Cinema", "Actor", "Screen", "Popcorn"] },
]

export default function TabooGame() {
  const [currentTeam, setCurrentTeam] = useState<string>('Team A')

  // Use a more flexible type for scores
  const [scores, setScores] = useState<Record<string, number>>({ 'Team A': 0, 'Team B': 0 })

  const [passCount, setPassCount] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSwitchModal, setShowSwitchModal] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  const handleTimeUp = useCallback(() => {
    setShowSwitchModal(true)
    setIsPlaying(false)
  }, [])

  const switchTeam = useCallback(() => {
    setCurrentTeam(prevTeam => prevTeam === 'Team A' ? 'Team B' : 'Team A')
    setPassCount(0)
    setWrongCount(0)
    setTimeLeft(INITIAL_TIME)
    setShowSwitchModal(false)
    setIsPlaying(true)
  }, [])

  const nextCard = useCallback(() => {
    setCurrentCardIndex(prevIndex => (prevIndex + 1) % sampleCards.length)
  }, [])

  const handlePass = useCallback(() => {
    setPassCount(prevCount => prevCount + 1)
    nextCard()
  }, [nextCard])

  const handleWrong = useCallback(() => {
    setWrongCount(prevCount => prevCount + 1)
    nextCard()
  }, [nextCard])

  const handleCorrect = useCallback(() => {
    setScores(prevScores => ({
      ...prevScores,
      [currentTeam]: (prevScores[currentTeam] || 0) + 1
    }))
    nextCard()
  }, [currentTeam, nextCard])

  return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <TeamInfo
            currentTeam={currentTeam}
            scores={scores}
            passCount={passCount}
            wrongCount={wrongCount}
        />
        <div className="mt-6 flex justify-center">
          <Timer
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              onTimeUp={handleTimeUp}
          />
        </div>
        <TabooCard card={sampleCards[currentCardIndex]} />
        <ControlButtons
            onPass={handlePass}
            onWrong={handleWrong}
            onCorrect={handleCorrect}
            isPlaying={isPlaying}
        />
        <SwitchTeamModal
            show={showSwitchModal}
            onSwitch={switchTeam}
            nextTeam={currentTeam === 'Team A' ? 'Team B' : 'Team A'}
        />
      </div>
  )
}