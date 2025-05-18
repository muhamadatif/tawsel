import { AddressItem } from "@/Constants/Types";
import { create } from "zustand";

interface addressState {
  currentAddress: AddressItem | null;
  addressList: AddressItem[];
  setCurrentAddress: (address: AddressItem) => void;
  addAddressToList: (address: AddressItem) => void;
  editAddress: (address: AddressItem) => void;
  deleteAddress: (id: string) => void;
}
const useAddressStore = create<addressState>((set) => ({
  currentAddress: null,
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
    set((state) => {
      const newList = state.addressList.filter((a) => a.id !== id);
      return {
        addressList: newList,
        currentAddress:
          state.currentAddress?.id === id ? newList[0] : state.currentAddress,
      };
    }),
}));

export default useAddressStore;
