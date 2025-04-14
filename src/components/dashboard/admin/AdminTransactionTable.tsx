
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Search } from "lucide-react";

type TransactionStatus = "success" | "pending" | "failed";

type Transaction = {
  id: string;
  merchantId: string;
  merchantName: string;
  date: Date;
  amount: number;
  status: TransactionStatus;
  paymentMethod: string;
};

// Mock transaction data for admin view
const mockTransactions: Transaction[] = [
  {
    id: "txn_1NL9uFD2mC4jY7kF",
    merchantId: "m-123456",
    merchantName: "TechHaven Store",
    date: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    amount: 49.99,
    status: "success",
    paymentMethod: "Card",
  },
  {
    id: "txn_2ML8tED1nB3kX6jE",
    merchantId: "m-123457",
    merchantName: "Gourmet Delights",
    date: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    amount: 129.50,
    status: "success",
    paymentMethod: "Card",
  },
  {
    id: "txn_3KM7sFC0mA2jW5iD",
    merchantId: "m-123456",
    merchantName: "TechHaven Store",
    date: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    amount: 79.99,
    status: "failed",
    paymentMethod: "Card",
  },
  {
    id: "txn_4JL6rEB9lZ1iV4hC",
    merchantId: "m-123458",
    merchantName: "Fashion Forward",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    amount: 199.99,
    status: "success",
    paymentMethod: "Card",
  },
  {
    id: "txn_5IK5qDA8kY0hU3gB",
    merchantId: "m-123459",
    merchantName: "Fitness First",
    date: new Date(Date.now() - 1000 * 60 * 60 * 30), // 30 hours ago
    amount: 59.95,
    status: "pending",
    paymentMethod: "Card",
  },
  {
    id: "txn_6HJ4pCZ7jX9gT2fA",
    merchantId: "m-123460",
    merchantName: "Home Essentials",
    date: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 hours ago
    amount: 149.95,
    status: "success",
    paymentMethod: "Card",
  },
  {
    id: "txn_7GI3oBY6iW8fS1eZ",
    merchantId: "m-123456",
    merchantName: "TechHaven Store",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 48 hours ago
    amount: 299.99,
    status: "success",
    paymentMethod: "Card",
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: TransactionStatus }) => {
  const badgeClasses = {
    success: "badge-success",
    pending: "badge-pending",
    failed: "badge-failed",
  };

  return (
    <span className={badgeClasses[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const AdminTransactionTable = () => {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Handle search
  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) {
      setFilteredTransactions(transactions);
      return;
    }

    const filtered = transactions.filter(
      transaction => 
        transaction.id.toLowerCase().includes(query) ||
        transaction.merchantId.toLowerCase().includes(query) ||
        transaction.merchantName.toLowerCase().includes(query)
    );
    
    setFilteredTransactions(filtered);
  };

  // Reset search
  const resetSearch = () => {
    setSearchQuery("");
    setFilteredTransactions(transactions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Overview</CardTitle>
        <CardDescription>
          Monitor payment transactions across all merchants
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by transaction ID or merchant ID..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
          {searchQuery && (
            <Button variant="ghost" onClick={resetSearch}>
              Clear
            </Button>
          )}
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Date/Time</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">
                      {transaction.id}
                    </TableCell>
                    <TableCell>
                      <div>{transaction.merchantName}</div>
                      <div className="text-xs text-muted-foreground">
                        {transaction.merchantId}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDistanceToNow(transaction.date, { addSuffix: true })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {transaction.date.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={transaction.status} />
                    </TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminTransactionTable;
