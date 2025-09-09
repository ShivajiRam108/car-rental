// import React from 'react';
// import { X, User, Mail, Calendar, Settings, LogOut } from 'lucide-react';

// const ProfileModal = ({ onClose }) => {
//   const adminData = {
//     name: "Super Admin",
//     email: "admin@rentipy.com",
//     role: "Administrator",
//     joinDate: "January 2024",
//     lastLogin: "2 hours ago",
//     status: "Active",
//     avatar: null
//   };

//   const handleEditProfile = () => {
//     console.log("Edit profile");
//     // Navigate to profile edit page or open edit modal
//   };

//   const handleChangePassword = () => {
//     console.log("Change password");
//     // Navigate to change password page or open modal
//   };

//   const handleAccountSettings = () => {
//     console.log("Account settings");
//     // Navigate to account settings
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4 shadow-xl">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
//           <button 
//             onClick={onClose}
//             className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
//           >
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Profile Info */}
//         <div className="p-6">
//           {/* Avatar and Basic Info */}
//           <div className="text-center mb-6">
//             <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
//               <User className="w-10 h-10 text-white" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//               {adminData.name}
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               {adminData.email}
//             </p>
//             <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded-full mt-2">
//               {adminData.status}
//             </span>
//           </div>

//           {/* Profile Details */}
//           <div className="space-y-4 mb-6">
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</span>
//               <span className="text-sm text-blue-600 dark:text-blue-400">{adminData.role}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Member Since</span>
//               <span className="text-sm text-gray-600 dark:text-gray-400">{adminData.joinDate}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Login</span>
//               <span className="text-sm text-gray-600 dark:text-gray-400">{adminData.lastLogin}</span>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="space-y-3">
//             <button 
//               onClick={handleEditProfile}
//               className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//             >
//               <User className="w-4 h-4 mr-2" />
//               Edit Profile
//             </button>
            
//             <button 
//               onClick={handleChangePassword}
//               className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
//             >
//               <Settings className="w-4 h-4 mr-2" />
//               Change Password
//             </button>

//             <button 
//               onClick={handleAccountSettings}
//               className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
//             >
//               <Settings className="w-4 h-4 mr-2" />
//               Account Settings
//             </button>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="px-6 py-4 border-t dark:border-gray-700">
//           <button 
//             onClick={onClose}
//             className="w-full px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileModal;



import React from "react";
import { X, User, Settings, LogOut } from "lucide-react";

function safeParse(json, fallback = null) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

function formatMonthYear(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", { year: "numeric", month: "long" });
}

function resolveActiveUser() {
  // 1) Preferred: explicit "user" object set at login
  const storedUser = safeParse(localStorage.getItem("user"));
  if (storedUser?.email) return storedUser;

  // 2) Fallback: find by an email hint among registered "users"
  const users = safeParse(localStorage.getItem("users"), []);
  if (!Array.isArray(users) || users.length === 0) return null;

  const emailHint =
    localStorage.getItem("authEmail") ||
    safeParse(localStorage.getItem("lastRegistered"))?.email ||
    null;

  if (emailHint) {
    const found = users.find(
      (u) => u?.email?.toLowerCase() === emailHint.toLowerCase()
    );
    if (found) return found;
  }

  // 3) If "logged in" but no hint, show the most recently registered user as a soft fallback
  if (localStorage.getItem("isLoggedIn") === "true") {
    return users[users.length - 1] || null;
  }

  return null;
}

const ProfileModal = ({ onClose }) => {
  const [active, setActive] = React.useState(resolveActiveUser());

  // Keep in sync if other tabs/windows update storage
  React.useEffect(() => {
    const onStorage = () => setActive(resolveActiveUser());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const display = React.useMemo(() => {
    if (active) {
      return {
        name: active.name || "User",
        email: active.email || "unknown@local",
        role: active.role || "User",
        joinDate: formatMonthYear(active.createdAt),
        lastLogin: localStorage.getItem("lastLogin") || "Just now",
        status: "Active",
        avatar: active.avatar || null,
      };
    }
    // Neutral fallback if nothing found
    return {
      name: "Guest",
      email: "guest@local",
      role: "Visitor",
      joinDate: "—",
      lastLogin: "—",
      status: "Inactive",
      avatar: null,
    };
  }, [active]);

  // const handleEditProfile = () => {
  //   // TODO: route to /profile/edit or open an edit modal
  //   console.log("Edit profile");
  // };

  // const handleChangePassword = () => {
  //   // TODO: route to /profile/password or open a password modal
  //   console.log("Change password");
  // };

  // const handleAccountSettings = () => {
  //   // TODO: route to /settings/account
  //   console.log("Account settings");
  // };

  const handleLogout = () => {
    // Clear common auth keys; adjust if your app uses different keys
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authEmail");
    localStorage.setItem("isLoggedIn", "false");
    // Optional: remember lastLogin
    localStorage.setItem("lastLogin", new Date().toLocaleString());
    // Send to login
    window.location.href = "/login";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="p-6">
          {/* Avatar and Basic Info */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {display.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {display.email}
            </p>
            <span className={`inline-block px-3 py-1 ${display.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300"} text-xs rounded-full mt-2`}>
              {display.status}
            </span>
          </div>

          {/* Profile Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</span>
              <span className="text-sm text-blue-600 dark:text-blue-400">{display.role}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Member Since</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{display.joinDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Login</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{display.lastLogin}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            

            {/* Optional: Log out */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
