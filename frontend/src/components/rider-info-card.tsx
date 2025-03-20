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
  role: "passenger" | "driver";
  ride: {
    id: number;
    user?: {
      name: string;
      rating: number;
      image: string;
    };
    driver?: {
      name: string;
      rating: number;
      vehicle: string;
      vehicleType: string;
      image: string;
    };
    pickup: string;
    destination: string;
    distance: string;
    estimatedFare: string;
    eta: string;
    status: "ongoing" | "completed";
  };
  onComplete?: (rideId: number) => void;
  onCancel?: (rideId: number) => void;
}

export default function RideInfoCard({
  role,
  ride,
  onComplete,
  onCancel,
}: RideInfoCardProps) {
  const isPassenger = role === "passenger";
  const person = isPassenger ? ride.driver : ride.user;

  if (!person) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {ride.status === "ongoing" ? "Ongoing Ride" : "Ride Completed"}
          </CardTitle>
          <Badge variant={ride.status === "ongoing" ? "default" : "outline"}>
            {ride.status === "ongoing" ? "In Progress" : "Completed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={person.image} alt={person.name} />
            <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{person.name}</div>
            <div className="text-sm text-muted-foreground">
              {isPassenger
                ? `${person.name} • Rating: ${person.rating}`
                : `Rating: ${person.rating}`}
            </div>
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
              <div className="font-medium">{ride.pickup}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Navigation className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Destination</div>
              <div className="font-medium">{ride.destination}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border rounded-lg p-3">
          <div>
            <div className="text-sm text-muted-foreground">Distance</div>
            <div className="font-medium">{ride.distance}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">ETA</div>
            <div className="font-medium">{ride.eta}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Fare</div>
            <div className="font-medium">{ride.estimatedFare}</div>
          </div>
        </div>
      </CardContent>
      {ride.status === "ongoing" && (
        <CardFooter className="flex gap-2">
          {onComplete && (
            <Button onClick={() => onComplete(ride.id)} className="flex-1">
              {isPassenger ? "End Ride" : "Complete Ride"}
            </Button>
          )}
          {onCancel && (
            <Button
              variant="outline"
              onClick={() => onCancel(ride.id)}
              className="flex-1"
            >
              Cancel Ride
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
