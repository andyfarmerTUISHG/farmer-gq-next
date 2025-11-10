type QuoteCardProps = {
  quote: string;
  context?: string;
};

export default function QuoteCard({ quote, context }: QuoteCardProps) {
  return (
    <div className="rounded-lg border-l-4 border-purple-500 bg-gray-50 p-4 shadow-sm">
      <blockquote className="mb-2 text-gray-800">
        <span className="text-2xl text-purple-500">"</span>
        <span className="italic">{quote}</span>
        <span className="text-2xl text-purple-500">"</span>
      </blockquote>
      {context && (
        <p className="text-sm text-gray-600">{context}</p>
      )}
    </div>
  );
}
