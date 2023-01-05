export const linking = {
  prefixes: ['mylinker://', 'https://verse.uno/'],
  config: {
    screens: {
      Home: {
        path: 'home',
        screens: {
          explore: '/explore',
        },
      },
      Post: {
        screens: {
          SinglePostScreen: 'post/:id/:authodID',
        },
      },
    },
  },
};
