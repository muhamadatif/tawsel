import { AddressItem } from "@/Constants/Types";
import { create } from "zustand";

interface addressState {
  currentAddress: AddressItem;
  addressList: AddressItem[];
  setCurrentAddress: (address: AddressItem) => void;
  addAddressToList: (address: AddressItem) => void;
  editAddress: (address: AddressItem) => void;
  deleteAddress: (id: string) => void;
}
const useAddressStore = create<addressState>((set) => ({
  currentAddress: {
    id: "",
    tag: "",
    building: "",
    flat: "",
    reach: "",
    place: null,
    latitude: 0,
    longitude: 0,
  },
  addressList: [],
  setCurrentAddress: (address: AddressItem) =>
    set(() => ({ currentAddress: address })),
  addAddressToList: (address: AddressItem) =>
    set((state) => ({ addressList: [...state.addressList, address] })),
  editAddress: (address: AddressItem) =>
    set((state) => ({
      addressList: state.addressList.map((a) =>
        a.id === address.id ? address : a
      ),
    })),
  deleteAddress: (id: string) =>
    set((state) => ({
      addressList: state.addressList.filter((a) => a.id !== id),
    })),
}));

export default useAddressStore;
