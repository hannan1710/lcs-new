import React, { useState, useEffect } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const ClientTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ashish S.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjV4s4r5E6t5F5y8G7c7g7b7h7d7f7i7j7k7l7m7n7o7p7q7r7s7t7u7v7w7x7y7z=w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `Amazing service. Had a haircut and beard grooming by Imran. It was a wonderful experience, he is a perfectionist. I would highly recommend the salon.`,
      service: "Haircut & Beard Grooming",
      date: "Sep 2023",
    },
    {
      id: 2,
      name: "Rishabh K.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjX1y5z4k3j2i1h0g9f8e7d6c5b4a3a2b1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w9x8y7z6a5b4c3d2e1f0g-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `Had a great experience. The staff is very polite and professional. Loved the ambiance.`,
      service: "General Salon Service",
      date: "Oct 2023",
    },
    {
      id: 3,
      name: "Pooja V.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjXw3z2y1x0v9u8t7s6r5q4p3o2n1m0l9k8j7i6h5g4f3e2d1c0b9a8-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `Awesome service. I am happy with my hair spa and haircut. Imran has done a very good job. Very professional salon.`,
      service: "Haircut & Spa",
      date: "Nov 2023",
    },
    {
      id: 4,
      name: "Aarav P.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjXV9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a3a2-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `The ambiance is very good. The staff is professional and Nizam did a great job with my hair color. Happy with the result.`,
      service: "Hair Color",
      date: "Oct 2023",
    },
    {
      id: 5,
      name: "Anjali G.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjU5b4a3a2b1c0d9e8f7g6h5i4j3k2l1m0n9o8p7q6r5s4t3u2v1w0x9y8z7a6-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `Good service and friendly staff. The haircut was perfectly done by Imran. Highly recommended!`,
      service: "Haircut",
      date: "Nov 2023",
    },
    {
      id: 6,
      name: "Nitin J.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjV4s4r5E6t5F5y8G7c7g7b7h7d7f7i7j7k7l7m7n7o7p7q7r7s7t7u7v7w7x7y7z-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `Excellent salon. Hygienic place and very professional staff. I got a facial and it was done with utmost care.`,
      service: "Facial Treatment",
      date: "Dec 2023",
    },
    {
      id: 7,
      name: "Shruti D.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjXV9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a3a2-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `My first time here and I am very impressed. The haircut was great and the stylist was knowledgeable.`,
      service: " Haircut",
      date: "Jan 2024",
    },
    {
      id: 8,
      name: "Gautam R.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjXV9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a3a2-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `I got my hair coloured by Hashim. He is a genius! The colour turned out exactly as I wanted.`,
      service: "Hair Colouring",
      date: "Feb 2024",
    },
    {
      id: 9,
      name: "Priya S.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjU5b4a3a2b1c0d9e8f7g6h5i4j3k2l1m0n9o8p7q6r5s4t3u2v1w0x9y8z7a6-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `I had my mani-pedi done here. The staff was so gentle and professional. The salon is clean and relaxing.`,
      service: "Mani-Pedi",
      date: "Mar 2024",
    },
    {
      id: 10,
      name: "Rahul B.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjV4s4r5E6t5F5y8G7c7g7b7h7d7f7i7j7k7l7m7n7o7p7q7r7s7t7u7v7w7x7y7z-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `The best salon experience in Powai. The team, especially Imran, is excellent. He listened to my needs and delivered perfectly.`,
      service: "Styling & Grooming",
      date: "Apr 2024",
    },
    {
      id: 11,
      name: "Kavya M.",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/11",
      testimonial: `I love the hygiene of this place. The staff are so welcoming and they genuinely care about giving a good service.`,
      service: "Salon Experience",
      date: "Mar 2024",
    },
    {
      id: 12,
      name: "Manav T.",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/12",
      testimonial: `Visited the Thane branch. The service was top-notch and the atmosphere was very peaceful. My haircut was flawless.`,
      service: "Haircut",
      date: "Apr 2024",
    },
    {
      id: 13,
      name: "Sneha L.",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/13",
      testimonial: `I came for a bridal makeup trial. Shahi was very professional and patient. She listened to all my suggestions and did a fantastic job!`,
      service: "Bridal Makeup Trial",
      date: "May 2024",
    },
    {
      id: 14,
      name: "Prashant Birwadkar",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/14",
      testimonial: `Had a great experience at the salon today! The staff was extremely professional, friendly, and attentive. They took great care of hygiene, which really stood out to me. The haircut was exactly what I wanted — neat, stylish, and expertly done. Excellent service all around. Highly recommend.`,
      service: "Haircut & Grooming",
      date: "Nov 2024",
    },
    {
      id: 15,
      name: "Meenu Solanki",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/15",
      testimonial: `I had the most amazing experience here from the moment I walked in, I was greeted with warmth and genuine hospitality. The ambiance was so relaxing, clean, and beautifully designed — it truly felt like a luxurious escape.`,
      service: "Salon Experience",
      date: "Oct 2024",
    },
    {
      id: 16,
      name: "Heer V",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/16",
      testimonial: `Loved my experience at this Salon! Perfect haircut, relaxing hair spa with a soothing scalp massage, and a refreshing hair wash by Mr. Shawaz. Very professionally done. My hair feels soft, shiny, and healthy. Highly recommend!`,
      service: "Haircut & Hair Spa",
      date: "Sep 2024",
    },
    {
      id: 17,
      name: "Rohan Barve",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/17",
      testimonial: `This was probably my second visit at La Coiffure and I must admit it was yet another satisfactory one! Got trimming for my hair done by Siraj and a foot massage by Prerna since I had recently got my surgery done. Nonetheless the massage by Prerna was really nice & helpful. Felt very relaxed and pain free after. Would definitely recommend to go for it if you are suffering from leg-heel pain!`,
      service: "Hair Trimming & Foot Massage",
      date: "Aug 2024",
    },
    {
      id: 18,
      name: "Seerat Malhotra",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/18",
      testimonial: `Got my hair cut and highlights from here. I came here after hearing good reviews and was absolutely satisfied. They deliver their services with great care and quality. Thank you Siraj and team for delivering such good service. Will definitely recommend and come back!`,
      service: "Haircut & Highlights",
      date: "Jul 2024",
    },
    {
      id: 19,
      name: "Tejasweeta G",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/19",
      testimonial: `I have been visiting this salon since last 3 years and very much satisfied with the services and products they use. But more that that what kept me going back there is the person who handles my hair with at most care and does his magic every time right Mr. Siraj, if you are visiting here for any type of hair services do ask for Siraj, and then you can relax as your hair will be in safe hands and results will be way better than your expectations. They provide good services in the area.`,
      service: "Hair Services",
      date: "Jun 2024",
    },
    {
      id: 20,
      name: "Adwitiya Ray",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/20",
      testimonial: `Siraj Khan! He was so dedicated to getting my box hairstyle right, spending a full four hours on it. Not only is he a talented stylist, but he's also incredibly polite and kind. He made the entire experience comfortable and enjoyable. This was hands-down one of the best hair styling experiences I've ever had, and I will definitely be recommending him to everyone I know. an amazing stylist. Lots of thanks to him.`,
      service: "Box Hairstyle",
      date: "May 2024",
    },
    {
      id: 21,
      name: "Aunanya Collection",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/21",
      testimonial: `Prerna is amazing! I just had a facial with her, and she was absolutely wonderful. Her hand movements were so smooth and relaxing, and she was incredibly polite throughout the entire process. Everything from the cleansing and scrubbing to the massage was perfect. I highly recommend her to anyone looking for a great facial-you won't be disappointed!`,
      service: "Facial Treatment",
      date: "Apr 2024",
    },
    {
      id: 22,
      name: "Ahana Misra",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/22",
      testimonial: `Amazing, relaxing and curated services, preeti was exetremely efficient and sweet!`,
      service: "Salon Services",
      date: "Oct 2024",
    },
    {
      id: 23,
      name: "Brijraj Singh Bhati",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/23",
      testimonial: `Perfect Salon in galleria, Afsan really good at what he does. 5 stars`,
      service: "Salon Services",
      date: "Oct 2024",
    },
    {
      id: 24,
      name: "Vedant Bajoria",
      rating: 5,
      image: "http://googleusercontent.com/profile/picture/24",
      testimonial: `I wanted to change my hairstyle and i chose Nizam, who is the art director there. He gave me a new look which was great. I highly recommend him for someone who is looking to get a new hair style`,
      service: "Hair Styling",
      date: "Mar 2024",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () =>
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const currentData = testimonials[currentTestimonial];

  return (
    <section className="py-6 lg:py-10 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-2">
            What Our Clients Say
          </h2>
          <p className="text-sm lg:text-base text-muted-foreground max-w-xl mx-auto">
            Hear from our satisfied clients who experienced the La Coiffure difference.
          </p>
        </div>
        
        {/* Testimonial Card with External Navigation */}
        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Arrows - Outside (Both Mobile and Desktop) */}
          <div className="flex items-center justify-between absolute inset-0 -translate-y-1/2 top-1/2 pointer-events-none">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-500/15 text-white flex items-center justify-center hover:bg-gray-500/25 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 pointer-events-auto"
            >
              <Icon name="ChevronLeft" size={20} className="lg:w-6 lg:h-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-500/15 text-white flex items-center justify-center hover:bg-gray-500/25 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 pointer-events-auto"
            >
              <Icon name="ChevronRight" size={20} className="lg:w-6 lg:h-6" />
            </button>
          </div>

          {/* Testimonial Card */}
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="p-4 lg:p-8">
              {/* Profile Section */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-accent/20">
                  <Image
                    src={currentData?.image}
                    alt={currentData?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-semibold text-base lg:text-lg">
                    {currentData?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {currentData?.date}
                  </p>
                </div>
              </div>
              
              {/* Service above stars */}
              <p className="text-accent text-sm font-medium mb-2">
                {currentData?.service}
              </p>
              
              {/* Stars */}
              <div className="flex mb-4">
                {Array.from({ length: currentData?.rating }).map((_, index) => (
                  <Icon
                    key={index}
                    name="Star"
                    size={18}
                    className="text-accent fill-current"
                  />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <blockquote className="text-base lg:text-lg text-foreground italic leading-relaxed">
                "{currentData?.testimonial}"
              </blockquote>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;