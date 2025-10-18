declare module 'owl.carousel' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const owlCarousel: any;
  export = owlCarousel;
}

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jQuery: any;
}

interface JQuery {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  owlCarousel(options?: any): JQuery;
}
