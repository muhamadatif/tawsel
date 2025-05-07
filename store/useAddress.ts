import { AddressItem } from "@/Constants/Types";
import { create } from "zustand";

interface addressState {
  currentAddress: AddressItem;
  addressList: AddressItem[];
  setCurrentAddress: (address: AddressItem) => void;
  addAddressToList: (address: AddressItem) => void;
}
const useAddressStore = create<addressState>((set) => ({
  currentAddress: {
    tag: "",
    building: "",
    flat: "",
    reach: "",
    street: "",
    region: "",
  },
  addressList: [],
  setCurrentAddress: (address: AddressItem) =>
    set(() => ({ currentAddress: address })),
  addAddressToList: (address: AddressItem) =>
    set((state) => ({ addressList: [...state.addressList, address] })),
}));

export default useAddressStore;
