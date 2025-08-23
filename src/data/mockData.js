export const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', verified: true, joinDate: '2024-01-15', phone: '+1234567890', address: '123 Main St, NY' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', verified: true, joinDate: '2024-02-20', phone: '+1234567891', address: '456 Oak Ave, CA' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Banned', verified: false, joinDate: '2024-03-10', phone: '+1234567892', address: '789 Pine Rd, TX' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', verified: true, joinDate: '2024-04-05', phone: '+1234567893', address: '321 Elm St, FL' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Inactive', verified: false, joinDate: '2024-05-12', phone: '+1234567894', address: '654 Maple Dr, WA' }
];

export const mockCars = [
  { id: 1, model: 'Toyota Camry', type: 'Sedan', area: 'Downtown', price: 50, status: 'Available', year: 2022, color: 'Silver', mileage: 25000, features: ['GPS', 'AC', 'Bluetooth'] },
  { id: 2, model: 'Honda CR-V', type: 'SUV', area: 'Uptown', price: 65, status: 'Booked', year: 2023, color: 'White', mileage: 15000, features: ['GPS', 'AC', 'Backup Camera'] },
  { id: 3, model: 'BMW 320i', type: 'Luxury', area: 'Downtown', price: 120, status: 'Available', year: 2024, color: 'Black', mileage: 5000, features: ['GPS', 'AC', 'Leather Seats', 'Sunroof'] },
  { id: 4, model: 'Ford Focus', type: 'Compact', area: 'Suburbs', price: 40, status: 'Maintenance', year: 2021, color: 'Blue', mileage: 35000, features: ['AC', 'Radio'] }
];

export const mockBookings = [
  { id: 1, userId: 1, carId: 1, startDate: '2024-08-01', endDate: '2024-08-05', status: 'Completed', amount: 200, paymentMethod: 'Credit Card', notes: 'Business trip' },
  { id: 2, userId: 2, carId: 2, startDate: '2024-08-10', endDate: '2024-08-15', status: 'Active', amount: 325, paymentMethod: 'PayPal', notes: 'Family vacation' },
  { id: 3, userId: 3, carId: 3, startDate: '2024-08-20', endDate: '2024-08-25', status: 'Cancelled', amount: 600, paymentMethod: 'Credit Card', notes: 'Changed plans' }
];

export const mockMessages = [
  { id: 1, name: 'Customer 1', email: 'customer1@example.com', subject: 'Booking Issue', message: 'Having trouble with my booking process. The system seems to hang when I try to confirm.', status: 'Unread', date: '2024-08-20', priority: 'High', phone: '+1234567890' },
  { id: 2, name: 'Customer 2', email: 'customer2@example.com', subject: 'Payment Problem', message: 'Payment was deducted but booking not confirmed. Please help.', status: 'Read', date: '2024-08-21', priority: 'High', phone: '+1234567891' },
  { id: 3, name: 'Customer 3', email: 'customer3@example.com', subject: 'Car Condition', message: 'The car I received had some scratches that were not mentioned in the listing.', status: 'Replied', date: '2024-08-19', priority: 'Medium', phone: '+1234567892' }
];

export const mockAnnouncements = [
  { id: 1, title: 'System Maintenance', content: 'Scheduled maintenance on Sunday from 2-4 AM. Services will be temporarily unavailable.', status: 'Active', date: '2024-08-20', priority: 'High', type: 'System', targetAudience: 'All Users' },
  { id: 2, title: 'New Features', content: 'New booking features available including instant booking and premium car selection.', status: 'Active', date: '2024-08-18', priority: 'Medium', type: 'Feature', targetAudience: 'Active Users' },
  { id: 3, title: 'Holiday Notice', content: 'Office will be closed on national holiday. Customer support will be limited.', status: 'Inactive', date: '2024-08-15', priority: 'Low', type: 'General', targetAudience: 'All Users' }
];

export const carTypes = ['Sedan', 'SUV', 'Luxury', 'Compact', 'Sports', 'Electric', 'Hybrid', 'Van'];
export const carAreas = ['Downtown', 'Uptown', 'Suburbs', 'Airport', 'Beach Area', 'Business District'];
export const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

export const mockSubscribers = [
  { id: 1, email: 'user1@example.com', subscribeDate: '2024-01-15', status: 'Active', source: 'Website', preferences: ['Newsletters', 'Promotions'] },
  { id: 2, email: 'user2@example.com', subscribeDate: '2024-02-20', status: 'Active', source: 'Mobile App', preferences: ['Newsletters'] },
  { id: 3, email: 'user3@example.com', subscribeDate: '2024-03-10', status: 'Unsubscribed', source: 'Website', preferences: ['Newsletters', 'Promotions', 'Updates'] },
  { id: 4, email: 'user4@example.com', subscribeDate: '2024-04-05', status: 'Active', source: 'Social Media', preferences: ['Promotions'] }
];

// Activity Logs
export const mockActivityLogs = [
  {
    id: 1,
    timestamp: '2024-08-23 10:30:25',
    user: 'John Doe',
    action: 'User Login',
    resource: 'Authentication',
    details: 'Successful login from 192.168.1.100',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome/91.0.4472.124',
    status: 'Success'
  },
  {
    id: 2,
    timestamp: '2024-08-23 10:28:15',
    user: 'Admin',
    action: 'Car Added',
    resource: 'Cars',
    details: 'Added new car: Toyota Camry 2024',
    ipAddress: '192.168.1.101',
    userAgent: 'Firefox/89.0',
    status: 'Success'
  }
];

// Payment Methods
export const mockPaymentMethods = [
  { id: 1, name: 'Credit Card', type: 'Card', provider: 'Stripe', enabled: true, fee: 2.9, description: 'Visa, MasterCard, American Express' },
  { id: 2, name: 'PayPal', type: 'Digital Wallet', provider: 'PayPal', enabled: true, fee: 3.4, description: 'PayPal account payments' },
  { id: 3, name: 'Bank Transfer', type: 'Transfer', provider: 'Direct', enabled: true, fee: 0, description: 'Direct bank account transfer' },
  { id: 4, name: 'Apple Pay', type: 'Digital Wallet', provider: 'Apple', enabled: false, fee: 2.9, description: 'Apple Pay mobile payments' }
];
