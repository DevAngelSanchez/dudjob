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
        'profile-model-clamp': "clamp(14px,1.25vw + 8px,14px)",
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
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '0 0 10px rgba(0, 0, 0, 0.3)',
        },
      });
    },
    function ({ addComponents }) {
      addComponents({
        '.swipe-model::before': {
          content: '""',
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '40%',
          width: '100%',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%)',
          borderBottomLeftRadius: '15px',
          borderBottomRightRadius: '15px',
        },
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
        '.paragraph-anchor-link': {
          '@apply underline text-inherit font-bold transition ease-in-out duration-200 hover:no-underline': {},
        },
        '.select-container': {
          '@apply relative': {},
        },
        '.select-default': {
          '@apply relative z-[995] cursor-pointer bg-white h-10 rounded-[5px] border border-[#ebebeb]': {},
        },
        '.select-default-button': {
          '@apply size-full py-2.5 px-5 text-left text-[#333333] pointer-events-none text-base font-semibold rounded-[5px] whitespace-nowrap text-ellipsis': {},
        },
        '.select-default-button.female': {
          '@apply text-[#fb6f92]': {},
        },
        '.select-default-button.male': {
          '@apply text-[#0082b2]': {},
        },
        '.select-wrapper': {
          '@apply flex flex-col absolute z-[994] w-full max-h-[300px] top-0 left-0 pt-11 transition duration-500 ease-in opacity-0 pb-2.5 rounded-[5px] invisible': {},
        },
        '.select-wrapper.show': {
          '@apply visible opacity-100 transition ease-in duration-200 z-[999]': {},
        },
        '.select-option': {
          '@apply flex items-center py-[5px] px-5 transition duration-100 text-[#240f24] text-base w-full opacity-0 invisible hover:bg-[#0000000d]': {},
        },
        '.select-wrapper.show .select-option': {
          '@apply opacity-100 visible': {},
        },
        '.select-option.female': {
          '@apply text-[#fb6f92]': {},
        },
        '.select-option.male': {
          '@apply text-[#0082b2]': {},
        },
        '.select-options': {
          '@apply overflow-y-auto bg-[#f7f7fe] rounded-[5px]': {},
        },
        '.swipe-cards': {
          '@apply flex justify-center h-[350px] tablet:h-[450px] relative overflow-hidden rounded-3xl': {},
        },
        '.swipeModel-cards': {
          '@apply relative size-full z-[1] flex flex-col rounded-xl max-w-[350px] tablet:max-w-[450px]': {},
        },
        '.swipeModel-selector-container': {
          '@apply flex flex-col items-center justify-center gap-5 w-full': {},
        },
        '.swipe-model': {
          '@apply cursor-pointer overflow-hidden absolute rounded-3xl inset-0 w-full h-[350px] tablet:h-[450px] m-auto bg-transparent': {},
        },
        '.swipe-model::before': {
          '@apply before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[40%] before:w-full before:bg-[linear-gradient(180deg,rgba(0,0,0,0)0%,rgba(0,0,0,0.75)100%)] before:rounded-b-[15px]': {},
        },
        '.swipe-model:nth-child(1)': {
          '@apply z-[calc(50-1)]': {},
        },
        '.swipe-model:nth-child(2)': {
          '@apply z-[calc(50-2)]': {},
        },
        '.swipe-model:nth-child(3)': {
          '@apply z-[calc(50-3)]': {},
        },
        '.swipe-model:nth-child(4)': {
          '@apply z-[calc(50-4)]': {},
        },
        '.swipe-model-card > *': {
          '@apply pointer-events-none': {},
        },
        '.swipe-model-picture': {
          '@apply absolute inset-0 -z-[1]': {},
        },
        '.swipe-model-content': {
          '@apply absolute bottom-5 left-5 p-2.5 flex flex-col gap-[50px]': {},
        },
        '.model-info': {
          '@apply flex flex-col gap-[5px]': {},
        },
        '.model-name': {
          '@apply font-bold leading-none text-white text-xl': {},
        },
        '.model-username': {
          '@apply font-medium text-white text-sm leading-none flex items-center gap-[7.5px]': {},
        },
        '.choice': {
          '@apply rounded-lg text-black border-4 z-[999] absolute top-[100px] right-4 opacity-0 py-1 px-2 text-[32px] font-bold text-shadow w-fit transition ease-in-out': {},
        },
        '.choice.nope': {
          '@apply border-[#ff6e63] text-[#ff6e63] rotate-[30deg]': {},
        },
        '.choice.like': {
          '@apply border-[#63ff68] text-[#63ff68] rotate-[-30deg] left-4': {},
        },
        '.swipe-empty': {
          '@apply cursor-grab overflow-hidden absolute inset-0 size-full flex flex-col justify-center items-center border border-[#f2f2f2] rounded-[25px]': {},
        },
        '.model-options': {
          '@apply z-[999] w-full flex bottom-0 left-0 right-0': {},
        },
        '.model-options-wrapper': {
          '@apply z-[999] flex items-center justify-center flex-col w-full py-5 px-2.5 gap-2.5': {},
        },
        '.model-option': {
          '@apply h-[50px] rounded-lg flex justify-center items-center relative p-0 gap-2.5 font-semibold cursor-pointer text-[#333333] transition duration-200 ease-in-out w-full border border-[#ebebeb] bg-white': {},
        },
        '.model-option.profile': {
          '@apply text-[#333333] w-full border border-[#ebebeb] bg-white': {},
        },
        '.model-option.pass': {
          '@apply text-white bg-[#240f24]': {},
        },
        '.model-option.like': {
          '@apply bg-[#f93969] text-white': {},
        },
        '.model-option.like-of': {
          '@apply absolute inset-0 bg-[#f93969] hidden z-[1] text-white': {},
        },
        '.swipeModel-selector-card': {
          '@apply relative w-full max-w-[300px] h-[300px] rounded-lg overflow-hidden': {},
        },
        '.swipeModel-selector-card.female': {
          '@apply place-self-end': {},
        },
        '.swipeModel-selector-card.male': {
          '@apply place-self-start': {},
        },
        '.footer-navigation': {
          '@apply flex w-full md:w-auto flex-col md:flex-row border-t md:border-t-0 border-t-[#f9f9f9] md:justify-end md:gap-[30px] flex-1': {},
        },
        '.sites-links': {
          '@apply flex flex-col gap-0 md:gap-2.5 w-full md:w-auto border-b border-[#f2f2f2] md:border-none flex-1 max-w-full md:max-w-[150px] relative': {},
        },
        '.dropdown-content': {
          '@apply flex flex-col gap-2.5 overflow-hidden md:overflow-auto max-h-0 md:max-h-none invisible md:visible': {},
        },
        '.mobileMenu-container': {
          '@apply block tablet:hidden fixed left-0 right-0 bottom-0 z-[998] w-full bg-white': {},
        },
        '.mobileMenu-wrapper': {
          '@apply h-[70px] py-0 px-5 md:px-[50px] w-full max-w-[1600px] my-0 mx-auto flex items-center justify-center': {},
        },
        '.mobileMenu-links': {
          '@apply flex flex-nowrap h-full relative z-[995] w-full': {},
        },
        '.mobileMenu-link': {
          '@apply py-[5px] px-5 min-w-[50px] flex flex-col justify-center items-center gap-[5px] flex-1': {},
        },
        '.mobileMenu-expandedLink': {
          '@apply absolute bottom-0 left-0 right-0 p-0 pb-[70px] z-[888] shadow-md': {},
        },
        '.expandedLink-content': {
          '@apply hidden bg-[#ffffff0d] backdrop-blur-sm': {},
        },
        '.expandedLink-content#link-search': {
          '@apply p-2.5 bg-[#fff5f8]': {},
        },
        '.expandedLink-content.show': {
          '@apply block': {},
        },
        '.expandedLink-items': {
          '@apply flex flex-col p-2.5 bg-white backdrop-blur-sm self-end max-h-[calc(100vh-(70px+70px))]': {},
        },
        '.expandedLink-item': {
          '@apply rounded-md flex flex-col gap-2.5': {},
        },
        '.expandedLink-item-link': {
          '@apply flex items-center justify-between transition duration-200 rounded-md border border-[#ebebeb] hover:bg-[#0000000d]': {},
        },
        '.expandedLink-item-name': {
          '@apply flex items-center gap-[5px] flex-1 py-2.5 px-[5px] text-[#2b2640]': {},
        },
        '.expandedLink-item-name span': {
          '@apply leading-none font-semibold text-[#2b2640]': {},
        },
        '.input-wrapper': {
          '@apply flex flex-col': {},
        },
        '.input-text.inline': {
          '@apply flex items-center gap-2.5 relative': {},
        },
        '.input-icon': {
          '@apply bottom-0 text-sm text-[#fb6f92] size-10 flex absolute justify-center items-center': {},
        },
        '.mobileMenu-btn-search': {
          '@apply border border-transparent rounded-lg font-semibold flex justify-center items-center text-base z-[1] transition duration-300 ease-in-out w-fit text-center gap-[7.5px] relative cursor-pointer whitespace-normal bg-[#fb6f92] text-white m-0 h-10 leading-none py-2.5 px-5 hover:shadow-md hover:brightness-110': {},
        },
        '.btn-filter-tag': {
          '@apply transition py-[6px] leading-none px-2.5 border border-[#fb6f92] rounded-md font-semibold': {},
        },
      });
    },
  ],
}
