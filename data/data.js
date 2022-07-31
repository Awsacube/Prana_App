import offer from '../src/screens/offer.jpeg'


export default [
    {
      type: 'CHOOSE A CATEGORY',
      imageUri: require('../src/assets/cat.png'),
      heading: 'Complete Health Solution',
      description: 'Early Protection For Your Family Health',
      key: 'first',
      color: '#cd84f1',
    },
    {
      type: 'ADD YOUR BUSINESS',
      imageUri: require('../src/assets/bus.png'),
      heading: 'Find The Best Doctors & Medicines In your Location',
      // description: 'Add your business details so that your customers can see about your business',
      key: 'second',
      color: '#7d5fff',
    },
    {
      type: 'MANAGE YOUR PROFILE',
      imageUri: require('../src/assets/pro.png'),
      heading: 'Scedule Appointments For Expert Doctors',
      // description:
      //   'Manage your profile so that your business is on the top',
      key: 'third',
      color: '#7efff5',
    },
    {
      type: 'DISCOVER PEOPLE',
      imageUri: require('../src/assets/dis.png'),
      heading: 'Book Diagnostics with expert doctors',
      // description:
      //   'Discover new customers around your city',
      key: 'fourth',
      color: '#32ff7e',
    },
  ];

  export const dummyData =
        [{
                // title: 'Anise Aroma Art Bazar',
                // url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
                url:offer,
                // description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                id: 1,
                onPress:'https://www.google.co.in/'

        },
        {
                // title: 'Food inside a Bowl', 
                // url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
                url:offer,
                // description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                id: 2,
                onPress:'https://www.google.co.in/'

        },
        {
                url:offer,
                // title: 'Vegatable Salad', 
                // url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
                // description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                id: 3,
                onPress:'https://www.google.co.in/'
        }]