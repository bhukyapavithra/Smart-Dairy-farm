import React, { useState } from 'react';
import { Camera, MapPin, Phone, Mail, Save, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { FarmerProfile } from '../../types';

const Profile: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const { showToast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    farmName: (userProfile as FarmerProfile)?.farmName || '',
    description: (userProfile as FarmerProfile)?.description || '',
    founded: (userProfile as FarmerProfile)?.founded || '',
    contactPhone: (userProfile as FarmerProfile)?.contactPhone || currentUser?.phone || '',
    address: 'Farm Location Address',
    email: currentUser?.email || '',
    name: currentUser?.name || '',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    showToast('Profile updated successfully!', 'success');
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farm Profile</h1>
          <p className="mt-2 text-gray-600">Manage your farm information</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Cover Image & Profile Picture */}
          <div className="relative h-48 bg-farm-green-800">
            <img 
              src="https://images.pexels.com/photos/235648/pexels-photo-235648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Farm cover" 
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100">
                <Camera className="h-5 w-5 text-gray-700" />
              </button>
            )}
            
            <div className="absolute bottom-0 left-8 transform translate-y-1/2">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/2382968/pexels-photo-2382968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Farm profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100 border border-gray-200">
                    <Camera className="h-4 w-4 text-gray-700" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="pt-16 px-8 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditing ? (
                    <input
                      type="text"
                      name="farmName"
                      value={formData.farmName}
                      onChange={handleInputChange}
                      className="border-b border-gray-300 pb-1 text-2xl font-bold focus:outline-none focus:border-farm-green-500"
                      placeholder="Farm Name"
                    />
                  ) : (
                    formData.farmName || 'Your Farm Name'
                  )}
                </h2>
                <div className="mt-2 flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-1" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-farm-green-500"
                      placeholder="Farm Address"
                    />
                  ) : (
                    <span>Farm Location, Countryside</span>
                  )}
                </div>
              </div>
              
              {isEditing ? (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500 ${
                    isSaving ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSaving ? (
                    <>
                      <div className="h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500"
                >
                  Edit Profile
                </button>
              )}
            </div>
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">About the Farm</h3>
                    {isEditing ? (
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                        placeholder="Describe your farm, your practices, and what makes your dairy products special..."
                      />
                    ) : (
                      <p className="text-gray-600">
                        {formData.description || 
                          "Our family-owned farm has been producing high-quality, organic dairy products for generations. We focus on sustainable farming practices and the well-being of our animals. Our cows are grass-fed and free to roam in open pastures, resulting in the freshest, most nutritious milk possible."}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Farm Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Founded</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="founded"
                            value={formData.founded}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                            placeholder="Year founded"
                          />
                        ) : (
                          <p className="text-gray-600">
                            {formData.founded || "1982"}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                            placeholder="Contact phone number"
                          />
                        ) : (
                          <p className="text-gray-600 flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            {formData.contactPhone || "555-123-4567"}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                            placeholder="Email address"
                          />
                        ) : (
                          <p className="text-gray-600 flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            {formData.email || "farm@example.com"}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                            placeholder="Farm owner name"
                          />
                        ) : (
                          <p className="text-gray-600 flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            {formData.name || "John Farmer"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Farm Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-farm-amber-100 text-farm-amber-800">
                        Organic Certified
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-farm-green-100 text-farm-green-800">
                        Grass-Fed
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Animal Welfare Approved
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Sustainability Certified
                      </span>
                      {isEditing && (
                        <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
                          + Add New
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Farm Location</h3>
                  <div className="bg-gray-200 h-48 rounded-lg mb-4 relative overflow-hidden">
                    <img 
                      src="https://images.pexels.com/photos/143654/pexels-photo-143654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Farm location map"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <MapPin className="h-10 w-10 text-farm-green-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Customers can find your farm using the location shown on this map.
                  </p>
                  {isEditing && (
                    <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500">
                      Update Location
                    </button>
                  )}
                </div>
                
                <div className="mt-6 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="text-farm-green-600 hover:text-farm-green-700 text-sm">
                        Change Password
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-farm-green-600 hover:text-farm-green-700 text-sm">
                        Payment Methods
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-farm-green-600 hover:text-farm-green-700 text-sm">
                        Notification Settings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-farm-green-600 hover:text-farm-green-700 text-sm">
                        Privacy Settings
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;