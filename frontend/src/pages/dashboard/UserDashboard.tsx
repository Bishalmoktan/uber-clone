/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Loader2Icon, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MapView from "@/components/map-view";
import RideInfoCard from "@/components/rider-info-card";
import { LocationInput } from "@/components/location-input";
import VehiclePanel from "@/components/vehicle-panel";
import { Label } from "@/components/ui/label";
import { useCreateRide, useStartRide } from "@/services/ride.Service";
import { useSocket } from "@/context/socket-context";
import { useUser } from "@/context/user-context";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function UserDashboard() {
  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [selectedRider, setSelectedRider] = useState<string>("");
  const [availableRides, setAvailableRides] = useState<any>([]);
  const [activeRide, setActiveRide] = useState<any>(null);
  const [rideStatus, setRideStatus] = useState<
    "ongoing" | "pending" | "completed"
  >("ongoing");

  const { socket } = useSocket();
  const { userId, userType } = useUser();
  const { mutate: confirmRide } = useCreateRide();
  const { mutate: startRide } = useStartRide();

  useEffect(() => {
    socket?.emit("join", {
      userId,
      userType,
    });

    socket?.on("ride-confirmed", (data) => {
      setAvailableRides((prev) => [...prev, data]);
    });

    socket?.on("ride-ended", () => {
      toast.success("Ride completed");
      setRideStatus("completed");
    });
  }, [socket]);

  const handleFindRiders = (e: React.FormEvent) => {
    e.preventDefault();
    if (pickup && destination) {
      setStep(2);
    }
  };

  useEffect(() => {
    if (vehicleType) {
      setStep(3);
    }
  }, [vehicleType]);

  const handleConfirmRide = () => {
    confirmRide(
      {
        pickup,
        destination,
        vehicleType: vehicleType,
      },
      {
        onSuccess: () => {
          setStep(4);
          setRideStatus("pending");
        },
        onError: (error: unknown) => {
          console.error("Ride creation failed:", error);
        },
      }
    );
    setRideStatus("pending");
  };

  const handleStartRide = () => {
    if (!selectedRider) {
      toast.error("No ride is selected");
      return;
    }
    startRide(
      {
        rideId: selectedRider,
        riderId: availableRides.find((ride: any) => (ride._id = selectedRider))
          .rider._id,
      },
      {
        onSuccess: (data) => {
          toast.success("Ride started!");
          setRideStatus("ongoing");
          setActiveRide(data);
          setStep(5);
        },
        onError: (error: unknown) => {
          toast.error("Something went wrong!");
          console.error("Ride creation failed:", error);
        },
      }
    );
  };

  const handleNewRide = () => {
    setStep(1);
    setSelectedRider("");
    setPickup("");
    setDestination("");
  };

  console.log(selectedRider);

  return (
    <div className="min-h-screen">
      <main className="mx-auto container py-6 md:py-12">
        <div className="mx-auto max-w-md space-y-6">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Request a Ride</CardTitle>
                <CardDescription>
                  Enter your pickup and destination locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFindRiders} className="space-y-4">
                  <LocationInput
                    value={pickup}
                    setValue={setPickup}
                    label="Pickup Location"
                    id="pickup"
                  />
                  <LocationInput
                    value={destination}
                    setValue={setDestination}
                    label="Destination"
                    id="destination"
                  />

                  {pickup && destination && (
                    <div className="pt-2">
                      <MapView
                        pickup={pickup}
                        destination={destination}
                        showRoute={true}
                      />
                    </div>
                  )}

                  <Button type="submit" className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Find Riders
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setStep(1)}
                    className="mr-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <CardTitle>Choose a Ride</CardTitle>
                    <CardDescription>Select vehicle type</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <MapView
                  pickup={pickup}
                  destination={destination}
                  showRoute={true}
                />

                <VehiclePanel
                  setVehicleType={setVehicleType}
                  pickup={pickup}
                  destination={destination}
                />
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setStep(2)}
                    className="mr-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <CardTitle>Confirm Your Ride</CardTitle>
                    <CardDescription>Review your ride details</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <MapView
                  pickup={pickup}
                  destination={destination}
                  showRoute={true}
                />

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Pickup</div>
                  <div className="font-medium">{pickup}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Destination
                  </div>
                  <div className="font-medium">{destination}</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleConfirmRide} className="w-full">
                  Search Rider
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setStep(3)}
                    className="mr-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <CardTitle>Confirm Your Ride</CardTitle>
                    <CardDescription>Select your driver</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <MapView
                  pickup={pickup}
                  destination={destination}
                  showRoute={true}
                />

                <div className="space-y-2">
                  <Label>Available Drivers</Label>
                  <div className="space-y-3">
                    {availableRides.length === 0 && (
                      <div className="flex gap-2">
                        <Loader2Icon className="animate-spin" />
                        <span>Searching for driver...</span>
                      </div>
                    )}
                    {availableRides.map((ride) => (
                      <div
                        key={ride._id}
                        className={cn(
                          "flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer",
                          selectedRider === ride._id && "border border-blue-500"
                        )}
                        onClick={() => setSelectedRider(ride._id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={ride.image}
                              alt={ride.rider.fullname.firstname}
                            />
                            <AvatarFallback>
                              {ride.rider.fullname.firstname.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {ride.rider.fullname.firstname +
                                " " +
                                ride.rider.fullname.lastname}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {ride.vehicle}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{ride.fare}</div>
                          <div className="text-sm text-muted-foreground">
                            OPT: {ride.otp}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleStartRide} className="w-full">
                  Confirm Ride
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <MapView
                pickup={pickup}
                destination={destination}
                showRoute={true}
                className="h-[200px] w-full rounded-lg overflow-hidden"
              />

              <RideInfoCard {...activeRide} role="user" />
              {rideStatus === "completed" && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      Ride Completed
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Thank you for riding with us!
                    </p>
                    <Button onClick={handleNewRide}>Request New Ride</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
