interface TabooCardProps {
  card: {
    tabooWord: string;
    forbiddenWords: string[];
  };
}

export default function TabooCard({ card }: TabooCardProps) {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">{card.tabooWord}</h2>
      <ul className="space-y-2">
        {card.forbiddenWords.map((word, index) => (
          <li key={index} className="text-lg text-gray-600 text-center">{word}</li>
        ))}
      </ul>
    </div>
  )
}

