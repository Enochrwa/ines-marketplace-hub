
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, GraduationCap, Building, MapPin, Phone, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, registerUser, clearError, setRegistrationStep } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';

interface EnhancedAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedAuthModal = ({ isOpen, onClose }: EnhancedAuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [formData, setFormData] = useState({
    // Basic info
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Role selection
    role: 'student' as 'student' | 'vendor',
    // Student fields
    university: 'INES-Ruhengeri',
    studentId: '',
    major: '',
    graduationYear: new Date().getFullYear() + 4,
    // Vendor fields
    businessName: '',
    businessType: 'individual' as 'individual' | 'company',
    businessLicense: '',
    // Contact info
    location: '',
    contactNumber: '',
    bio: '',
  });

  const dispatch = useAppDispatch();
  const { loading, error, registrationStep } = useAppSelector(state => state.auth);

  const universities = [
    'INES-Ruhengeri',
    'University of Rwanda',
    'Kigali Independent University',
    'Mount Kenya University',
    'Other'
  ];

  const majors = [
    'Computer Science',
    'Information Technology',
    'Software Engineering',
    'Business Administration',
    'Engineering',
    'Medicine',
    'Law',
    'Education',
    'Other'
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      try {
        await dispatch(loginUser({ 
          email: formData.email, 
          password: formData.password 
        })).unwrap();
        toast.success('Welcome back!');
        onClose();
        resetForm();
      } catch (error: any) {
        toast.error(error.message || 'Login failed');
      }
    } else {
      if (registrationStep === 1) {
        // Validate step 1
        if (!formData.name || !formData.email || !formData.password) {
          toast.error('Please fill all required fields');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        dispatch(setRegistrationStep(2));
      } else if (registrationStep === 2) {
        // Validate step 2 based on role
        if (formData.role === 'student' && !formData.studentId) {
          toast.error('Student ID is required');
          return;
        }
        if (formData.role === 'vendor' && !formData.businessName) {
          toast.error('Business name is required');
          return;
        }
        dispatch(setRegistrationStep(3));
      } else {
        // Final registration
        try {
          await dispatch(registerUser(formData)).unwrap();
          toast.success('Account created successfully!');
          onClose();
          resetForm();
        } catch (error: any) {
          toast.error(error.message || 'Registration failed');
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      university: 'INES-Ruhengeri',
      studentId: '',
      major: '',
      graduationYear: new Date().getFullYear() + 4,
      businessName: '',
      businessType: 'individual',
      businessLicense: '',
      location: '',
      contactNumber: '',
      bio: '',
    });
    setAvatarFile(null);
    setAvatarPreview('');
    dispatch(setRegistrationStep(1));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    dispatch(clearError());
    resetForm();
  };

  const goBack = () => {
    if (registrationStep > 1) {
      dispatch(setRegistrationStep(registrationStep - 1));
    }
  };

  if (!isOpen) return null;

  const renderStep1 = () => (
    <div className="space-y-4">
      {/* Avatar Upload */}
      <div className="flex justify-center">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarPreview} />
            <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-2xl">
              {formData.name?.charAt(0) || <Camera className="h-8 w-8" />}
            </AvatarFallback>
          </Avatar>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
            onClick={() => document.getElementById('avatar-upload')?.click()}
          >
            <Camera className="h-4 w-4" />
          </Button>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            className="pl-10"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className="pl-10"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            value={formData.password}
            onChange={handleInputChange}
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="pl-10"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      {/* Role Selection */}
      <div className="space-y-3">
        <Label>I am a:</Label>
        <RadioGroup 
          value={formData.role} 
          onValueChange={(value) => setFormData({...formData, role: value as 'student' | 'vendor'})}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-4">
            <RadioGroupItem value="student" id="student" />
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <Label htmlFor="student">Student</Label>
            </div>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4">
            <RadioGroupItem value="vendor" id="vendor" />
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <Label htmlFor="vendor">Vendor</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* University */}
      <div className="space-y-2">
        <Label htmlFor="university">University</Label>
        <Select value={formData.university} onValueChange={(value) => setFormData({...formData, university: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {universities.map(uni => (
              <SelectItem key={uni} value={uni}>{uni}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Role-specific fields */}
      {formData.role === 'student' ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              name="studentId"
              placeholder="e.g., INES2023001"
              value={formData.studentId}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="major">Major</Label>
            <Select value={formData.major} onValueChange={(value) => setFormData({...formData, major: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select your major" />
              </SelectTrigger>
              <SelectContent>
                {majors.map(major => (
                  <SelectItem key={major} value={major}>{major}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              name="businessName"
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Business Type</Label>
            <RadioGroup 
              value={formData.businessType} 
              onValueChange={(value) => setFormData({...formData, businessType: value as 'individual' | 'company'})}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual">Individual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company">Company</Label>
              </div>
            </RadioGroup>
          </div>
        </>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="location"
            name="location"
            placeholder="e.g., Musanze, Rwanda"
            value={formData.location}
            onChange={handleInputChange}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contactNumber">Contact Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="contactNumber"
            name="contactNumber"
            placeholder="+250 7XX XXX XXX"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Bio (Optional)</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Tell us about yourself..."
          value={formData.bio}
          onChange={handleInputChange}
          rows={3}
        />
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-8 w-8 rounded-full z-10"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                {isLogin ? 'Welcome back' : 
                 registrationStep === 1 ? 'Create account' :
                 registrationStep === 2 ? 'Tell us about yourself' :
                 'Contact information'}
              </CardTitle>
              <CardDescription className="text-center">
                {isLogin 
                  ? 'Sign in to your GreenLoop account' 
                  : 'Join the INES community marketplace'
                }
              </CardDescription>
              
              {!isLogin && (
                <div className="flex justify-center space-x-2 mt-4">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-2 w-8 rounded-full transition-all ${
                        step <= registrationStep 
                          ? 'bg-emerald-500' 
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {isLogin ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {registrationStep === 1 && renderStep1()}
                    {registrationStep === 2 && renderStep2()}
                    {registrationStep === 3 && renderStep3()}
                  </>
                )}

                {error && (
                  <div className="text-sm text-red-500 text-center">
                    {error}
                  </div>
                )}

                <div className="flex space-x-2">
                  {!isLogin && registrationStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={goBack}
                      className="flex-1"
                    >
                      Back
                    </Button>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                    disabled={loading}
                  >
                    {loading ? 'Please wait...' : 
                     isLogin ? 'Sign In' : 
                     registrationStep === 3 ? 'Create Account' : 'Continue'}
                  </Button>
                </div>
              </form>

              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                </span>
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold"
                  onClick={toggleMode}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </Button>
              </div>

              {isLogin && (
                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground mb-2">Demo credentials:</p>
                  <div className="text-xs font-mono bg-muted p-2 rounded space-y-1">
                    <p>Student: demo@ines.ac.rw / demo123</p>
                    <p>Vendor: vendor@example.com / demo123</p>
                    <p>Admin: admin@ines.ac.rw / demo123</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnhancedAuthModal;
