import { useEffect, useState } from "react";
import { supabase } from "../../services/supbase";
import toast from "react-hot-toast";
import Loading from "../../components/loading";
import NavBar from "../../components/NavBar";
const AboutUs = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const getStaff = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("staffview").select();
    if (error) {
      toast.error(error.message);
      return;
    }
    setStaff(data);
    setLoading(false);
  };
  useEffect(() => {
    getStaff();
  }, []);
  return (
    <>
      <NavBar />
      <div className="w-4/5 mx-auto my-3">
        {loading ? (
          <Loading />
        ) : (
          <div className="mt-5">
            <h1 className="md:text-lg text-base font-semibold">درباره ما</h1>
            <div className="md:text-sm text-xs tracking-normal leading-relaxed p-2 rounded-t-md my-2 flex flex-col">
              <span>
                به کتابخانه دانش خوش آمدید! ما اینجا با هدف ترویج فرهنگ مطالعه،
                دسترسی آسان به منابع علمی و ایجاد فضایی مناسب برای یادگیری و
                پژوهش، بستری پویا و به‌روز را برای علاقه‌مندان به کتاب و دانش
                فراهم کرده‌ایم.
              </span>
              <span>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
                جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. لورم
                ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
                جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </span>
              <span>
                <h4 className="font-medium">خدمات ما:</h4>
                <ul className="flex flex-col list-disc pr-4">
                  <li>
                    مجموعه‌ای گسترده از منابع: دسترسی به هزاران عنوان کتاب در
                    موضوعات مختلف علمی، ادبی، تاریخی و...
                  </li>
                  <li>
                    خدمات آنلاین: امکان ثبت نام و مدیریت حساب بدون مراجعه حضوری
                  </li>
                  <li>
                    جستجوی پیشرفته: امکان جستجو و فیلترگذاری برای یافتن سریع
                    منابع
                  </li>
                </ul>
              </span>
            </div>
            <h3 className="mt-5 mb-2 text-sm md:text-base font-medium">
              آشنایی با ما
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {staff.map((s, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 rounded-lg dark:bg-gray-900"
                >
                  <img
                    src={s.profile}
                    className="md:w-24 md:h-24  w-20 h-20 pr-2 rounded-lg "
                    alt={`${s.name}`}
                  />
                  <div className="p-5">
                    <h3 className="md:text-base text-sm font-bold tracking-tight">
                      {s.name}
                    </h3>
                    <span className="text-xs md:text-sm text-gray-700 dark:text-gray-400 py-3">
                      {s.resp}
                    </span>
                    <p className="text-xs md:text-sm text-gray-700 dark:text-gray-400">
                      {s.number}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="mt-5 mb-2 text-sm md:text-base font-medium">
              ارتباط با ما
            </h3>
            <div className="text-xs md:text-sm p-2">
              <ul className="flex flex-col">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    color="green"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-map-pin"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                  </svg>
                  آدرس: بهشهر
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    color="red"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-phone"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                  </svg>
                  تماس با ما: 0210000000
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AboutUs;
