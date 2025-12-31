'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Event = {
  _id: string
  name: string
  slug: { current: string }
  date: string
  eventType?: string
  imageUrl: string
}

export default function EventsSearch({ events }: { events: Event[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  // Get unique event types
  const eventTypes = useMemo(() => {
    const types = events
      .map(event => event.eventType)
      .filter((type): type is string => !!type)
    return ['all', ...Array.from(new Set(types))]
  }, [events])

  // Filter events based on search and type
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      
      const matchesType = selectedType === 'all' || event.eventType === selectedType
      
      return matchesSearch && matchesType
    })
  }, [events, searchQuery, selectedType])

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="space-y-4">
        {/* Search Input */}
        <div>
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Event Type Filter */}
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                selectedType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {type === 'all' ? 'All Events' : type.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredEvents.length} of {events.length} events
        </p>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <li key={event._id} className="group">
              <Link href={`/events/${event.slug.current}`}>
                <div className="space-y-3">
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={event.imageUrl}
                      alt={event.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div>
                    {event.eventType && (
                      <span className="inline-block text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mb-2 capitalize">
                        {event.eventType.replace('-', ' ')}
                      </span>
                    )}
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {event.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No events found matching your search.
          </p>
        </div>
      )}
    </div>
  )
}