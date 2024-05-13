var splide = new Splide("#category-splide", {
  perPage: 5,
  gap: "3rem",
  padding: "0.2rem",
  pagination: false,
  breakpoints: {
    768: {
      perPage: 3,
      gap: "40px",
    },
    480: {
      perPage: 2,
      gap: "32px",
    },
  },
});

splide.mount();
