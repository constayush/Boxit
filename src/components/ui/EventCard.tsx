import React from 'react';

// Type definitions
type Broadcaster = {
  [country: string]: string;
};

type Event = {
  title: string;
  slug?: string;
  date: string;
  location: string;
  broadcasters: Broadcaster[];
  co_promotion?: string[];
  promotion?: string;
  id: string;
  poster_image_url: string | null;
};

type BoxingEventsProps = {
  events: Event[];
};

const BoxingEvents: React.FC<BoxingEventsProps> = ({ events }) => {
  if (!events.length) {
    return <div className="text-center p-4">No upcoming events found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Upcoming Boxing Events 🥊</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {event.poster_image_url ? (
              <img
                src={event.poster_image_url}
                alt={event.title}
                className="w-full h-60 object-cover"
              />
            ) : (
              <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500">
                No Poster
              </div>
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600 mt-1">📍 {event.location}</p>
              <p className="text-sm text-gray-600 mt-1">📅 {new Date(event.date).toLocaleDateString()}</p>
              {event.broadcasters.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  📺{' '}
                  {Object.entries(event.broadcasters[0])
                    .map(([country, network]) => `${country}: ${network}`)
                    .join(', ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxingEvents;
