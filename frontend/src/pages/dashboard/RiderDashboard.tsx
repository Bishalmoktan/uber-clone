/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Car,
  CheckCircle,
  Clock,
  Loader2Icon,
  MapPin,
  Navigation,
} from "lucide-react";
import MapView from "@/components/map-view";
import RideInfoCard from "@/components/rider-info-card";
import { useUser } from "@/context/user-context";
import { useSocket } from "@/context/socket-context";
import { api } from "@/services/authService";
import toast from "react-hot-toast";

export default function RiderDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeRide, setActiveRide] = useState<any>(null);
  const [completedRides, setCompletedRides] = useState<number[]>([]);
  const [acceptedRide, setAcceptedRide] = useState<any>([]);

  const [tab, setTab] = useState("available");
  const [rideStatus, setRideStatus] = useState<
    "ongoing" | "accepted" | "completed"
  >("ongoing");
  const [rideRequests, setRideRequests] = useState<any>([]);

  const { socket } = useSocket();
  const { user, userId, userType } = useUser();

  useEffect(() => {
    socket?.emit("join", {
      userId,
      userType,
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket?.emit("update-rider-location", {
            userId: user._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    setInterval(() => updateLocation, 10000);
    updateLocation();

    socket?.on("new-ride", (data) => {
      setRideRequests((prev) => [...prev, data]);
    });

    socket?.on("ride-started", (data) => {
      console.log(data);
      toast.success(`Ride has been started`);
      setRideStatus("ongoing");
      setActiveRide(data);
    });
  }, [socket]);

  async function acceptRide(rideId: string) {
    const response = await api.post(`/ride/confirm`, {
      rideId,
      riderId: user._id,
    });

    setAcceptedRide(response.data);

    setRideStatus("accepted");
    setTab("active");
  }

  const handleCompleteRide = async (rideId: number) => {
    const response = await api.post(`/ride/end-ride`, {
      rideId,
    });
    setRideStatus("completed");
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
                    {rideRequests ? (
                      rideRequests.map((ride: any) => (
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
                                    {ride.user.fullname.firstname.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {ride.user.fullname.firstname + " "}
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline">1.2km</Badge>
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
                                <div className="font-bold">₹{ride.fare}</div>
                              </div>
                              <Button onClick={() => acceptRide(ride._id)}>
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
                      <div className="space-y-4">
                        <MapView
                          pickup={activeRide.pickup}
                          destination={activeRide.destination}
                          showRoute={true}
                          className="h-[200px] w-full rounded-lg overflow-hidden"
                        />

                        <RideInfoCard
                          {...activeRide}
                          role="rider"
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
                    ) : rideStatus === "accepted" ? (
                      <>
                        <div
                          key={acceptedRide._id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer mt-2"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={acceptedRide.image}
                                alt={acceptedRide.user.fullname.firstname}
                              />
                              <AvatarFallback>
                                {acceptedRide.user.fullname.firstname.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {acceptedRide.user.fullname.firstname}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {acceptedRide.vehicle}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              ₹{acceptedRide.fare}
                            </div>
                            <div className="flex gap-2">
                              <Loader2Icon className="animate-spin" />
                            </div>
                          </div>
                        </div>
                      </>
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
