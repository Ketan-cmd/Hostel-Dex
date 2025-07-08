import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Upload, X, AlertCircle } from 'lucide-react';

const TicketForm: React.FC = () => {
  const { user } = useAuth();
  const { addTicket, addNotification } = useApp();
  const [formData, setFormData] = useState({
    issueType: 'electricity' as const,
    title: '',
    description: '',
    priority: 'medium' as const,
    roomNumber: user?.roomNumber || '',
    blockNumber: user?.blockNumber || '',
    contactNumber: user?.contactNumber || '',
  });
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const issueTypes = [
    { value: 'electricity', label: 'Electricity' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'water-cooler', label: 'Water Cooler' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'wifi', label: 'Wi-Fi' },
    { value: 'other', label: 'Other' },
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.roomNumber.trim()) newErrors.roomNumber = 'Room number is required';
    if (!formData.blockNumber.trim()) newErrors.blockNumber = 'Block number is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB limit
      return isValidType && isValidSize;
    });
    
    setMediaFiles(prev => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
  };

  const removeFile = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create ticket
      addTicket({
        studentId: user!.id,
        studentName: user!.name,
        studentEmail: user!.email,
        roomNumber: formData.roomNumber,
        blockNumber: formData.blockNumber,
        contactNumber: formData.contactNumber,
        issueType: formData.issueType,
        title: formData.title,
        description: formData.description,
        status: 'open',
        priority: formData.priority,
        mediaFiles: mediaFiles.map((file, index) => ({
          id: `${Date.now()}-${index}`,
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type.startsWith('image/') ? 'image' : 'video',
          size: file.size,
        })),
      });
      
      // Add notification
      addNotification({
        userId: user!.id,
        title: 'Ticket Submitted',
        message: `Your ticket "${formData.title}" has been submitted successfully.`,
        type: 'success',
        read: false,
      });
      
      // Reset form
      setFormData({
        issueType: 'electricity',
        title: '',
        description: '',
        priority: 'medium',
        roomNumber: user?.roomNumber || '',
        blockNumber: user?.blockNumber || '',
        contactNumber: user?.contactNumber || '',
      });
      setMediaFiles([]);
      
    } catch (error) {
      console.error('Error submitting ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Submit New Ticket</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Issue Type
            </label>
            <select
              value={formData.issueType}
              onChange={(e) => setFormData(prev => ({ ...prev, issueType: e.target.value as any }))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {issueTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {priorities.map(priority => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Brief description of the issue"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.title}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Detailed description of the issue"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.description}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Room Number
            </label>
            <input
              type="text"
              value={formData.roomNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, roomNumber: e.target.value }))}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.roomNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.roomNumber && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.roomNumber}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Block Number
            </label>
            <input
              type="text"
              value={formData.blockNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, blockNumber: e.target.value }))}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.blockNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.blockNumber && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.blockNumber}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.contactNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.contactNumber && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.contactNumber}
              </p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Attach Media (Images/Videos)
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-4 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
              id="media-upload"
            />
            <label
              htmlFor="media-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                PNG, JPG, MP4 up to 50MB (max 5 files)
              </span>
            </label>
          </div>
          
          {mediaFiles.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {mediaFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-2 flex items-center space-x-2">
                    <span className="text-sm truncate dark:text-white">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;