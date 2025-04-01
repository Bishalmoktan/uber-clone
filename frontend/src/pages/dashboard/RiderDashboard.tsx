"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Car, CheckCircle, Clock, MapPin, Navigation } from "lucide-react";
import MapView from "@/components/map-view";
import RideInfoCard from "@/components/rider-info-card";
import { useUser } from "@/context/user-context";
import { useSocket } from "@/context/socket-context";

// Mock data for ride requests
const rideRequests = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      rating: 4.7,
      image: "/placeholder.svg?height=40&width=40",
    },
    pickup: "123 Main St, Downtown",
    destination: "456 Park Ave, Uptown",
    distance: "3.2 miles",
    estimatedFare: "$14.50",
    timestamp: "Just now",
  },
  {
    id: 2,
    user: {
      name: "Taylor Wilson",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
    pickup: "789 Oak Rd, Westside",
    destination: "321 Pine St, Eastside",
    distance: "5.7 miles",
    estimatedFare: "$18.75",
    timestamp: "2 min ago",
  },
  {
    id: 3,
    user: {
      name: "Jamie Smith",
      rating: 4.8,
      image: "/placeholder.svg?height=40&width=40",
    },
    pickup: "555 Beach Blvd, Seaside",
    destination: "777 Mountain View, Heights",
    distance: "8.3 miles",
    estimatedFare: "$22.30",
    timestamp: "5 min ago",
  },
];

export default function RiderDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeRide, setActiveRide] = useState<number | null>(null);
  const [completedRides, setCompletedRides] = useState<number[]>([]);
  const [tab, setTab] = useState("available");
  const [rideStatus, setRideStatus] = useState<"ongoing" | "completed">(
    "ongoing"
  );

  const { socket } = useSocket();
  const { user, userId, userType } = useUser();

  useEffect(() => {
    socket?.emit("join", {
      userId,
      userType,
    });
  }, [socket]);

  const handleAcceptRide = (rideId: number) => {
    setActiveRide(rideId);
    setRideStatus("ongoing");
    setTab("active");
  };

  const handleCompleteRide = (rideId: number) => {
    setRideStatus("completed");
    setTimeout(() => {
      setCompletedRides([...completedRides, rideId]);
      setActiveRide(null);
      setTab("available");
    }, 3000);
  };

  const getActiveRide = () => {
    return rideRequests.find((ride) => ride.id === activeRide);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container py-6 md:py-12">
        <div className="mx-auto max-w-md space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {user?.fullname?.firstname + " " + user?.fullname?.lastname}{" "}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="online-mode"
                    checked={isOnline}
                    onCheckedChange={setIsOnline}
                  />
                  <Label htmlFor="online-mode">
                    {isOnline ? (
                      <span className="flex items-center text-green-500">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Online
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-500">
                        Offline
                      </span>
                    )}
                  </Label>
                </div>
              </div>
              <CardDescription>
                {isOnline
                  ? "You're online and can receive ride requests"
                  : "Go online to start receiving ride requests"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isOnline ? (
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="available">
                      Available Requests
                    </TabsTrigger>
                    <TabsTrigger value="active">Active Ride</TabsTrigger>
                  </TabsList>
                  <TabsContent value="available" className="space-y-4 mt-4">
                    {rideRequests.filter(
                      (ride) =>
                        !completedRides.includes(ride.id) &&
                        ride.id !== activeRide
                    ).length > 0 ? (
                      rideRequests
                        .filter(
                          (ride) =>
                            !completedRides.includes(ride.id) &&
                            ride.id !== activeRide
                        )
                        .map((ride) => (
                          <Card key={ride.id}>
                            <CardContent className="p-4 space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage
                                      src={ride.user.image}
                                      alt={ride.user.name}
                                    />
                                    <AvatarFallback>
                                      {ride.user.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">
                                      {ride.user.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      Rating: {ride.user.rating}
                                    </div>
                                  </div>
                                </div>
                                <Badge variant="outline">{ride.distance}</Badge>
                              </div>

                              <MapView
                                pickup={ride.pickup}
                                destination={ride.destination}
                                showRoute={true}
                                className="h-[150px] w-full rounded-lg overflow-hidden"
                              />

                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                  <div>
                                    <div className="text-sm text-muted-foreground">
                                      Pickup
                                    </div>
                                    <div className="font-medium">
                                      {ride.pickup}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Navigation className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                  <div>
                                    <div className="text-sm text-muted-foreground">
                                      Destination
                                    </div>
                                    <div className="font-medium">
                                      {ride.destination}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-sm text-muted-foreground">
                                    Estimated fare
                                  </div>
                                  <div className="font-bold">
                                    {ride.estimatedFare}
                                  </div>
                                </div>
                                <Button
                                  onClick={() => handleAcceptRide(ride.id)}
                                >
                                  Accept Ride
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                        <h3 className="mt-4 text-lg font-medium">
                          No ride requests available
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          New ride requests will appear here. Stay online to
                          receive them.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="active" className="mt-4">
                    {activeRide ? (
                      (() => {
                        const ride = getActiveRide();
                        if (!ride) return null;

                        const rideInfo = {
                          id: ride.id,
                          user: ride.user,
                          pickup: ride.pickup,
                          destination: ride.destination,
                          distance: ride.distance,
                          estimatedFare: ride.estimatedFare,
                          eta: "12 min",
                          status: rideStatus,
                        };

                        return (
                          <div className="space-y-4">
                            <MapView
                              pickup={ride.pickup}
                              destination={ride.destination}
                              showRoute={true}
                              className="h-[200px] w-full rounded-lg overflow-hidden"
                            />

                            <RideInfoCard
                              role="driver"
                              ride={rideInfo}
                              onComplete={handleCompleteRide}
                            />

                            {rideStatus === "completed" && (
                              <Card>
                                <CardContent className="pt-6 text-center">
                                  <h3 className="text-xl font-semibold mb-2">
                                    Ride Completed
                                  </h3>
                                  <p className="text-muted-foreground mb-4">
                                    Payment has been processed
                                  </p>
                                </CardContent>
                              </Card>
                            )}
                          </div>
                        );
                      })()
                    ) : (
                      <div className="text-center py-8">
                        <Car className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                        <h3 className="mt-4 text-lg font-medium">
                          No active ride
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Accept a ride request to start driving.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-8">
                  <Car className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">You're offline</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Toggle the switch above to go online and start receiving
                    ride requests.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
