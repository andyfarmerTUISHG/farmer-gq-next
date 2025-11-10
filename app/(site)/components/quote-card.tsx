type QuoteCardProps = {
  quote: {
    _id: string;
    quoteText?: string;
    context?: string;
  };
  className?: string;
};

export default function QuoteCard({ quote, className = "" }: QuoteCardProps) {
  if (!quote.quoteText)
    return null;

  return (
    <div
      className={`relative rounded-lg border-l-4 border-blue-500 bg-gray-50 p-6 shadow-sm ${className}`}
    >
      {/* Opening quote mark */}
      <div className="absolute top-4 left-4 text-6xl text-blue-200 leading-none select-none" aria-hidden="true">
        &ldquo;
      </div>

      {/* Quote text */}
      <blockquote className="relative z-10 pl-8">
        <p className="font-body text-lg italic text-gray-800 leading-relaxed">
          {quote.quoteText}
        </p>
      </blockquote>

      {/* Context/Commentary */}
      {quote.context && (
        <div className="mt-4 pl-8 border-t border-gray-200 pt-4">
          <p className="font-body text-sm text-gray-600">
            {quote.context}
          </p>
        </div>
      )}

      {/* Closing quote mark */}
      <div className="absolute bottom-4 right-4 text-6xl text-blue-200 leading-none select-none" aria-hidden="true">
        &rdquo;
      </div>
    </div>
  );
}
