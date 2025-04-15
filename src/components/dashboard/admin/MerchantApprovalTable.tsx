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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  XCircle,
  EyeIcon,
  Loader2,
  User,
  Building2,
  CreditCard,
  FileText
} from "lucide-react";

type MerchantStatus = "pending" | "approved" | "rejected";

type Merchant = {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  isRegisteredWithCAC: string;
  ownerFirstName: string;
  ownerLastName: string;
  bvn: string;
  idType?: string;
  idNumber?: string;
  idDocumentUrl?: string;
  personalBankAccount?: string;
  personalBankName?: string;
  cacNumber?: string;
  directorName?: string;
  directorBVN?: string;
  businessBankAccount?: string;
  businessBankName?: string;
  registrationDate: Date;
  status: MerchantStatus;
};

const mockMerchants: Merchant[] = [
  {
    id: "m-123456",
    businessName: "TechHaven Store",
    contactName: "John Smith",
    email: "john@techhaven.com",
    phoneNumber: "555-1234",
    isRegisteredWithCAC: "yes",
    ownerFirstName: "John",
    ownerLastName: "Smith",
    bvn: "12345678901",
    cacNumber: "RC123456",
    directorName: "John Smith",
    directorBVN: "12345678901",
    businessBankAccount: "1234567890",
    businessBankName: "First Bank",
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: "pending"
  },
  {
    id: "m-123457",
    businessName: "Gourmet Delights",
    contactName: "Maria Garcia",
    email: "maria@gourmetdelights.com",
    phoneNumber: "555-5678",
    isRegisteredWithCAC: "no",
    ownerFirstName: "Maria",
    ownerLastName: "Garcia",
    bvn: "23456789012",
    idType: "nin",
    idNumber: "2345678901",
    idDocumentUrl: "/placeholder.svg",
    personalBankAccount: "2345678901",
    personalBankName: "GTBank",
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 5),
    status: "pending"
  },
  {
    id: "m-123458",
    businessName: "Fashion Forward",
    contactName: "Alex Johnson",
    email: "alex@fashionforward.com",
    phoneNumber: "555-9012",
    isRegisteredWithCAC: "yes",
    ownerFirstName: "Alex",
    ownerLastName: "Johnson",
    bvn: "34567890123",
    cacNumber: "RC789012",
    directorName: "Alex Johnson",
    directorBVN: "34567890123",
    businessBankAccount: "3456789012",
    businessBankName: "Access Bank",
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 12),
    status: "pending"
  },
  {
    id: "m-123459",
    businessName: "Fitness First",
    contactName: "Sam Taylor",
    email: "sam@fitnessfirst.com",
    phoneNumber: "555-3456",
    isRegisteredWithCAC: "no",
    ownerFirstName: "Sam",
    ownerLastName: "Taylor",
    bvn: "45678901234",
    idType: "drivers_license",
    idNumber: "DL4567890",
    idDocumentUrl: "/placeholder.svg",
    personalBankAccount: "4567890123",
    personalBankName: "Zenith Bank",
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: "pending"
  },
  {
    id: "m-123460",
    businessName: "Home Essentials",
    contactName: "Priya Patel",
    email: "priya@homeessentials.com",
    phoneNumber: "555-7890",
    isRegisteredWithCAC: "yes",
    ownerFirstName: "Priya",
    ownerLastName: "Patel",
    bvn: "56789012345",
    cacNumber: "RC345678",
    directorName: "Raj Patel",
    directorBVN: "67890123456",
    businessBankAccount: "5678901234",
    businessBankName: "UBA",
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 36),
    status: "pending"
  }
];

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
                        className="text-[#FF4E00] hover:text-[#FF4E00] hover:bg-orange-50"
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
        
        {selectedMerchant && (
          <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Merchant Application Details</DialogTitle>
                <DialogDescription>
                  Review merchant information before approving or rejecting
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="business">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="business">
                    <Building2 className="h-4 w-4 mr-1" />
                    Business
                  </TabsTrigger>
                  <TabsTrigger value="contact">
                    <User className="h-4 w-4 mr-1" />
                    Contact
                  </TabsTrigger>
                  <TabsTrigger value="banking">
                    <CreditCard className="h-4 w-4 mr-1" />
                    Banking
                  </TabsTrigger>
                  <TabsTrigger value="documents">
                    <FileText className="h-4 w-4 mr-1" />
                    Documents
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="business" className="space-y-4 py-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium">Business Name</div>
                    <div className="col-span-2">{selectedMerchant.businessName}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium">Phone Number</div>
                    <div className="col-span-2">{selectedMerchant.phoneNumber}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium">CAC Registered</div>
                    <div className="col-span-2">
                      {selectedMerchant.isRegisteredWithCAC === "yes" ? "Yes" : "No"}
                    </div>
                  </div>
                  {selectedMerchant.isRegisteredWithCAC === "yes" && (
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-sm font-medium">CAC Number</div>
                      <div className="col-span-2">{selectedMerchant.cacNumber}</div>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium">Registration Date</div>
                    <div className="col-span-2">
                      {selectedMerchant.registrationDate.toLocaleString()}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="contact" className="space-y-4 py-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium">Owner First Name</div>
                    <div className="col-span-2">{selectedMerchant.ownerFirstName}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium">Owner Last Name</div>
                    <div className="col-span-2">{selectedMerchant.ownerLastName}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium">Email</div>
                    <div className="col-span-2">{selectedMerchant.email}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-medium">BVN</div>
                    <div className="col-span-2">{selectedMerchant.bvn}</div>
                  </div>
                  {selectedMerchant.isRegisteredWithCAC === "yes" && (
                    <>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">Director Name</div>
                        <div className="col-span-2">{selectedMerchant.directorName}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">Director BVN</div>
                        <div className="col-span-2">{selectedMerchant.directorBVN}</div>
                      </div>
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="banking" className="space-y-4 py-2">
                  {selectedMerchant.isRegisteredWithCAC === "yes" ? (
                    <>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">Business Bank Account</div>
                        <div className="col-span-2">{selectedMerchant.businessBankAccount}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">Business Bank Name</div>
                        <div className="col-span-2">{selectedMerchant.businessBankName}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">Personal Bank Account</div>
                        <div className="col-span-2">{selectedMerchant.personalBankAccount}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">Personal Bank Name</div>
                        <div className="col-span-2">{selectedMerchant.personalBankName}</div>
                      </div>
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4 py-2">
                  {selectedMerchant.isRegisteredWithCAC === "no" && (
                    <>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">ID Type</div>
                        <div className="col-span-2">
                          {selectedMerchant.idType?.toUpperCase()}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">ID Number</div>
                        <div className="col-span-2">{selectedMerchant.idNumber}</div>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="text-sm font-medium">ID Document</div>
                        <div className="border rounded-md p-2 mt-1">
                          <img 
                            src={selectedMerchant.idDocumentUrl || "/placeholder.svg"} 
                            alt="ID Document"
                            className="max-h-40 mx-auto object-contain"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {selectedMerchant.isRegisteredWithCAC === "yes" && (
                    <div className="text-center py-4 text-muted-foreground">
                      CAC registration details provided. No additional documents required.
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
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
                    className="bg-[#FF4E00] hover:bg-[#E04400]"
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
