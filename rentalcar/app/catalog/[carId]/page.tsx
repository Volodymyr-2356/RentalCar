import { Suspense } from "react";
import CarDetailsClient from "./CarDetailsClient";

interface CarDetailsPageProps {
  params: Promise<{
    carId: string;
  }>;
}

export default function CarDetailsPage({ params }: CarDetailsPageProps) {
  return (
    <Suspense fallback={<p>Loading car details...</p>}>
      <CarDetailsContent params={params} />
    </Suspense>
  );
}

async function CarDetailsContent({ params }: CarDetailsPageProps) {
  const { carId } = await params;

  return <CarDetailsClient carId={carId} />;
}
