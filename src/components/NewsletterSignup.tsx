import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Bell, Star, Briefcase } from "lucide-react";

export function NewsletterSignup() {
  const features = [
    { icon: Bell, text: "Get instant job alerts" },
    { icon: Star, text: "Early access to VIP positions" },
    { icon: Briefcase, text: "Weekly career tips" },
  ];
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Get Job Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </CardContent>
      <div className="px-6 pb-6 grid grid-cols-3 gap-4">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <feature.icon className="w-4 h-4 text-primary" />
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
