'use client'
import { useEffect, useState } from 'react';

export default function Image() {
  const [navbarTotalHeight, setNavbarTotalHeight] = useState(0);

  useEffect(() => {
    const getNavbarTotalHeight = () => {
      const navbarContainer = document.querySelector('#main'); // NavBar를 포함하는 컨테이너의 선택자
      const navbar = document.querySelector('#navbar'); // NavBar 자체의 ID

      if (navbarContainer && navbar) {
        const containerStyle = window.getComputedStyle(navbarContainer);
        const paddingTop = parseInt(containerStyle.paddingTop, 10);
        const paddingBottom = parseInt(containerStyle.paddingBottom, 10);
        
        const rect = navbar.getBoundingClientRect();
        const navbarHeight = rect.height;

        console.log('navbar.offsetHeight : ', navbarHeight)
        console.log('paddingTop : ', paddingTop)
        console.log('paddingBottom : ', paddingBottom)

        const totalHeight = navbarHeight + paddingTop + paddingBottom;
        setNavbarTotalHeight(totalHeight);
      }
    };

    getNavbarTotalHeight();
    window.addEventListener('resize', getNavbarTotalHeight);

    return () => {
      window.removeEventListener('resize', getNavbarTotalHeight);
    };
  }, []);

  return (
    <div 
      className="bg-[url('/pexels-kuan-lu-1755181607-28104342.jpg')] bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        height: `calc(100vh - ${navbarTotalHeight}px)`,
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-8">안녕하세요, Next.js와 Tailwind CSS!</h1>
      <p className="text-lg text-gray-500 font-bold max-w-xl text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis reprehenderit quas quae voluptas veniam! Est magni molestias in id voluptatem facere harum iste enim tempora? Aliquid animi unde quasi sapiente.</p>
    </div>
  );
}