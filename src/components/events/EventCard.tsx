
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Ticket, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Event } from '@/store/slices/eventsSlice';
import toast from 'react-hot-toast';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getOrganizerTypeColor = (type: string) => {
    switch (type) {
      case 'club': return 'bg-blue-100 text-blue-800';
      case 'department': return 'bg-green-100 text-green-800';
      case 'student': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRegister = () => {
    toast.success('Registration successful! Check your email for details.');
  };

  const spotsLeft = event.ticketInfo.capacity - event.ticketInfo.registered;
  const isFull = spotsLeft <= 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-blue-500/10">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <img 
              src={event.coverImage} 
              alt={event.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <Badge className="bg-white/90 text-gray-800 text-xs">
                {event.category}
              </Badge>
              <Badge className={`text-xs ${getOrganizerTypeColor(event.organizer.type)}`}>
                {event.organizer.type}
              </Badge>
            </div>

            <div className="absolute top-3 right-3">
              {event.ticketInfo.type === 'free' ? (
                <Badge className="bg-green-500 text-white text-xs">
                  FREE
                </Badge>
              ) : (
                <Badge className="bg-blue-500 text-white text-xs">
                  ${event.ticketInfo.price}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3">
            {event.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          {/* Event details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              <span>{formatDate(event.date)} at {event.time}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-2 text-red-500" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Users className="w-4 h-4 mr-2 text-green-500" />
              <span>{event.ticketInfo.registered}/{event.ticketInfo.capacity} registered</span>
              {spotsLeft <= 10 && spotsLeft > 0 && (
                <Badge variant="outline" className="ml-2 text-xs text-orange-600">
                  {spotsLeft} spots left
                </Badge>
              )}
            </div>
          </div>

          {/* Organizer info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={event.organizer.avatar} />
                <AvatarFallback className="text-xs">
                  {event.organizer.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {event.organizer.name}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {event.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex gap-2 w-full">
            <Button 
              className={`flex-1 ${isFull 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
              } text-white`}
              onClick={handleRegister}
              disabled={isFull}
            >
              <Ticket className="w-4 h-4 mr-2" />
              {isFull ? 'Event Full' : 'Register'}
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
              View Details
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EventCard;
