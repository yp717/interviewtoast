# 🥪 InterviewToast

Made by Yannis Panagis & Sam-Larsen Disney for the Hack for the [DeveloperWeek 2022 Hackathon](https://developerweek-2022-hackathon.devpost.com/)

## ⚡️ Quick Links:

- [Try the site](https://interviewtoast.com) (Best if you try with a friend!)
- [Github Repo](https://github.com/yp717/interviewtoast)

🔨 Made By:
- [yannispanagis.com](https://yannispanagis.com/)
- [sld.codes](https://sld.codes/)

In this hackathon, we wrote _exactly_ 3628 lines of code and made 146 commits over the three weeks. We're hoping this is our new lucky number!

## Introduction

Whether you're a an applicant or an interviewer - interviews suck. Powered by AI, Interview Toast gives you everything you need to make your next interview a more positive experience. **Don't burn your next interview**.

## 🤩 What it does

InterviewToast is an interview preparation, feedback and assessment tool that ensures that at your next interview, you won't be toast.

1. **Interview Preparation Tool** There are a lot of great tools out there to help you prepare for the coding part of the application process. However, a lot of the interviews in the process to get any new job aren't just about code and there aren't a lot of tools out there specifically designed to help you with this part of the process. By leveraging [Symbl](https://symbl.ai/)'s conversation intelligence AI in our video application, InterviewToast goes beyond simple speech-to-text and provides real time insights and extracts topics of discussion, sentiment and conversation analytics such as talk-to-listen ratios.

2. **Interview Feedback Tool** By sourcing questions either directly from the candidate which they want to practice or from our extensive question bank, InterviewToast computes performance ratings and provides quantitative and qualitive feedback on practice interviews for candidates. We hope this can better help them practice to be their best for the real thing.

3. **Interview Asessment Tool** Our Interview Assessment tool goes beyond the practice rooms straight into the interview battlefield. InterviewToast uses [Agora](https://agora.io) provides real-time transcriptions, key-word and profanity detection, and analysis on live interviews. Companies are under increasing pressure from regulators to provide objective feedback after being sued for not hiring candidates. For this reason, some companies to choose not to provide feedback, and others simply don't have the capacity to provide it on request. InterviewToast offers a third perspective that leverages real-time data analytics and impartial objective feedback to improve the experience for candidates and interviewers alike.

On top of this we aggregate data on the questions that interviewers ask in their interviews so that we can eventually funnel these back into our question database. This way we can make sure that canidates are practicing with the most relevant, up to date, and likely to occur questions.

## 💡 Inspiration

As web developers, we've been through a lot of tech interviews and they can be frustrating - especially when those interviews don't even have someone else on the other side! We've all paid our dues with Hackerrank and Leetcode but with little feedback and no practice alternatives, there was never a **safe space** to prepare for those recorded interviews.


## 🚀 How we built it

The application was built with

- [Symbl.ai](https://symbl.ai/)'s for sentiment analysis, topic extraction, conversation analytics, entity and intent recognition, and real-time insights APIs.
- [Agora](https://agora.io) for video calling
- [ReactJS](https://reactjs.org/) as the de-facto JavaScript library for building user interfaces
- [GatsbyJS](https://www.gatsbyjs.com/) as our blazing fast React framework for performance, scalability, security and accessibility
- [Gatsby Cloud Functions](https://www.gatsbyjs.com/products/cloud/functions/) to bring an entire backend to InterviewToast - without managing a backend
- [Firebase](https://firebase.google.com/) to enable user accounts, SSO,
- [TailwindCSS](https://tailwindcss.com/) to leverage the benefits and speed of the utility first CSS framework.

The work was distributed differently across the three weeks into four phases:

- Day 1 - 3: Planning 
  - Project ideation (lots of post-it notes here!)
  - Project Boilerplate
  - Research into Agora and Symbl Documentation and Usage
- Day 3 - 10: Build 
  - Database setup
  - Symbl & Agora Implemented
  - Serverless Function Integration
  - Authentication
  - MVP Completed
- Day 10 - 12: Testing 
  - User Testing
  - Improved MVP on feedback
- Day 12 - 14: Presentation & Submission
  - Demo video preparation
  - Documentation cleanup

## TensorFlowJS Pose-Detection 

Conversational insights go beyond just the audio in conversations. In fact, only 7% of the interpretation of a conversation is verbal, 38% is vocal and a whopping 55% is VISUAL. To make use of this component of the practice sessions, we used the TensorflowJS Pose Detection package's state-of-the-art models for real-time pose-detection.

The MoveNet model detected up to 17 keypoints on the body and could run at 50+ fps on modern phones and laptops, without compromising the quality or speed of the video experience. From this, we could estimate the positions of both eyes and both shoulders and use some simple maths to calculate whether or not a candidate is slouching (forwards/backwards/left/right) with reasonable accuracy. 

![Yannis doing PoseNet](https://ik.imagekit.io/sld/posenet_7TKTXAGDv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1644276452905)

The following diagram explains how we used the angles of displacement from the horizontal axis and the distances between key points from the camera to quantify slouching.

![Yannis Math](https://ik.imagekit.io/sld/diagram_etUz7N6nZKn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1644276451972)

## 💰 Monetisation Potential & Business Strategy

Our monetisation strategy is a tier-based subscription model inspired by basecamps flat pricing business model. This starts with a free tier that gives you full access to all features because we think this resource should be available to everyone.

## 🧐 Challenges we ran into

- *Working with a brand new API*: Agora & Symbl were new to both of us. Some parts of the APIs such as the WebRTC proved to be particularly tricky to get our heads around.
- *Agora + Gatsby*: We ❤️ GatsbyJS and wanted to use it as our front-end framework. The SSR that it utilised did not play nicely with the Agora API, we ended up having to lazy load it in.
- *Slouch Detection with TensorFlow*: We had to create a mathmatical equation for detecting slouch. 
- *Disabling media devices on stream end*: We struggled for ages trying to get the camera to turn off after the stream had ended. No matter what command we tried on the client (`.stop()` or `.close()`), the green light wouldn't go off.
- *Disabling/enabling video mid stream*: Another very difficult feature was giving the ability for participants to mute or turn off video during the stream. Understanding how Agora handles published steams took some late nights.

## 💪 Accomplishments that we're proud of

Over the past two weeks we've turned an idea we thought to be impossible into a product we could actually use and potentially even monetise, while also using technology to work towards a better interview process. 

## 🤯 What we learned

Yannis:

> “I've never worked with WebRTC and TensorflowJS before. Coming from electrical engineering to front end, it felt like two worlds met with machine learning and JavaScript. Video calling online always felt like a complete mystery technically. Getting the opportunity to work with WebRTC and learn about what it can do with video calls and real time communication channels was really fun and I'm looking forward to building projects with it again!”

Sam:

> “WebRTC is something that scared me, up until now I have been avoiding it. This hackathon gave me a chance to face that fear. While I am sure that our WebRTC integration is not perfect, I have learnt how to implement it and, now feeling a little more confident, I can't wait to work with it again.”

## ✋ Limitations

- The platform currently only supports one candidate and one interviewer in a meeting.
- Posture recognition only occurs on practise interviews on not on live sessions.
- We wanted to use the summary API but it was unfortunately not available for use outside of async. Looking forward to it being out of beta!

## What's next for [InterviewToast](https://interviewtoast.com)

Although this hackathon took place over two weeks, there were still a lot of features that we would have loved to implement that we did not have time for. The following is a list of some of the extensions we would like to implement next:

- **Stripe Integration**: We can't monetise the site without integrating a payment API! 
- **Pre-call Tests for Audio and Video**: Verify whether the internet quality is good enough for the interview.
- **Better Stats**: We love data visualisation! If we had more time we would love to include interactive charts that real drill down into the data (with D3!).
