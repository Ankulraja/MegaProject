exports.courseEnrollmentMail=(courseName, name)=>{
return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            font-family: Arial, sans-serif;
            background-color: white;
            font-size: 16px;
            color: #333333;
            margin: 0;
            padding: 0;
            line-height: 1.4;
        }
        .container{
            max-width: 600px;
            padding-top: 20px ;
            margin: 0 auto;
            text-align: center;


        }
        .logoTag{
            max-width: 200px;
            color: rgba(33, 31, 31, 0.623);
        }
        .body{
            color: #151313ed;

        }
        .name{
            font-weight: bold;
        }
        .highlight{
            font-weight: bold;

        }
        .cta{
            display: inline-block;
            text-decoration: none;
            background-color: rgba(220, 220, 18, 0.943);
            padding: 10px 20px;
            border-radius: 7px;
            margin-top: 20px;
        }
        .support{
            margin-top: 30px;
            color: #7f7c7cc5;
            font-size: 14px;

        }
    </style>

</head>

<body>
    <div class="container">
        <a class="logoTag" href="https://studynotion-edtech-project.vercel.app"><img class="logo"
                src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
        <div class="body">
            <h3>Course Registration Confirmation</h3>
            <p class="name">Dear ${name},</p>
            <p>You have successfully registered for the course <span class="highlight">"${courseName}"</span>. We
                are excited to have you as a participant!</p>
            <p>Please log in to your learning dashboard to access the course materials and start your learning journey.
            </p>
            <a class="cta" href="https://studynotion-edtech-project.vercel.app/dashboard">Go to Dashboard</a>
        </div>
        <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                href="mailto:info@studynotion.com">ankulraja2002@gmail.com</a>. We are here to help!</div>
    </div>
</body>

</html>
`
}