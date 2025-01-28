import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Navigation } from "./ui/navigation";
import { Footer } from "./ui/footer";
import {
  Building2,
  Users,
  Plane,
  MapPin,
  DollarSign,
  Star,
} from "lucide-react";

interface AirlineProfileProps {
  name?: string;
  logo?: string;
  headquarters?: string;
  fleetSize?: number;
  crewCount?: number;
  yearFounded?: number;
  baseLocations?: string[];
  averageSalary?: string;
  hiringProcess?: string[];
  requirements?: string[];
  benefits?: string[];
  reviews?: Array<{
    rating: number;
    comment: string;
    author: string;
    position: string;
    date: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

const AIRLINES_DATA: Record<string, AirlineProfileProps> = {
  "virgin-atlantic": {
    name: "Virgin Atlantic",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=VA",
    headquarters: "Crawley, United Kingdom",
    fleetSize: 37,
    crewCount: 5500,
    yearFounded: 1984,
    baseLocations: ["London Heathrow", "London Gatwick", "Manchester"],
    averageSalary: "£25,000 - £35,000",
    hiringProcess: [
      "Online Application",
      "Video Interview",
      "Assessment Day",
      "Final Interview",
      "Medical Check",
    ],
    requirements: [
      "Minimum age of 18",
      "Height between 5'2\" and 6'3\"",
      "Able to swim 25m unaided",
      "Right to work in the UK",
      "Fluent in English",
      "No visible tattoos while in uniform",
    ],
    benefits: [
      "Competitive salary",
      "Free flights and discounted travel",
      "Private healthcare",
      "Life insurance",
      "Pension scheme",
      "Staff travel benefits for friends and family",
    ],
    reviews: [
      {
        rating: 4,
        comment:
          "Great company culture and amazing travel benefits. Work-life balance can be challenging during peak seasons.",
        author: "Sarah J.",
        position: "Senior Cabin Crew",
        date: "2024-02-15",
      },
    ],
    faqs: [
      {
        question: "What is the minimum experience required?",
        answer:
          "No prior experience is required for entry-level positions, but customer service experience is preferred.",
      },
    ],
  },
  emirates: {
    name: "Emirates",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=EM",
    headquarters: "Dubai, UAE",
    fleetSize: 262,
    crewCount: 21000,
    yearFounded: 1985,
    baseLocations: ["Dubai International"],
    averageSalary: "$36,000 - $48,000",
    hiringProcess: [
      "Online Application",
      "Online Assessment",
      "Video Interview",
      "Assessment Day in Dubai",
      "Final Interview",
      "Medical Check",
    ],
    requirements: [
      "Minimum age of 21",
      "Arm reach of 212 cm while standing on tiptoes",
      "Minimum height of 160 cm",
      "High school diploma",
      "Fluent in English (written and spoken)",
      "No visible tattoos while in uniform",
    ],
    benefits: [
      "Tax-free salary",
      "Free accommodation in Dubai",
      "Transport to/from work",
      "Medical coverage",
      "Concessional travel benefits",
      "30 days annual leave",
    ],
    reviews: [
      {
        rating: 4,
        comment:
          "Excellent benefits and opportunity to see the world. Training is world-class and very thorough.",
        author: "Mohammed A.",
        position: "Cabin Crew",
        date: "2024-03-01",
      },
    ],
    faqs: [
      {
        question: "Do I need to be based in Dubai?",
        answer:
          "Yes, all Emirates cabin crew must be based in Dubai, UAE. The company provides accommodation.",
      },
    ],
  },
};

const AirlineProfile = () => {
  const { slug } = useParams();
  const airlineData =
    AIRLINES_DATA[slug || ""] || AIRLINES_DATA["virgin-atlantic"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-start gap-6 mb-8">
          <img
            src={airlineData.logo}
            alt={`${airlineData.name} logo`}
            className="w-32 h-32 rounded-lg shadow-lg ring-2 ring-sky-100"
          />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{airlineData.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-5 h-5" />
              <span>{airlineData.headquarters}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {airlineData.baseLocations?.map((base) => (
                <Badge key={base} variant="secondary">
                  <MapPin className="w-4 h-4 mr-1" />
                  {base}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 [&>*]:bg-gradient-to-br [&>*]:from-white [&>*]:to-sky-50 [&>*]:shadow-md [&>*]:transition-all [&>*]:duration-300 [&>*]:hover:shadow-lg">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">
                    {airlineData.fleetSize}
                  </div>
                  <div className="text-muted-foreground">Aircraft</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">
                    {airlineData.crewCount?.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground">Cabin Crew</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">
                    {airlineData.averageSalary}
                  </div>
                  <div className="text-muted-foreground">Avg. Salary</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">
                    {airlineData.yearFounded}
                  </div>
                  <div className="text-muted-foreground">Est. Year</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-sky-50 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="hiring">Hiring Process</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">
                  About {airlineData.name}
                </h2>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  {airlineData.name} is one of the world's leading airlines,
                  known for its exceptional service and commitment to customer
                  satisfaction. With a fleet of {airlineData.fleetSize} aircraft
                  and over {airlineData.crewCount?.toLocaleString()} cabin crew
                  members, we operate flights to destinations worldwide.
                </p>
                <h3>Benefits</h3>
                <ul>
                  {airlineData.benefits?.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Requirements</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {airlineData.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hiring" className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Hiring Process</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {airlineData.hiringProcess?.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-none">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">{step}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            {airlineData.reviews?.map((review, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {review.comment}
                      </p>
                      <div className="text-sm">
                        <span className="font-semibold">{review.author}</span> •{" "}
                        <span className="text-muted-foreground">
                          {review.position}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="faqs" className="space-y-6">
            {airlineData.faqs?.map((faq, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AirlineProfile;
