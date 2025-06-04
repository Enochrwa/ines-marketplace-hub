
import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Users, Star, CreditCard, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Event } from '@/store/slices/eventsSlice';
import toast from 'react-hot-toast';

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

const EventRegistrationModal = ({ isOpen, onClose, event }: EventRegistrationModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    ticketQuantity: 1,
    specialRequests: '',
    agreeToTerms: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Registration successful! Check your email for confirmation.');
    setIsSubmitting(false);
    onClose();
  };

  const canProceedToNext = () => {
    if (currentStep === 1) {
      return formData.fullName && formData.email && formData.studentId;
    }
    if (currentStep === 2) {
      return formData.ticketQuantity > 0 && formData.ticketQuantity <= event.ticketInfo.maxPerUser;
    }
    return formData.agreeToTerms;
  };

  const totalPrice = event.ticketInfo.type === 'paid' ? 
    (event.ticketInfo.price || 0) * formData.ticketQuantity : 0;

  const availableTickets = event.ticketInfo.capacity - event.ticketInfo.registered;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-500 text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">Event Registration</CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-sm opacity-90">
              <span>Step {currentStep} of 3</span>
              <div className="flex-1 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Event Summary */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-start space-x-4">
                <img 
                  src={event.coverImage} 
                  alt={event.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {availableTickets} spots left
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Student ID</label>
                      <input
                        type="text"
                        placeholder="20230001"
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input
                        type="email"
                        placeholder="john.doe@ines.ac.rw"
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone (Optional)</label>
                      <input
                        type="tel"
                        placeholder="+250 XXX XXX XXX"
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Ticket Selection */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Ticket Selection</h3>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">
                          {event.ticketInfo.type === 'free' ? 'Free Admission' : 'General Admission'}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {event.ticketInfo.type === 'free' ? 
                            'No payment required' : 
                            `$${event.ticketInfo.price} per ticket`
                          }
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {availableTickets} available
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium">Quantity:</label>
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setFormData({ 
                            ...formData, 
                            ticketQuantity: Math.max(1, formData.ticketQuantity - 1) 
                          })}
                        >
                          -
                        </Button>
                        <span className="w-12 text-center font-semibold">{formData.ticketQuantity}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setFormData({ 
                            ...formData, 
                            ticketQuantity: Math.min(event.ticketInfo.maxPerUser, formData.ticketQuantity + 1) 
                          })}
                        >
                          +
                        </Button>
                      </div>
                      <span className="text-sm text-gray-600">
                        (Max {event.ticketInfo.maxPerUser} per person)
                      </span>
                    </div>
                  </div>

                  {event.ticketInfo.type === 'paid' && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total:</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Review & Confirm</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Name:</span>
                        <div className="font-semibold">{formData.fullName}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Email:</span>
                        <div className="font-semibold">{formData.email}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Student ID:</span>
                        <div className="font-semibold">{formData.studentId}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Tickets:</span>
                        <div className="font-semibold">{formData.ticketQuantity}</div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        placeholder="Any dietary restrictions, accessibility needs, etc."
                        rows={3}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.agreeToTerms}
                        onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                        className="mt-1"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                        I agree to the event terms and conditions and understand the cancellation policy.
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => currentStep === 1 ? onClose() : setCurrentStep(currentStep - 1)}
                >
                  {currentStep === 1 ? 'Cancel' : 'Back'}
                </Button>
                
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceedToNext()}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!formData.agreeToTerms || isSubmitting}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Registering...
                      </div>
                    ) : (
                      <>
                        <Ticket className="w-4 h-4 mr-2" />
                        {event.ticketInfo.type === 'paid' ? `Pay $${totalPrice}` : 'Register'}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EventRegistrationModal;
