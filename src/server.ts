import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth/auth.routes";
import bannersRoutes from "./routes/banners/banners.routes";
import categoriesRoutes from "./routes/categories/categories.routes";
import productsRoutes from "./routes/products/products.routes";
import cartRoutes from "./routes/cart/cart.routes";
import ordersRoutes from "./routes/orders/orders.routes";

const app: Application = express();

// Middleware para parsing JSON
app.use(express.json());

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Rota de health check
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "It's working!",
  });
});

// Rotas da API
app.use("/api/auth", authRoutes);
app.use("/api/banners", bannersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);

// Para desenvolvimento local
const PORT = process.env.PORT || 3333;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
