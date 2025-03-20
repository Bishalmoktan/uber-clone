import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import MapView from "@/components/map-view";
import RideInfoCard from "@/components/rider-info-card";

// Mock data for available riders
const availableRiders = [
  {
    id: 1,
    name: "John Doe",
    rating: 4.8,
    vehicle: "Toyota Camry",
    vehicleType: "sedan",
    eta: "3 min",
    price: "$12.50",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Smith",
    rating: 4.9,
    vehicle: "Honda Civic",
    vehicleType: "sedan",
    eta: "5 min",
    price: "$11.75",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 4.7,
    vehicle: "Ford Explorer",
    vehicleType: "suv",
    eta: "7 min",
    price: "$15.25",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    rating: 4.9,
    vehicle: "Tesla Model 3",
    vehicleType: "premium",
    eta: "4 min",
    price: "$18.50",
    image: "/placeholder.svg?height=40&width=40",
  },
];

export default function UserDashboard() {
  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("sedan");
  const [selectedRider, setSelectedRider] = useState<number | null>(null);
  const [rideStatus, setRideStatus] = useState<"ongoing" | "completed">(
    "ongoing"
  );

  const filteredRiders = availableRiders.filter(
    (rider) => vehicleType === "all" || rider.vehicleType === vehicleType
  );

  const handleFindRiders = (e: React.FormEvent) => {
    e.preventDefault();
    if (pickup && destination) {
      setStep(2);
    }
  };

  const handleSelectRider = (riderId: number) => {
    setSelectedRider(riderId);
    setStep(3);
  };

  const handleConfirmRide = () => {
    setStep(4);
    setRideStatus("ongoing");
  };

  const handleEndRide = () => {
    setRideStatus("completed");
  };

  const handleNewRide = () => {
    setStep(1);
    setSelectedRider(null);
    setPickup("");
    setDestination("");
  };

  const getSelectedRider = () => {
    return availableRiders.find((r) => r.id === selectedRider);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container py-6 md:py-12">
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
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                      <MapPin className="ml-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="pickup"
                        placeholder="Enter pickup address"
                        className="border-0 focus-visible:ring-0"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                      <MapPin className="ml-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="destination"
                        placeholder="Enter destination address"
                        className="border-0 focus-visible:ring-0"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                      />
                    </div>
                  </div>

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
                    <CardDescription>
                      Select vehicle type and driver
                    </CardDescription>
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
                  <Label>Vehicle Type</Label>
                  <Tabs defaultValue="sedan" onValueChange={setVehicleType}>
                    <TabsList className="grid grid-cols-4 w-full">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="sedan">Sedan</TabsTrigger>
                      <TabsTrigger value="suv">SUV</TabsTrigger>
                      <TabsTrigger value="premium">Premium</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="space-y-2">
                  <Label>Available Drivers</Label>
                  <div className="space-y-3">
                    {filteredRiders.map((rider) => (
                      <div
                        key={rider.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer"
                        onClick={() => handleSelectRider(rider.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={rider.image} alt={rider.name} />
                            <AvatarFallback>
                              {rider.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{rider.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {rider.vehicle}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{rider.price}</div>
                          <div className="text-sm text-muted-foreground">
                            {rider.eta} away
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && selectedRider && (
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

                {(() => {
                  const rider = availableRiders.find(
                    (r) => r.id === selectedRider
                  );
                  if (!rider) return null;

                  return (
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Driver Details</div>
                        <Badge variant="outline">
                          {rider.vehicleType.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={rider.image} alt={rider.name} />
                          <AvatarFallback>
                            {rider.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{rider.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {rider.vehicle}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div>Estimated arrival:</div>
                        <div className="font-medium">{rider.eta}</div>
                      </div>
                      <div className="flex justify-between">
                        <div>Total fare:</div>
                        <div className="font-medium">{rider.price}</div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
              <CardFooter>
                <Button onClick={handleConfirmRide} className="w-full">
                  Confirm Ride
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 4 && selectedRider && (
            <div className="space-y-4">
              <MapView
                pickup={pickup}
                destination={destination}
                showRoute={true}
                className="h-[200px] w-full rounded-lg overflow-hidden"
              />

              {(() => {
                const rider = getSelectedRider();
                if (!rider) return null;

                const rideInfo = {
                  id: rider.id,
                  driver: {
                    name: rider.name,
                    rating: rider.rating,
                    vehicle: rider.vehicle,
                    vehicleType: rider.vehicleType,
                    image: rider.image,
                  },
                  pickup: pickup,
                  destination: destination,
                  distance: "3.5 miles",
                  estimatedFare: rider.price,
                  eta: rideStatus === "ongoing" ? "10 min" : "0 min",
                  status: rideStatus,
                };

                return (
                  <RideInfoCard
                    role="passenger"
                    ride={rideInfo}
                    onComplete={handleEndRide}
                    onCancel={handleNewRide}
                  />
                );
              })()}

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
