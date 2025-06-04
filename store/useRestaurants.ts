import { Restaurant } from "@/Constants/Types";
import { create } from "zustand";

const restaurantsArray = [
  {
    id: "1",
    name: "Qasr AlShawarma",
    rating: 4.4,
    reviews: 1000,
    logo: require("@/assets/images/restaurants/logo1.webp"),
    image: require("@/assets/images/restaurants/restaurant1.jpg"),
    favourite: false,
  },
  {
    id: "2",
    name: "Anas Al Demeshky",
    rating: 4.7,
    reviews: 3000,
    logo: require("@/assets/images/restaurants/logo2.webp"),
    image: require("@/assets/images/restaurants/restaurant2.jpg"),
    favourite: false,
  },
  {
    id: "3",
    name: "B.Laban",
    rating: 4.4,
    reviews: 999,
    logo: require("@/assets/images/restaurants/logo3.webp"),
    image: require("@/assets/images/restaurants/restaurant3.jpg"),
    favourite: false,
  },
];

type RestaurantMap = {
  [id: string]: Restaurant;
};

interface RestaurantState {
  restaurants: RestaurantMap;
  toggleFavourite: (id: string) => void;
}

const initialRestaurantMap: RestaurantMap = restaurantsArray.reduce(
  (acc, rest) => {
    acc[rest.id] = rest;
    return acc;
  },
  {} as RestaurantMap
);

const useRestaurantStore = create<RestaurantState>((set) => ({
  restaurants: initialRestaurantMap,
  toggleFavourite: (id: string) =>
    set((state) => {
      const restaurant = state.restaurants[id];
      if (!restaurant) return {}; // if not found, do nothing

      const updatedRestaurant = {
        ...restaurant,
        favourite: !restaurant.favourite,
        reviews: !restaurant.favourite
          ? restaurant.reviews + 1
          : Math.max(0, restaurant.reviews - 1),
      };

      return {
        restaurants: {
          ...state.restaurants,
          [id]: updatedRestaurant,
        },
      };
    }),
}));

export default useRestaurantStore;
