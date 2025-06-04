export const TAGS = ["HOME", "OFFICE", "HOTEL", "OTHER"];

export const restaurant = {
  id: "resto_001",
  name: "Qasr AlShawarma",
  rating: 4.6,
  reviews: 245,
  image: require("@/assets/images/restaurants/restaurant1.jpg"),
  logo: require("@/assets/images/restaurants/logo1.webp"),
  discount: 15,
  deliveryTime: "30-45 min",
  description: "Hungry? We got you",
  categories: [
    {
      id: "cat_01",
      name: "Chicken",
      items: [
        {
          id: "item_001",
          name: "Grilled Chicken",
          price: 12.99,
          description:
            "Juicy grilled chicken breast served with herbs and lemon.",
          image: require("@/assets/images/restaurants/menu/chicken/grilled-chicken.avif"),
        },
        {
          id: "item_002",
          name: "Spicy Chicken Wings",
          price: 9.99,
          description: "Crispy wings tossed in a spicy buffalo sauce.",
          image: require("@/assets/images/restaurants/menu/chicken/spicy-chicken.avif"),
        },
      ],
    },
    {
      id: "cat_02",
      name: "Beef",
      items: [
        {
          id: "item_003",
          name: "Beef Steak",
          price: 18.5,
          description: "Tender grilled steak cooked to perfection.",
          image: require("@/assets/images/restaurants/menu/beef/beef-steak.avif"),
        },
        {
          id: "item_004",
          name: "Beef Burger",
          price: 10.0,
          description: "Classic beef burger with lettuce, tomato, and cheese.",
          image: require("@/assets/images/restaurants/menu/beef/beef-burger.avif"),
        },
      ],
    },
    {
      id: "cat_03",
      name: "Salads",
      items: [
        {
          id: "item_005",
          name: "Caesar Salad",
          price: 7.5,
          description:
            "Romaine lettuce, parmesan, croutons, and Caesar dressing.",
          image: require("@/assets/images/restaurants/menu/salads/caesar-salad.avif"),
        },

        {
          id: "item_006",
          name: "Greek Salad",
          price: 8.0,
          description:
            "Tomatoes, cucumbers, olives, feta cheese, and olive oil.",
          image: require("@/assets/images/restaurants/menu/salads/greek-salad.avif"),
        },
      ],
    },
    {
      id: "cat_04",
      name: "Desserts",
      items: [
        {
          id: "item_007",
          name: "Chocolate Cake",
          price: 6.5,
          description: "Rich and moist chocolate layered cake.",
          image: require("@/assets/images/restaurants/menu/deserts/chocolate-cake.avif"),
        },
        {
          id: "item_008",
          name: "Cheesecake",
          price: 6.99,
          description: "Creamy New York-style cheesecake.",
          image: require("@/assets/images/restaurants/menu/deserts/cheese-cake.avif"),
        },
      ],
    },
    {
      id: "cat_05",
      name: "Drinks",
      items: [
        {
          id: "item_009",
          name: "Lemonade",
          price: 2.99,
          description: "Freshly squeezed lemons with a splash of mint.",

          image: require("@/assets/images/restaurants/menu/drinks/lemonade.avif"),
        },
        {
          id: "item_010",
          name: "Iced Coffee",
          price: 3.5,
          description: "Cold brewed coffee served over ice.",
          image: require("@/assets/images/restaurants/menu/drinks/iced-coffee.avif"),
        },
      ],
    },
  ],
};
