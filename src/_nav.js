export default {
  items: [
    // {
    //   name: 'Dashboard',
    //   url: '/dashboard',
    //   icon: 'icon-speedometer',
    //   badge: {
    //     variant: 'info',
    //   },
    // },
    {
      title: true,
      name: 'Navigation',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Schedule a meeting',
      url: '/Base/Forms',
      icon: 'icon-pencil',
    },
    {
      name: 'Meeting History',
      url: '/Base/Tables',
      icon: 'icon-drop',
    },

    {
      name: 'Update Meeting',
      url: '/Base/Popovers',
      icon: 'icon-drop',
    },
    {
      name: 'User Profile',
      url: '/Users/User',
      icon: 'icon-user',
    },
   


  ],
};
