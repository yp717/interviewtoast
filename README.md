# 🥪 InterviewToast

Made by Yannis Panagis & Sam-Larsen Disney for the Hack for the [DeveloperWeek 2022 Hackathon](https://developerweek-2022-hackathon.devpost.com/)

## ⚡️ Quick Links:

[Try the deployed site](https://interviewtoast.com)
[Github Repo](https://github.com/yp717/interviewtoast)
🔨 Made By:
[sld.codes](https://sld.codes/)
[yannispanagis.com](https://yannispanagis.com/)

In this hackathon, we wrote _exactly_ NUMBER lines of code and made NUMBER commits over the three weeks. We're hoping this is our new lucky number!

## Introduction

The internet is responsible for nearly 3.7% of all global CO2 emissions. [1] This means that the internet produces more CO2 than every country on earth except the US and China. Further, in 2015 it was estimated that the internet produced approximately 600 million tonnes of CO2 a year. [2] BCG estimates that the internet produces almost 1 billion tonnes of greenhouse gases each year. [5] While these different sources vary in their estimates, the environmental impact of the internet still parallels that of plastic, as the production and incineration of plastic is responsible for 850 million tonnes of greenhouse gases in the atmosphere. Unfortunately, it is not held to the same standards or put under the same scrutiny that countries are as we move toward achieving the United Nation's 2025 Sustainability Goals. We can do a lot better.

The cloud where we store our data has a physical presence in thousands of data centres around the world. These data centres consume as more electricity and emit more CO2 than the airline industry. [3] There are currently 4.66 billion active internet users worldwide, which is approximately 59.5% [4] of the global population. This number is growing every day and consequently so is the carbon footprint the internet has on our planet. In this next phase of development, we must be conscious of the environmental impact of our browsing and take both small and large steps as individuals and cooperations toward a sustainable future.

All of this has led us to our problem statement:
**How do we improve awareness and tackle the growing environmental impact of our internet usage?**

## 🤩 What it does

DigitalFootprint.earth is a trifecta of tools that:

1. **Brings the impact you have when using the internet to life through interactive storytelling using maps to help us understand our human impact!** Using mathematics and ESRI's mapping technology, we can estimate and visualize the CO2 produced when you navigate to any given webpage. ESRI's ArcGIS API takes seemingly meaningless data and translates it into a tangible story that shows how serious the impact of the internet can be on our planet.

2. **Helps you reduce the impact your site has on the enviroment.** We investigate a site's hosting, CDN, performance and size to suggest mechanisms for improvement. Our research during this hack found that the steps we need to take toward making the internet greener are simple and awareness is the biggest challenge.

3. **Provides a way to audit, rank and aggregate web pages to create a new standard for a greener web.** Via our web application or API, developers can consistently monitor their site's performance, CDN response time, and other request metadata via our scoring system.

Our custom designed score can be displayed as a badge on a webpage to demonstrate to a site's visitors that the developers are holding themselves accountable to ensuring that their site is as green as it can be.

All of the performance audits are run from the same server. This means that while the carbon value may not be truly representative due to the limitations in our analysis based on the time constraints of a hack, the error between audits of sites is systematic and consistent.

## 💡 Inspiration

As web developers, we care deeply about the web and we wanted to make this hack about a sustainable future personal. While playing around with lighthouse to improve our personal websites, we realised far more data was transfered when the page loaded than we thought. Each visit was sending ~4mb of data. This might not sound like alot, but if you have a large quantity of site traffic, megabytes can quickly turn in to gigabytes. Every byte sent requires energy, which in turn produces CO2 and other greenhouse gases. But it isn't just us building and visiting sites - there are billions of people and pages on the web. It was then that we came to the realisation that, somehow, the tool that we love most ~the internet~ was doing a lot of damage to our planet. This led us to ask the question - how can we fix this?!

## 🚀 How we built it

The application was built with ESRI's ArcGIS APIs, Gatsby, Firebase, TailwindCSS, ExpressJS, NodeJS, and ReactJS.

ArcGIS services we made use of: 3D Map Scenes, Custom Feature Layers, Servicing Area API, (we attempted the Routing API too but had some hiccups!).

The work was distributed differently across the three weeks into four phases:

- Phase #1: Day 1 - 5
  - Project ideation (lots of post-it notes here!)
  - Project boilerplate
  - Research into mathematical basis for project
- Phase #2: Day 6 - 10
  - Initial map visualization
  - Data integration
  - User Testing
- Phase #3: Day 11 - 15
  - Iteration on map visualization complexity
  - Database setup
  - Audit caching
  - Server side badge generation
  - User Testing
  - Story Refinement
- Phase #4: Day 16 - 21
  - Data aggregation and statistics
  - Demo video preparation
  - Documentation cleanup

## 💰 Monetisation Potential & Business Strategy

The primary objective of digitalfootprint.earth is not to make money, but instead to raise awareness and educate the general public about how their internet activity contributes to one of the biggest challenges of this generation. **However**, while working on our suite of tools we realised that there was a potential monetisation strategy:

We currently cache audits to reduce strain on our servers and speed up our application to improve user experience. Developers may find that they would like to audit their site more frequently than our caching mechanisim allow. We could provide a membership that allows individuals and/or organisations to refresh cached scores on our API more frequently, leading to a more accurate reading.

## 🧐 Challenges we ran into

- _Working with a brand new API_: ArcGis was new to both of us. Some parts of the API such as the service areas proved to be particularly tricky to get our heads around.
- _ArcGIS + Gatsby_: We ❤️ GatsbyJS and wanted to use it as our front-end framework. The SSR that it utilised did not play nicely with the ArcGis Map, we ended up having to lazy load it in. We tried to use some simple animation (framer-motion) to help it load in gracefull.
- _Generating badges on the server_: We had a very hard time generating badges on the server without a DOM. Constructing the html and dynamically udpating it based on the parameters we received in a request was tricky. We ended up creating an embeddable script that developers could add to their site that creates the badge on their end.
- _Caching_: We didnt want the user to have to wait for audits we had recently computed so we spent a while setting up caching and cache invalidation. Semaphore logic was a little rusty - havent touched it since uni!
- _Data sourcing_: While there were many technical challenges over the last three weeks, collecting data to substantiate our claims, insights and findings and to integrate into our tools was one of the biggest challenges.

## 💪 Accomplishments that we're proud of

Over the past three weeks we've turned an idea we thought to be impossible into a product we could actually use and potentially even monetise, while also using technology to work toward a sustainable future. We worked with new APIs

## 🤯 What we learned

Yannis:

> “When we trying to dynamically set the zoom to different areas of the map, we quickly realised it was a lot more complicated than it seemed. By linearly interpolating from the area we wanted to show as a ratio to the radius of the earth, we could infer the zoom parameter. We had to make a lot of mathematical assumptions to get a working prototype during this hack, and including the sources close to those values in the code saved us a lot of time as we iterated. I'm used to documenting things from a high level in the README, but in this project keeping some documentation close to the code proved to be invaluable! I was also shocked to learn how serious the CO2 produced by a website could be when we used the ArcGIS API to draw the service areas and compare it to car journeys...blew my mind 🤯”

Sam:

> “We knew early on that our audits were going to be slow. This worried me alot as the user experience was something we both cared about. We had the realisation that most people would probably be searching for the same sites. By caching the audit results, only the first user would experience a wait time, for every visitor after that searched for the same site the load would be near-instant. Caching and cache-invalidation was new to me - a handy skill to pick up!”

## ✋ Limitations

- Audit time is currently slow, around 20 seconds.
- All performance audits are run from the same server. This means that while the carbon value may not be truly representative due to the limitations in our analysis based on the time constraints of a hack, the error between audits of sites is systematic and consistent.
- Lack of data access: we would have liked to get more precise information as to whether or not a specific server location has a Renewable Energy Certificate (REC). This would have allowed us to more accurately geo-locate the biggest culprits of environmental damage in the network. We had to make significant assumptions to simplify our analysis because we could not get access to this data.

CDN services recognised:

- Cloudflare
- Akamai
- Fastly
- AWS (Partial)
- Azure (Partial)
- Google (Partial)

We hope to expand this list in the future. We have handled the case in the story where we couldn't identify a CDN.

## What's next for [digitalfootprint.earth](https://digitalfootprint.earth)

Although this hackathon took place over three weeks, there were still a lot of features that we would have loved to implement that we did not have time for. The following is a list of some of the extensions we would like to implement next:

- Improving the accuracy of CDN locations: the datasets we could find with the locations of CDNs from different hosting providers was notably incomplete. A more complete dataset would help to give a more complete picture of the scale of this issue.
- Tracing the green efficiency of specific CDN locations: this data was very difficult to source and we could not get access to whether or not a specific CDN
- Improving the speed of an audit: An audit for any given webpage takes ~20 seconds, ideally we want to get this much smaller.
- Improve the complexity of the analysis used to generate our scores to form more accurate comparisons.

## 🎉 BONUS: What else can I do today to reduce my digital footprint on the web?

If you don't host your own site, that doesn't mean that there's nothing you can do to help reduce your carbon footprint through your internet usage. Here's a short list of some other small steps you can take that can go a long way toward helping our planet:

- _Keep your hardware longer_: the devices you access the internet through, whether its your laptop, phone or tablet have a heavy environmental footprint both through their manufacturing processes, day-to-day use and disposal.
- _Delete your old emails_: storing large amounts of data can also increase your digital footprints. Deleting those emails you haven't looked at or used for years can go a long way toward reducing the impact you have on the environment
- _Unsubscribe_: Email subscriptions and mailing lists produce a lot of CO2. Unsubscribing from the email lists that you don't read instead of letting them pile up in your inbox is another quick step you can take to be a greener citizen of the internet

❤️ We hope you like this hack submission. We had great fun making it.

## Citations

- [1] [BBC. Why your internet habits are not as clean as you think](https://www.bbc.com/future/article/20200305-why-your-internet-habits-are-not-as-clean-as-you-think#:~:text=The%20carbon%20footprint%20of%20our,a%20researcher%20at%20Lancaster%20University)
- [2] [WWF. Plastic waste and climate change whats the connection?](https://www.wwf.org.au/news/blogs/plastic-waste-and-climate-change-whats-the-connection#gs.az5w7t)
- [3] [Digiplex. Factories of the digital Age](https://digiplex.com/insights/factories-of-the-digital-age/)
- [4] [Statista. Digital population worldwide](https://www.statista.com/statistics/617136/digital-population-worldwide/#:~:text=How%20many%20people%20use%20the,the%20internet%20via%20mobile%20devices)
- [5] [BBC Science Focus. Citation of the Boston Consulting Group (BCG)](https://www.sciencefocus.com/science/what-is-the-carbon-footprint-of-the-internet/)
