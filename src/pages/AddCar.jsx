import React, { useState } from 'react';
import { Car, Save, X, ArrowLeft, Upload } from 'lucide-react';

const AddCar = ({ onBack, onSave }) => {
  const [carData, setCarData] = useState({
    model: '',
    brand: '',
    year: new Date().getFullYear(),
    type: '',
    area: '',
    pricePerDay: '',
    color: '',
    mileage: '',
    seats: '',
    fuelType: 'Petrol',
    transmission: 'Manual',
    features: [],
    description: '',
    status: 'Available',
    images: []
  });

  const [errors, setErrors] = useState({});

  const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Truck', 'Van'];
  const areas = ['Downtown', 'Uptown', 'Suburbs', 'Airport', 'Beach Area', 'Business District'];
  const availableFeatures = ['GPS', 'AC', 'Bluetooth', 'Backup Camera', 'Leather Seats', 'Sunroof', 'USB Charging', 'WiFi'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'features') {
      setCarData(prev => ({
        ...prev,
        features: checked 
          ? [...prev.features, value]
          : prev.features.filter(feature => feature !== value)
      }));
    } else {
      setCarData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) || '' : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setCarData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setCarData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!carData.model.trim()) newErrors.model = 'Car model is required';
    if (!carData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!carData.type) newErrors.type = 'Car type is required';
    if (!carData.area) newErrors.area = 'Area is required';
    if (!carData.pricePerDay || carData.pricePerDay <= 0) newErrors.pricePerDay = 'Valid price per day is required';
    if (!carData.color.trim()) newErrors.color = 'Color is required';
    if (!carData.seats || carData.seats <= 0) newErrors.seats = 'Number of seats is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newCar = {
        id: Date.now(),
        ...carData,
        createdAt: new Date().toISOString()
      };
      
      onSave && onSave(newCar);
      
      // Reset form
      setCarData({
        model: '',
        brand: '',
        year: new Date().getFullYear(),
        type: '',
        area: '',
        pricePerDay: '',
        color: '',
        mileage: '',
        seats: '',
        fuelType: 'Petrol',
        transmission: 'Manual',
        features: [],
        description: '',
        status: 'Available',
        images: []
      });
      
      alert('Car added successfully!');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Car className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Car</h2>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        {/* Basic Information */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Car Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Car Model *
              </label>
              <input
                type="text"
                name="model"
                value={carData.model}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.model ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Camry, Accord"
              />
              {errors.model && <p className="mt-1 text-sm text-red-500">{errors.model}</p>}
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={carData.brand}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.brand ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Toyota, Honda"
              />
              {errors.brand && <p className="mt-1 text-sm text-red-500">{errors.brand}</p>}
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={carData.year}
                onChange={handleInputChange}
                min="1990"
                max={new Date().getFullYear() + 1}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Car Type *
              </label>
              <select
                name="type"
                value={carData.type}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.type ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select car type</option>
                {carTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
            </div>

            {/* Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Area *
              </label>
              <select
                name="area"
                value={carData.area}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.area ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select area</option>
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area}</p>}
            </div>

            {/* Price Per Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Per Day (₹) *
              </label>
              <input
                type="number"
                name="pricePerDay"
                value={carData.pricePerDay}
                onChange={handleInputChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.pricePerDay ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="50"
              />
              {errors.pricePerDay && <p className="mt-1 text-sm text-red-500">{errors.pricePerDay}</p>}
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Vehicle Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color *
              </label>
              <input
                type="text"
                name="color"
                value={carData.color}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.color ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Red, Blue"
              />
              {errors.color && <p className="mt-1 text-sm text-red-500">{errors.color}</p>}
            </div>

            {/* Mileage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mileage (km)
              </label>
              <input
                type="number"
                name="mileage"
                value={carData.mileage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="25000"
              />
            </div>

            {/* Seats */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Seats *
              </label>
              <input
                type="number"
                name="seats"
                value={carData.seats}
                onChange={handleInputChange}
                min="2"
                max="12"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.seats ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="4"
              />
              {errors.seats && <p className="mt-1 text-sm text-red-500">{errors.seats}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={carData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={carData.fuelType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Transmission
              </label>
              <select
                name="transmission"
                value={carData.transmission}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableFeatures.map(feature => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  name="features"
                  value={feature}
                  checked={carData.features.includes(feature)}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Car Images</h3>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
            <div className="text-center">
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <label className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-500">Upload images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB each</p>
            </div>
            
            {/* Image Preview */}
            {carData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {carData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Car ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={carData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter car description (optional)"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              setCarData({
                model: '',
                brand: '',
                year: new Date().getFullYear(),
                type: '',
                area: '',
                pricePerDay: '',
                color: '',
                mileage: '',
                seats: '',
                fuelType: 'Petrol',
                transmission: 'Manual',
                features: [],
                description: '',
                status: 'Available',
                images: []
              });
              setErrors({});
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <X className="w-4 h-4 inline mr-2" />
            Clear
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            <Save className="w-4 h-4 inline mr-2" />
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};
    
export default AddCar;
