
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { CreditCard, ShieldCheck, ChevronsRight, BarChart3, RefreshCcw, Globe } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    document.title = "SkyPay - Merchant Payment Processing";
  }, []);

  // Redirect to appropriate dashboard if already logged in
  const getDashboardLink = () => {
    if (!user) return "/signup";
    
    if (user.role === "admin") return "/admin";
    
    return "/dashboard";
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SP</span>
            </div>
            <span className="text-xl font-bold">SkyPay</span>
          </div>
          
          <nav className="hidden gap-6 md:flex">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Pricing
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            {user ? (
              <Link to={getDashboardLink()}>
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary">
                  Login
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                  Secure Payment Processing for Your Business
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  SkyPay makes it easy to accept payments online. Sign up today and start processing payments within minutes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/signup">
                  <Button className="gap-1">
                    Get Started <ChevronsRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-muted p-2">
                <div className="bg-white rounded-lg shadow-xl p-6 border absolute top-8 right-8 w-[280px] animate-fade-in">
                  <div className="space-y-2">
                    <h3 className="font-medium">Payment Processing</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Successful Transactions</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full w-[92%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-xl p-6 border absolute bottom-8 left-8 w-[280px] animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Simple Integration</h3>
                      <p className="text-sm text-muted-foreground">Connect with our API in minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SkyPay provides all the tools you need to accept payments and manage your business.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4 text-primary">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium">Secure Payments</h3>
              <p className="text-center text-sm text-muted-foreground">
                Industry-standard security protocols to keep your transactions safe and secure.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4 text-primary">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium">Detailed Analytics</h3>
              <p className="text-center text-sm text-muted-foreground">
                Track your sales, monitor transactions, and gain insights into your business.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4 text-primary">
                <RefreshCcw className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium">Quick Settlements</h3>
              <p className="text-center text-sm text-muted-foreground">
                Fast and reliable fund settlements to help you manage cash flow efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                No hidden fees. Just pay for what you use.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-sm items-start gap-8 py-12 md:max-w-none md:grid-cols-2 lg:gap-12">
            <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Standard Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Perfect for small to medium businesses.
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-baseline gap-1 text-3xl font-bold">
                  2.9%
                  <span className="text-sm font-normal text-muted-foreground">+ $0.30 per transaction</span>
                </div>
                <p className="text-sm text-muted-foreground">No monthly fee</p>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Standard API access</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>24/7 support</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>2-day settlements</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link to="/signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Enterprise Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Custom solutions for larger businesses.
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-baseline gap-1 text-3xl font-bold">
                  Custom Pricing
                </div>
                <p className="text-sm text-muted-foreground">Tailored to your needs</p>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Enhanced API access with higher limits</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Advanced analytics and reporting</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Next-day settlements</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SP</span>
              </div>
              <span className="text-lg font-bold">SkyPay</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Simple, secure payment processing for businesses.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row md:items-center">
            <a href="#" className="text-sm hover:underline">
              Terms of Service
            </a>
            <span className="hidden sm:inline-block">·</span>
            <a href="#" className="text-sm hover:underline">
              Privacy Policy
            </a>
            <span className="hidden sm:inline-block">·</span>
            <a href="#" className="text-sm hover:underline">
              Contact Us
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Website</span>
            </a>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
            <p className="text-center text-sm text-muted-foreground">
              © 2025 SkyPay. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
