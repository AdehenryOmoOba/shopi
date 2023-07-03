let origin =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/"
    : "https://shopi-new.vercel.app/";

export default origin;
