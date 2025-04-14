
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";

const ApiKeySection = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock API Key
  const apiKey = "sk_live_51NL9uFD2mC4jY7kFHg6wGGsBz8DLfY";

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    });
  };

  const regenerateKey = () => {
    setIsLoading(true);
    
    // Simulate API call for key regeneration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "API Key Regenerated",
        description: "A new API key has been generated for your account.",
      });
    }, 1000);
  };
  
  const displayedKey = isVisible 
    ? apiKey 
    : apiKey.substring(0, 4) + "•".repeat(apiKey.length - 8) + apiKey.substring(apiKey.length - 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>
          Use this API key to integrate SkyPay into your application and process payments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded border bg-muted/30 p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Live API Key</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-muted-foreground"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <><EyeOff className="h-3.5 w-3.5 mr-1" /> Hide</>
                ) : (
                  <><Eye className="h-3.5 w-3.5 mr-1" /> Show</>
                )}
              </Button>
            </div>
            
            <div className="flex">
              <Input 
                readOnly
                value={displayedKey}
                className="font-mono text-sm bg-background border-r-0 rounded-r-none"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="rounded-l-none border-l-0"
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
            
            <p className="text-[13px] text-muted-foreground">
              Keep this key secure. Don't share it in public repositories or client-side code.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={regenerateKey}
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Regenerate API Key
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeySection;
