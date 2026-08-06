import { ArchiveBoxIcon, BoltIcon, BuildingStorefrontIcon, TruckIcon } from "@heroicons/react/24/outline";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
const services = [
  [TruckIcon, "Full Truck Load (FTL)", "Dedicated vehicles for large shipments that need dependable point-to-point movement."],
  [ArchiveBoxIcon, "Part Truck Load (PTL)", "Cost-effective shared transport for mid-size cargo across Kerala."],
  [BoltIcon, "Express Delivery", "Time-sensitive logistics when your delivery simply cannot wait."],
  [BuildingStorefrontIcon, "Warehouse & Distribution", "Safe storage and efficient distribution support for your growing business."],
];
export default function ServicesSection() { return <section id="services" className="section"><SectionTitle eyebrow="Our services" title="One reliable partner for every shipment." copy="Flexible logistics services shaped around the size, speed, and destination of your cargo." /><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(([icon, title, copy]) => <ServiceCard icon={icon} title={title} copy={copy} key={title} />)}</div></section>; }
