import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CurrentReadings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Blood Pressure</CardTitle>
        <CardDescription>Current Readings</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-2xl font-extrabold text-primary">120/80 mmHg</p>
      </CardContent>
      <CardFooter>
        <CardDescription>Current Readings</CardDescription>
      </CardFooter>
    </Card>
  );
}
