
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  XCircle,
  EyeIcon,
  Loader2
} from "lucide-react";

type MerchantStatus = "pending" | "approved" | "rejected";

type Merchant = {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  address: string;
  registrationDate: Date;
  status: MerchantStatus;
};

// Mock merchant data
const mockMerchants: Merchant[] = [
  {
    id: "m-123456",
    businessName: "TechHaven Store",
    contactName: "John Smith",
    email: "john@techhaven.com",
    phoneNumber: "555-1234",
    address: "123 Tech St, San Francisco, CA",
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "pending"
  },
  {
    id: "m-123457",
    businessName: "Gourmet Delights",
    contactName: "Maria Garcia",
    email: "maria@gourmetdelights.com",
    phoneNumber: "555-5678",
    address: "456 Food Ave, New York, NY",
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    status: "pending"
  },
  {
    id: "m-123458",
    businessName: "Fashion Forward",
    contactName: "Alex Johnson",
    email: "alex@fashionforward.com",
    phoneNumber: "555-9012",
    address: "789 Style Blvd, Los Angeles, CA",
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    status: "pending"
  },
  {
    id: "m-123459",
    businessName: "Fitness First",
    contactName: "Sam Taylor",
    email: "sam@fitnessfirst.com",
    phoneNumber: "555-3456",
    address: "101 Health Way, Chicago, IL",
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
    status: "pending"
  },
  {
    id: "m-123460",
    businessName: "Home Essentials",
    contactName: "Priya Patel",
    email: "priya@homeessentials.com",
    phoneNumber: "555-7890",
    address: "202 Decor St, Austin, TX",
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 hours ago
    status: "pending"
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: MerchantStatus }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const MerchantApprovalTable = () => {
  const { toast } = useToast();
  const [merchants, setMerchants] = useState<Merchant[]>(mockMerchants);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleViewDetails = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setShowDetailsDialog(true);
  };

  const handleApprove = (id: string) => {
    setIsProcessing(true);
    
    // Simulate API call for approval
    setTimeout(() => {
      setMerchants(merchants.map(merchant => 
        merchant.id === id ? { ...merchant, status: "approved" } : merchant
      ));
      
      toast({
        title: "Merchant Approved",
        description: "The merchant has been successfully approved.",
      });
      
      setIsProcessing(false);
      setShowDetailsDialog(false);
    }, 1000);
  };

  const handleReject = (id: string) => {
    setIsProcessing(true);
    
    // Simulate API call for rejection
    setTimeout(() => {
      setMerchants(merchants.map(merchant => 
        merchant.id === id ? { ...merchant, status: "rejected" } : merchant
      ));
      
      toast({
        title: "Merchant Rejected",
        description: "The merchant application has been rejected.",
      });
      
      setIsProcessing(false);
      setShowDetailsDialog(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Merchant Approvals</CardTitle>
        <CardDescription>
          Review and manage merchant account applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Contact Email</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {merchants.length > 0 ? (
                merchants.map((merchant) => (
                  <TableRow key={merchant.id}>
                    <TableCell className="font-medium">
                      {merchant.businessName}
                    </TableCell>
                    <TableCell>{merchant.email}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDistanceToNow(merchant.registrationDate, { addSuffix: true })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {merchant.registrationDate.toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={merchant.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(merchant)}
                        disabled={merchant.status !== "pending"}
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No pending merchants found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Merchant Details Dialog */}
        {selectedMerchant && (
          <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Merchant Application Details</DialogTitle>
                <DialogDescription>
                  Review merchant information before approving or rejecting
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-sm font-medium">Business Name</div>
                  <div className="col-span-2">{selectedMerchant.businessName}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-sm font-medium">Contact Name</div>
                  <div className="col-span-2">{selectedMerchant.contactName}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-sm font-medium">Email</div>
                  <div className="col-span-2">{selectedMerchant.email}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-sm font-medium">Phone</div>
                  <div className="col-span-2">{selectedMerchant.phoneNumber}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-sm font-medium">Address</div>
                  <div className="col-span-2">{selectedMerchant.address}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-sm font-medium">Registration Date</div>
                  <div className="col-span-2">
                    {selectedMerchant.registrationDate.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <DialogFooter className="sm:justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDetailsDialog(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleReject(selectedMerchant.id)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleApprove(selectedMerchant.id)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </>
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default MerchantApprovalTable;
