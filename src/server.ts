import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/auth/auth.routes";
import bannersRoutes from "./routes/banners/banners.routes";
import categoriesRoutes from "./routes/categories/categories.routes";
import productsRoutes from "./routes/products/products.routes";
import cartRoutes from "./routes/cart/cart.routes";

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/banners", bannersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
