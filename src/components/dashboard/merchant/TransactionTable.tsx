
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
import { formatDistanceToNow } from "date-fns";

type TransactionStatus = "success" | "pending" | "failed";

type Transaction = {
  id: string;
  date: Date;
  amount: number;
  status: TransactionStatus;
  paymentMethod: string;
};

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: "txn_1NL9uFD2mC4jY7kF",
    date: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    amount: 49.99,
    status: "success",
    paymentMethod: "Card",
  },
  {
    id: "txn_2ML8tED1nB3kX6jE",
    date: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    amount: 129.50,
    status: "success",
    paymentMethod: "Card",
  },
  {
    id: "txn_3KM7sFC0mA2jW5iD",
    date: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    amount: 79.99,
    status: "failed",
    paymentMethod: "Card",
  },
  {
    id: "txn_4JL6rEB9lZ1iV4hC",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    amount: 199.99,
    status: "success",
    paymentMethod: "Card",
  },
  {
    id: "txn_5IK5qDA8kY0hU3gB",
    date: new Date(Date.now() - 1000 * 60 * 60 * 30), // 30 hours ago
    amount: 59.95,
    status: "pending",
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

const TransactionTable = () => {
  const [transactions] = useState<Transaction[]>(mockTransactions);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          View your latest payment transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date/Time</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">
                      {transaction.id}
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
                  <TableCell colSpan={5} className="h-24 text-center">
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

export default TransactionTable;
