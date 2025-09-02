// export const getSectionTitle = (section) => {
//   const titles = {
//     main: '',
//     defaults: 'DEFAULTS',
//     cars: 'CARS',
//     booking: 'BOOKING DETAILS',
//     users: 'USER MANAGEMENT',
//     reports: 'REPORTS',
//     communication: 'COMMUNICATION',
//     system: 'SYSTEM',
//     support: 'SUPPORT'
//   };
//   return titles[section] || '';
// };

// export const getColorClasses = (color) => {
//   const colors = {
//     red: 'text-red-500 stroke-red-500',
//     green: 'text-green-500 stroke-green-500',
//     yellow: 'text-yellow-500 stroke-yellow-500',
//     pink: 'text-pink-500 stroke-pink-500',
//     orange: 'text-orange-500 stroke-orange-500',
//     blue: 'text-blue-500 stroke-blue-500'
//   };
//   return colors[color] || 'text-gray-500 stroke-gray-500';
// };


export const getSectionTitle = (section) => {
  const titles = {
    main: '',
    defaults: 'DEFAULTS',
    cars: 'CARS',
    booking: 'BOOKING DETAILS',
    users: 'USER MANAGEMENT',
    reports: 'REPORTS',
    communication: 'COMMUNICATION',
    system: 'SYSTEM',
    support: 'SUPPORT'
  };
  return titles[section] || '';
};

export const getColorClasses = (color) => {
  const colors = {
    red: 'text-red-500 stroke-red-500',
    green: 'text-green-500 stroke-green-500',
    yellow: 'text-yellow-500 stroke-yellow-500',
    pink: 'text-pink-500 stroke-pink-500',
    orange: 'text-orange-500 stroke-orange-500',
    blue: 'text-blue-500 stroke-blue-500'
  };
  return colors[color] || 'text-gray-500 stroke-gray-500';
};
