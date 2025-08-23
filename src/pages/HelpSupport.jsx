import React, { useState } from 'react';
import { HelpCircle, Book, MessageSquare, Phone, Mail, ExternalLink, Search, FileText } from 'lucide-react';

const HelpSupport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqCategories = [
    { id: 'all', name: 'All Topics', count: 15 },
    { id: 'general', name: 'General', count: 5 },
    { id: 'bookings', name: 'Bookings', count: 4 },
    { id: 'payments', name: 'Payments', count: 3 },
    { id: 'technical', name: 'Technical', count: 3 }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I add a new car to the system?',
      answer: 'Navigate to Cars > Add New Car, fill in the required details including model, type, area, and pricing information.',
      category: 'general'
    },
    {
      id: 2,
      question: 'How can I manage user bookings?',
      answer: 'Go to Car Booking section to view all bookings. You can edit, cancel, or update booking status from there.',
      category: 'bookings'
    },
    {
      id: 3,
      question: 'Where can I view payment transactions?',
      answer: 'Payment information is available in the Payment Methods section and individual booking details.',
      category: 'payments'
    },
    {
      id: 4,
      question: 'How do I backup my data?',
      answer: 'Use the Backup & Restore feature to create manual backups or configure automatic backups.',
      category: 'technical'
    },
    {
      id: 5,
      question: 'How to set up email notifications?',
      answer: 'Configure email settings in System Settings > Notifications to enable various email alerts.',
      category: 'technical'
    }
  ];

  const quickActions = [
    {
      title: 'User Guide',
      description: 'Complete guide to using the admin dashboard',
      icon: Book,
      action: () => alert('Opening user guide...')
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video tutorials',
      icon: ExternalLink,
      action: () => alert('Opening video tutorials...')
    },
    {
      title: 'API Documentation',
      description: 'Developer API documentation',
      icon: FileText,
      action: () => alert('Opening API docs...')
    },
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: MessageSquare,
      action: () => alert('Opening support chat...')
    }
  ];

  const supportChannels = [
    {
      type: 'Email',
      contact: 'support@rentipy.com',
      hours: '24/7',
      icon: Mail,
      description: 'Best for non-urgent inquiries'
    },
    {
      type: 'Phone',
      contact: '+1 (555) 123-4567',
      hours: '9 AM - 6 PM EST',
      icon: Phone,
      description: 'For immediate assistance'
    },
    {
      type: 'Live Chat',
      contact: 'Available in dashboard',
      hours: '9 AM - 6 PM EST',
      icon: MessageSquare,
      description: 'Quick help for urgent issues'
    }
  ];

  const systemStatus = {
    overall: 'Operational',
    services: [
      { name: 'Dashboard', status: 'Operational' },
      { name: 'Booking System', status: 'Operational' },
      { name: 'Payment Gateway', status: 'Operational' },
      { name: 'Email Service', status: 'Maintenance' },
      { name: 'Backup System', status: 'Operational' }
    ]
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = !searchTerm || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <HelpCircle className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
            <p className="text-gray-600">Find answers and get help with your dashboard</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <action.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {faqCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <details key={faq.id} className="bg-gray-50 rounded-lg">
                <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:text-blue-600">
                  {faq.question}
                </summary>
                <div className="px-4 pb-4 text-gray-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No FAQs found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Support Channels */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supportChannels.map((channel, index) => (
            <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <channel.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{channel.type}</h3>
              <p className="text-sm text-blue-600 mb-1">{channel.contact}</p>
              <p className="text-xs text-gray-500 mb-2">{channel.hours}</p>
              <p className="text-xs text-gray-600">{channel.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
          <span className={`px-3 py-1 rounded-full text-sm ${
            systemStatus.overall === 'Operational' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {systemStatus.overall}
          </span>
        </div>
        
        <div className="space-y-3">
          {systemStatus.services.map((service, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <span className="text-gray-700">{service.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                service.status === 'Operational' 
                  ? 'bg-green-100 text-green-800'
                  : service.status === 'Maintenance'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {service.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
