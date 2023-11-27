const express = require("express");
const multer = require('multer')
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");

// const corsOptions = {
//   origin: [
//     "http://localhost:3000",
//     "http://localhost:3001",
//     "https://uptsolutions.vercel.app/",
//   ],
//   credentials: true,
//   optionSuccessStatus: 200,
// };

const app = express();

// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(bodyParser.json());

// //use session to enable passing cookies between different domains
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: "session",
//     cookie: {
//       maxAge: 1000 * 60 * 60,
//       sameSite: "none", //set to true if F.E. is on production
//       secure: false,
//     },
//   })
// );
// app.use(express.json({ limit: "10kb" }));

// const authRouter = require("./routes/authRoutes");
// const userRouter = require("./routes/userRoutes");


// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/user", userRouter);

const nodemailer = require('nodemailer');

const upload = multer({ dest: 'uploads/' });

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '6833a626411f41',
    pass: '8396ec5fe9d86b',
  },
})

// POST endpoint for file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Extract the file details
    const { originalname, path } = req.file;

    // Compose the email
    const mailOptions = {
      from: 'anyahasonganyi97@gmail.com',
      to: 'senatorasonganyi97@gmail.com',
      subject: 'File Upload',
      text: 'Please find the attached file.',
      attachments: [
        {
          filename: originalname,
          path: path,
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'File uploaded and emailed successfully!' });
  } catch (error) {
    console.error('Error uploading file and sending email:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

app.get("/test",async(req, res) => {
  console.log("test endpoint hit")
  res.status(200).json({message: 'You hit the test endpoint!!!!'})
})

// Start the server

module.exports = app;
