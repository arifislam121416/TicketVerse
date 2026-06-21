import Hero from "@/components/Hero";
import Statistics from "@/components/Statictice";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";


export default function Home() {
  const stats = {
    totalEvents: 50,
    totalAttendees: 50000,
    totalOrgs : 10 
  }
  return (
    <div className=" border-b p-4 border-white bg-slate-950">
     <Hero/>
     <WhyChoose/>
     <Statistics stats={stats} />
     <Testimonials/>
    </div>
  );
}
