import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co.com/fGB7yZb/b0dc8f35-3126-4eae-b575-38285553c9a4.jpg",
    title: "Join Our Mission",
    subtitle: "Be a hero by donating blood and saving lives.",
    button1Text: "Join as a Donor",
    button2Text: "Find Donors",
  },
  {
    id: 2,
    image: "https://i.ibb.co/v6z23jzq/blood-need-hero-3-ykwpzu.jpg", 
    title: "Donate Blood, Save Lives",
    subtitle: "Your one donation can save multiple lives.",
    button1Text: "Join Now",
    button2Text: "Find Donors",
  }, 
  {
    id: 3,
    image: "https://i.ibb.co/pvxDjNkv/blood-need-hero1-cadgpe.jpg", 
    title: "Bring Smile In Any One Person Face",
    subtitle: "Donate to blood contribute",
    button1Text: "Join Now",
    button2Text: "Find Donors",
  },
];

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative  w-full h-[320px] md:min-h-screen">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className=" w-full h-[320px] md:min-h-screen"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[320px] md:min-h-screen bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                  {slide.subtitle}
                </p>
                <div className="flex gap-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
                  <Link to="/register">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                      {slide.button1Text}
                    </button>
                  </Link>
                  <button
                    onClick={() => navigate('/search')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    {slide.button2Text}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
