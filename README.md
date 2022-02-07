# 🥪 InterviewToast

WE NEED SOME GIFS IN HERE OF THE POSENET STUFF!

Made by Yannis Panagis & Sam-Larsen Disney for the Hack for the [DeveloperWeek 2022 Hackathon](https://developerweek-2022-hackathon.devpost.com/)

## ⚡️ Quick Links

[Try the deployed site](https://interviewtoast.com)
[Github Repo](https://github.com/yp717/interviewtoast)
🔨 Made By:
[sld.codes](https://sld.codes/)
[yannispanagis.com](https://yannispanagis.com/)

In this hackathon, we wrote _exactly_ NUMBER lines of code and made NUMBER commits over the three weeks. We're hoping this is our new lucky number!

## Introduction

Whether you're a an applicant or an interviewer - interviews suck. Powered by AI, Interview Toast gives you everything you need to make your next interview a more positive experience. **Don't burn your next interview**.

## 🤩 What it does

InterviewToast is an interview preparation, feedback and assessment tool that ensures that at your next interview, you won't be toast.

1. **Interview Preparation Tool** There are a lot of great tools out there to help you prepare for the coding part of the application process. However, a lot of the interviews in the process to get any new job aren't just about code and there aren't a lot of tools out there specifically designed to help you with this part of the process. By leveraging [Symbl](https://symbl.ai/)'s conversation intelligence AI in our video application, InterviewToast goes beyond simple speech-to-text and provides real time insights and extracts topics of discussion, sentiment and conversation analytics such as talk-to-listen ratios.

2. **Interview Feedback Tool** By sourcing questions either directly from the candidate which they want to practice or from our extensive question bank, InterviewToast computes performance ratings and provides quantitative and qualitive feedback on practice interviews for candidates. We hope this interviews can better help them

3. **Interview Asessment Tool** Our Interview Assessment tool goes beyond the practice rooms straight into the interview battlefield. InterviewToast uses [Agora](https://agora.io) provides real-time transcriptions, key-word and profanity detection, and analysis on live interviews. Companies are under increasing pressure from regulators to provide objective feedback after being sued for not hiring candidates. For this reason, some companies to choose not to provide feedback, and others simply don't have the capacity to provide it on request. InterviewToast offers a third perspective that leverages real-time data analytics and impartial objective feedback to improve the experience for candidates and interviewers alike.

On top of this we aggregate data on the questions that interviewers ask in their interviews so that we can eventually funnel these back into our question database. This way we can make sure that canidates are practicing with the most relevant, up to date, and likely to occur questions.

## 💡 Inspiration

As web developers, we've been through a lot of tech interviews and they can be frustrating - especially when those interviews don't even have someone else on the other side! We've all paid our dues with Hackerrank and Leetcode but with little feedback and no practice alternatives, there was never a **safe space** to prepare for those recorded interviews.

WE NEED A BIT MORE CONTENT HERE!

## 🚀 How we built it

The application was built with

- [Symbl.ai](https://symbl.ai/)'s for sentiment analysis, topic extraction, conversation analytics, entity and intent recognition, and real-time insights APIs.
- [Agora](https://agora.io) for video calling
- [ReactJS](https://reactjs.org/) as the de-facto JavaScript library for building user interfaces
- [GatsbyJS](https://www.gatsbyjs.com/) as our blazing fast React framework for performance, scalability, security and accessibility
- [Gatsby Cloud Functions](https://www.gatsbyjs.com/products/cloud/functions/) to bring an entire backend to InterviewToast - without managing a backend
- [Firebase](https://firebase.google.com/) to enable user accounts, SSO,
- [TailwindCSS](https://tailwindcss.com/) to leverage the benefits and speed of the utility first CSS framework
  .

The work was distributed differently across the three weeks into four phases:

- Phase #1: Day 1 - 2
- Phase #1: Day 2 - 4
- Phase #1: Day 4 - 7

## TensorFlowJS Pose-Detection 

Conversational insights go beyond just the audio in conversations. In fact, only 7% of the interpretation of a conversation is verbal, 38% is vocal and a whopping 55% is VISUAL. To make use of this component of the practice sessions, we used the TensorflowJS Pose Detection package's state-of-the-art models for real-time pose-detection.

The MoveNet model detected up to 17 keypoints on the body and could run at 50+ fps on modern phones and laptops, without compromising the quality or speed of the video experience. From this, we could estimate the positions of both eyes and both shoulders and use some simple maths to calculate whether or not a candidate is slouching (forwards/backwards/left/right) with reasonable accuracy. 

![](https://github.com/yp717/interviewtoast/blob/master/static/posenet.png?raw=true)

The following diagram explains how we used the angles of displacement from the horizontal axis and the distances between key points from the camera to quantify slouching.

DIAGRAM TO GO HERE

## 💰 Monetisation Potential & Business Strategy

TBC

## 🧐 Challenges we ran into

TBC

## 💪 Accomplishments that we're proud of

TBC

## 🤯 What we learned

Yannis:

> “TBC”

Sam:

> “TBC”

## ✋ Limitations

TBC

## What's next for [InterviewToast](https://interviewtoast.com)

- **Stripe Integration**: We can't monetise the site without integrating a payment API! 
- **Pre-call Tests for Audio and Video**: Verify whether the internet quality is good enough for the interview.
- **Better Stats**: We love data visualisation! If we had more time we would love to include interactive charts that real drill down into the data (with D3!).
