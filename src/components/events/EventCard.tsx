
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Star, Eye, Share2, ExternalLink, Ticket } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Event } from '@/store/slices/eventsSlice';
import EventRegistrationModal from './EventRegistrationModal';
import EventDetailsModal from './EventDetailsModal';
import toast from 'react-hot-toast';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'Career': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Academic': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'Social': 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
      'Sports': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'upcoming': 'bg-green-500 text-white',
      'ongoing': 'bg-blue-500 text-white',
      'completed': 'bg-gray-500 text-white',
      'cancelled': 'bg-red-500 text-white',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500 text-white';
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const availableTickets = event.ticketInfo.capacity - event.ticketInfo.registered;
  const isFullyBooked = availableTickets <= 0;
  const isEventPast = new Date(event.date) < new Date();

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
          <CardHeader className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <img 
                src={event.coverImage} 
                alt={event.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay with quick actions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-white/90 text-gray-800 text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      {event.ticketInfo.registered}/{event.ticketInfo.capacity}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Top badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <Badge className={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
                <Badge className={getCategoryColor(event.category)}>
                  {event.category}
                </Badge>
                {event.ticketInfo.type === 'free' && (
                  <Badge className="bg-emerald-500 text-white">
                    FREE
                  </Badge>
                )}
              </div>

              {/* Action buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleShare}
                  className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-gray-700 backdrop-blur-sm"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1 pr-2">
                {event.title}
              </h3>
              <div className="text-right">
                {event.ticketInfo.type === 'paid' && (
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${event.ticketInfo.price}
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {event.description}
            </p>

            {/* Event details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Organizer info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={event.organizer.avatar} />
                  <AvatarFallback className="text-xs">
                    {event.organizer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {event.organizer.name}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {event.organizer.type}
                  </Badge>
                </div>
              </div>
              
              <Badge variant="outline" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                {availableTickets} left
              </Badge>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {event.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {event.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{event.tags.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <div className="flex gap-2 w-full">
              <Button 
                variant="outline" 
                size="sm" 
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDetailsModalOpen(true);
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Details
              </Button>
              
              <Button 
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isEventPast) {
                    toast.error('This event has already passed');
                  } else if (isFullyBooked) {
                    toast.error('This event is fully booked');
                  } else {
                    setIsRegistrationModalOpen(true);
                  }
                }}
                disabled={isEventPast || isFullyBooked}
              >
                <Ticket className="w-4 h-4 mr-2" />
                {isEventPast ? 'Past Event' : isFullyBooked ? 'Sold Out' : 'Register'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <EventRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        event={event}
      />

      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        event={event}
      />
    </>
  );
};

export default EventCard;
