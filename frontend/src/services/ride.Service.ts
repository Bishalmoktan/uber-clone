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

type StartRideData = {
  riderId: string;
  rideId: string;
};

const startRide = async ({ riderId, rideId }: StartRideData) => {
  const { data } = await api.post("/ride/start-ride", {
    rideId,
    riderId,
  });

  return data;
};

export const useStartRide = () => {
  return useMutation({
    mutationFn: startRide,
  });
};
