module.exports = {
  content: [
    './*.html',
    './js/**/*.js',
    './css/**/*.css',
  ],
  theme: {
    extend: {
      fontSize: {
        'title-not-found-clamp': "clamp(20px, 1.25vw + 8px, 24px)",
        'main-title-clamp': "clamp(24px, 1.25vw + 8px, 32px)",
        'ranking-model-name-clamp': "clamp(24px, 1.25vw + 8px, 24px)",
        'p-clamp': "clamp(16px, 1.25vw + 8px, 16px)",
        'h2-clamp': "clamp(20px, 1.25vw + 8px, 24px)",
        'h3-ranking-model-clamp': "clamp(16px, 1.25vw + 8px, 24px)",
        'username-ranking-model-clamp': "clamp(14px, 1.25vw + 8px, 16px)",
      },
      backgroundImage: {
        'country-card-info-linear-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%)',
      },
      screens: {
        'small-mobile': '520px', // Nuevo breakpoint para pantallas pequeñas
        'tablet': '992px', // Nuevo breakpoint para pantallas tablet
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.filter-link-active': {
          '@apply bg-[#fb6f92] text-white': {},
        },
        '.pagination-btn-active': {
          '@apply bg-[#ffb3c6] text-black': {},
        },
        '.btn-not-found': {
          '@apply flex items-center justify-center gap-2 w-fit rounded-md outline-none duration-300 transition relative z-[1] font-semibold bg-black text-white py-2 px-5 h-10 hover:shadow-sm shadow-black/5 hover:brightness-110': {},
        },
        '.place-item': {
          '@apply text-xs p-[5px] leading-none rounded-md font-bold flex items-center gap-[5px] uppercase border-[3px] border-transparent': {},
        },
        '.place-1': {
          '@apply bg-[#ffc847] text-[#240f24] shadow-lg shadow-[#ffc84766]': {},
        },
        '.place-2': {
          '@apply bg-[#cccccc] text-black shadow-lg shadow-[#cccccc66]': {},
        },
        '.place-3': {
          '@apply bg-[#EDB25E] text-black shadow-lg shadow-[#EDB25E66]': {},
        },
        '.place-more': {
          '@apply bg-[#ffb3c6] text-black shadow-lg shadow-[#ffb3c666]': {},
        },
        '.btn-ranking-model-of-link': {
          '@apply flex items-center justify-center gap-[7.5px] h-11 rounded-md font-semibold bg-[#05aae8] text-white whitespace-nowrap py-0 px-5 text-p-clamp w-full small-mobile:w-auto flex-[unset] small-mobile:flex-1': {},
        },
        '.btn-ranking-model-free-trial-link': {
          '@apply flex items-center justify-center gap-[7.5px] h-11 rounded-md font-semibold bg-[#ffb72b80] text-[#333333] whitespace-nowrap py-0 px-5 text-p-clamp w-full small-mobile:w-auto flex-[unset] small-mobile:flex-1 transition duration-200 ease-in-out hover:bg-[#ffb72b]': {},
        },
      });
    },
  ],
}
