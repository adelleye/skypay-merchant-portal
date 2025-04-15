
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Mail, Phone, MapPin } from "lucide-react";

const AccountInfoCard = () => {
  const { user } = useAuth();
  
  // Safely cast the user to MerchantUser type
  const merchantUser = user?.role === "merchant" ? user : null;
  
  if (!merchantUser) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>
          Your business profile and contact details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Building className="h-4 w-4" />
                <span>Business Name</span>
              </div>
              <p className="mt-1">{merchantUser.businessName}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </div>
              <p className="mt-1">{merchantUser.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>Phone Number</span>
              </div>
              <p className="mt-1">{merchantUser.phoneNumber}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Business Type</span>
              </div>
              <p className="mt-1">
                {merchantUser.isRegisteredWithCAC === "yes" ? "CAC Registered Business" : "Non-Registered Business"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfoCard;
