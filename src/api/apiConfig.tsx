const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "631f936c83477d45c37d222ab5d20f8b",
  originalImage: (imgPath: string) =>
    `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
