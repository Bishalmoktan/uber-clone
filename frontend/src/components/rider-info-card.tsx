import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Navigation, Phone } from "lucide-react";

interface RideInfoCardProps {
  _id: string;
  pickup: string;
  destination: string;
  fare: number;
  vehicleType: string;
  status: "accepted" | "pending" | "completed" | "cancelled" | "ongoing";
  user: {
    _id: string;
    fullname: {
      firstname: string;
      lastname: string;
    };
    email: string;
    __v: number;
    socketId: string;
  };
  rider: {
    _id: string;
    fullname: {
      firstname: string;
      lastname: string;
    };
    email: string;
    vehicle: {
      model: string;
      plateNumber: string;
    };
    location: {
      latitude: number;
      longitude: number;
    };
  };
  __v: number;
  role: "rider" | "user";
  onComplete?: (rideId: string) => void;
}

export default function RideInfoCard({
  _id,
  pickup,
  destination,
  fare,
  user,
  rider,
  status,
  role,
  onComplete,
}: RideInfoCardProps) {
  const person = role === "rider" ? rider : user;

  if (!person) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {status === "ongoing" ? "Ongoing Ride" : "Ride Completed"}
          </CardTitle>
          <Badge variant={status === "ongoing" ? "default" : "outline"}>
            {status === "ongoing" ? "In Progress" : "Completed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={""} alt={person.fullname.firstname} />
            <AvatarFallback>
              {person.fullname.firstname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{person.fullname.firstname}</div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto rounded-full"
          >
            <Phone className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Pickup</div>
              <div className="font-medium">{pickup}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Navigation className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Destination</div>
              <div className="font-medium">{destination}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border rounded-lg p-3">
          <div>
            <div className="text-sm text-muted-foreground">Distance</div>
            <div className="font-medium">{"2.2km"}</div>
          </div>
          <div></div>
          <div>
            <div className="text-sm text-muted-foreground">Fare</div>
            <div className="font-medium">₹{fare}</div>
          </div>
        </div>
      </CardContent>
      {status === "ongoing" && (
        <CardFooter className="flex gap-2">
          {role === "rider" && onComplete && (
            <Button onClick={() => onComplete(_id)} className="flex-1">
              {"Complete Ride"}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
