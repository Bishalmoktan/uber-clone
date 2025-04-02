import { useMutation } from "@tanstack/react-query";
import { api } from "./authService";

type RideData = {
  pickup: string;
  destination: string;
  vehicleType: string;
};

const createRide = async (rideData: RideData) => {
  const { data } = await api.post("/ride/create-ride", rideData);
  return data;
};

export const useCreateRide = () => {
  return useMutation({
    mutationFn: createRide,
  });
};
