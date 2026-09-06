import express from 'express'
import dns from 'dns'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import healthCheckRouter from './routes/healthcheck.routes.js'
import authRouter from './routes/auth.routes.js'
dns.setServers(['1.1.1.1', '8.8.8.8']);
const app = express();

// basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// cors configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://locahost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);


app.use('/api/v1/healthcheck', healthCheckRouter);
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/instagram', (req, res) => {
  res.send('Hello I m on instagram!')
})

app.use((err, req, res, next) => {
  console.log("We are in error handler: ", err.message);
  res.status(err.statusCode).json(err);
})

export default app;