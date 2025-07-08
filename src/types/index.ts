export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  roomNumber?: string;
  blockNumber?: string;
  contactNumber?: string;
  profilePhoto?: string;
}

export interface Ticket {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  roomNumber: string;
  blockNumber: string;
  contactNumber: string;
  issueType: 'electricity' | 'cleaning' | 'water-cooler' | 'carpentry' | 'wifi' | 'other';
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  adminNotes?: string;
  mediaFiles?: MediaFile[];
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}