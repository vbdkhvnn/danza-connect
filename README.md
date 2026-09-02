# Campus Connect

Build a high-fidelity, functional mobile-first prototype for a student social and campus engagement app currently called DAnza.

Product Vision

DAnza is an independent, unofficial social platform for De Anza College students.

The problem we are trying to solve is that community college can feel socially disconnected. Students come to class and leave campus, clubs and events can be difficult to discover, weekly club meeting times are scattered across Instagram, Discord, websites, flyers, and word of mouth, and students often have difficulty finding classmates or other students who want to study or hang out.

The goal of DAnza is to become the central social hub for De Anza students.

A student should be able to open one app and immediately know:

What is happening on campus today

Which clubs are meeting

What events are coming up

What announcements clubs have posted

Whether anyone created a study group for one of their courses

What other students are doing

Who may want to study, eat, play sports, attend an event, or hang out

What opportunities around campus they may otherwise have missed

This should feel like a social app students actually want to open, not a college administration portal.

PLATFORM

The final product is intended to become a real application available on:

iOS App Store

Google Play Store

The production version will likely use:

React Native

Expo

TypeScript

Supabase

PostgreSQL

For this Lovable version, create a high-quality interactive mobile prototype.

If Lovable outputs a web application, make it extremely mobile-first and structure the components cleanly so the design and logic can later be recreated in React Native.

Design primarily around a modern smartphone viewport approximately 390 × 844.

Do not make the application look like a desktop website squeezed onto a phone.

BRANDING

Working name:

DAnza

The capitalization matters.

It should visually read as:

DAnza

NOT:

DANZA

The "DA" references De Anza while allowing the product to have its own identity.

The application is unofficial.

Include subtle wording somewhere appropriate such as:

Independent student-built platform for the De Anza community. Not affiliated with or endorsed by De Anza College.

Do not copy the official De Anza College logo.

We can create our own visual identity.

VISUAL DIRECTION

The app should feel:

Clean

Modern

Social

Youthful

Friendly

Slightly playful

Premium

Minimal

Easy to scan

Native-mobile feeling

It should NOT feel:

Corporate

Like a university administration portal

Like LinkedIn

Like a generic SaaS dashboard

Overdesigned

Full of gradients everywhere

Full of unnecessary cards

Like an obvious AI-generated interface

Childish

Extremely colorful

Overcrowded

Take visual inspiration from modern consumer/social apps such as:

Instagram

Partiful

BeReal

Airbnb

Apple

modern campus/community apps

Use plenty of whitespace.

Avoid putting every piece of information inside a bordered card.

Use visual hierarchy, spacing, typography, imagery, avatars, subtle separators, and selective cards.

COLORS

Use a De Anza-inspired color palette without making the app appear officially operated by De Anza College.

Primary:

Deep burgundy / maroon

Secondary:

Warm cream / off-white

Accent:

Muted gold

Supporting colors can be used selectively for club categories, study subjects, avatars, event imagery, and status indicators.

The majority of screens should remain light and clean.

Do not make every component burgundy and gold.

Use the school-inspired colors mainly for:

Active navigation

Important buttons

Headings

Selected states

Branding

Small accents

MAIN NAVIGATION

Use five primary bottom navigation tabs:

Home

Clubs

Study

Social

Profile

The navigation should remain extremely simple and instantly understandable.

1. HOME

The Home screen should answer:

What's happening at De Anza that is relevant to me?

Possible structure:

Greeting

Example:

Good morning, Maya

Small personalized message underneath.

Today

Show important things happening today.

Examples:

MSA Weekly Meeting

Club Fair

Cultural event

MATH 1D study group

Basketball meetup

Show:

time

location

organization

event image where useful

Upcoming

Upcoming campus events and club events.

Study Groups For You

Automatically show study groups connected to courses the student is currently taking.

Example:

MATH 1D Midterm Study Session
Today • 5:00 PM
Library
4 / 8 joined

Join button.

Recent Announcements

Examples:

Club meeting location changed

Tutoring available this week

New club event announced

Home should be personalized rather than showing everything on campus.

2. CLUBS

Create a central directory containing De Anza clubs.

Students should no longer need to search through many different websites, Instagram accounts, Discord servers, or flyers to figure out what clubs exist.

Club discovery

Include:

Search

Categories

Featured clubs

Clubs the student follows

Explore all clubs

Possible categories:

Academic

Cultural

Religious

Technology

Career

Arts

Sports

Social

Volunteer / Service

Political / Advocacy

Other

Club Profile

Each club gets its own page.

Include:

Club name

Club image/logo

Short description

Follow button

Member/follower count

Instagram

Discord

Email/contact information when available

Most importantly:

Weekly Meeting

Example:

Every Tuesday
1:30 PM – 2:30 PM
Room L-47

This should be highly visible because solving the difficulty of finding weekly club meeting information is one of the main goals of the app.

Upcoming Events

Club officers can post upcoming events.

Announcements

Examples:

Today's meeting moved to another room

No meeting this week

Applications opened

Free food at today's event

Students following the club can receive notifications.

CLUB OFFICER ACCOUNTS

Students can be assigned as approved officers of a club.

Club officers should be able to:

Edit club description

Update weekly meeting information

Create events

Edit events

Cancel events

Post announcements

Add social links

View basic club analytics

An account can simultaneously be:

Student + Club Officer

Do not create completely separate account systems.

3. STUDY

This is one of the most important sections.

Students choose the courses they are currently taking each quarter.

Example:

MATH 1D

PHYS 4B

CIS 22B

ENGL 1A

The Study tab should automatically prioritize groups matching those courses.

My Courses

Show the student's current courses near the top.

Allow editing courses.

Study Groups For You

Example:

MATH 1D

Midterm Study Session
Today • 5:00 PM
Library
4 / 8 students

[Join]

Another:

PHYS 4B Homework Session
Tomorrow • 2:00 PM
6 / 10 students

[Join]

Create Study Group

Students should be able to create their own group.

Fields:

Course

Group name

Description

Date

Start time

Approximate end time

Location

Maximum participants

In person / online / hybrid

Campus locations should eventually use predefined De Anza locations where possible.

Example:

Library
Main Quad
Hinson Campus Center
etc.

Students taking the selected course should be able to receive a notification that a new study group has opened.

QUARTER SYSTEM

Courses must be connected to academic quarters.

Example:

Fall 2026
Winter 2027
Spring 2027
Summer 2027

When a new quarter begins:

Previous course selections should be archived.

The student should be prompted to select their new courses.

Do NOT permanently delete historical course information.

We want to preserve historical anonymized information for future analytics.

4. SOCIAL

The Social area should make DAnza feel like a real student community rather than simply an events application.

Version 1 should remain relatively simple.

Create a campus feed where students can make posts.

Examples:

"Anyone want to grab coffee after class?"

"Anyone playing basketball today?"

"Looking for people taking MATH 1D who want to study."

"Anyone going to the cultural festival?"

"Who wants to grab food after class?"

Possible feed filters:

For You

Following

Recent

Posts can support:

Text

Optional photo

Likes

Comments

Save

User profile

Timestamp

Keep the interaction system lightweight.

Do NOT make the feed visually complicated.

STUDENT PROFILES

Student profiles should feel casual and social.

Include:

Profile photo

First name

Optional username

Major

Optional year

Short bio

Interests

Current courses

Clubs

Posts

Saved events

Possible interests:

Coding

Basketball

Gaming

Coffee

Photography

Hiking

Music

Art

Cars

Fitness

Movies

Food

etc.

Profiles should help students discover others with similar interests without making the application feel like a dating app.

EVENTS

Create an event system shared by clubs and the campus feed.

Events contain:

Title

Description

Host

Category

Image

Date

Start time

End time

Location

Capacity where relevant

RSVP

Save

Share

Students should be able to select:

Going

or

Interested

Events should appear throughout the product where relevant.

NOTIFICATIONS

Notifications are a major part of the product.

Examples:

Club

"MSA meets in 1 hour."

"Programming Club posted a new event."

"Today's meeting has moved to L-47."

Study

"A new MATH 1D study group was created."

"Your study group begins in one hour."

"Three new students joined your group."

Events

"The event you saved starts tomorrow."

Social

"Someone commented on your post."

"Someone followed you."

Users should eventually be able to customize which notifications they receive.

SEARCH

Eventually create universal search capable of returning:

Clubs

Courses

Events

Study groups

Students

Example search:

"physics"

Results:

PHYS 4A
PHYS 4B
Physics Club
PHYS 4B Homework Group

AUTHENTICATION AND ONBOARDING

Create a very short onboarding flow.

Possible flow:

Welcome
↓
Create account
↓
Verify student email
↓
Create profile
↓
Select major
↓
Select current courses
↓
Select interests
↓
Select a few clubs
↓
Home

Do not ask for excessive information.

The onboarding experience should take only a few minutes.

Student verification should eventually use an appropriate De Anza / FHDA student email domain.

Make the allowed domain configurable rather than permanently hardcoding something without verification.

Include:

Sign up

Log in

Email verification

Forgot password

Reset password

Logout

Delete account

ADMIN SYSTEM

Eventually there should be an admin role.

Admins can:

Approve club officer access

Manage clubs

Manage academic quarters

Manage course directory

Review reported content

Suspend accounts

Remove content

Manage safety issues

Do not expose admin functionality in the normal student navigation.

SAFETY AND MODERATION

Because this contains user-generated content, architecture should support:

Report post

Report user

Report event

Report study group

Block user

Remove content

Suspend user

Community guidelines

Direct messaging and private parties are NOT priorities for Version 1.

We may add them later after appropriate privacy, moderation, age, and safety systems exist.

ANALYTICS

Analytics is a core part of this project.

The application should be designed from the beginning to generate useful, privacy-conscious campus engagement data.

Create an analytics event architecture.

Possible tracked events:

app_opened

club_viewed

club_followed

club_unfollowed

event_viewed

event_saved

event_rsvped

study_group_viewed

study_group_created

study_group_joined

study_group_left

course_added

search_performed

social_post_created

notification_opened

Events should include appropriate properties such as:

anonymous/internal user ID

timestamp

relevant club ID

relevant event ID

relevant course ID

relevant study group ID

source screen

Do not collect unnecessary sensitive data.

We eventually want to analyze:

Most active clubs

Most viewed clubs

Event popularity

RSVP conversion

Event discovery patterns

Best event days

Best event times

Study group demand by course

Study group demand by department

Average study group size

Study group creation trends

Student retention

Weekly active users

Monthly active users

Feature usage

Campus engagement trends

Notification effectiveness

Cohort behavior

Eventually this dataset may be analyzed using:

SQL

Python

pandas

statistical analysis

visualization

experimentation

recommendation systems

Do NOT build machine learning yet.

Just make sure the product architecture will support it later.

PRIVACY

Follow a data-minimization approach.

Collect what is useful for the product.

Avoid collecting unnecessary sensitive information such as:

CWID/student identification number

Home address

Continuous precise GPS location

Phone contacts

Private message content for analytics

Anything unrelated to the product

Users should eventually have:

Privacy settings

Blocking controls

Account deletion

Data deletion controls

INITIAL MVP

The initial functional product should focus on:

Accounts

Signup

Login

Verification

Profile

Interests

Current courses

Clubs

Club directory

Search clubs

Club profile

Follow club

Weekly meeting information

Club events

Announcements

Events

Browse

View

RSVP

Save

Reminders

Study

Select courses

Browse matching study groups

Create study group

Join group

Leave group

Home

Today's activity

Upcoming events

Relevant study groups

Announcements

Social

Basic campus feed

Text/photo posts

Likes/comments

Notifications

Club reminders

Study notifications

Event reminders

Basic social activity

Analytics

Core event tracking

DO NOT PRIORITIZE YET

Do not spend significant development time on:

Dating features

Swiping

Private parties

Direct messaging

Live GPS

Complex recommendation algorithms

Machine learning

AI assistants

Complex friend matching

Large group-chat systems

Those can be future features.

The first priority is making clubs, events, study groups, and campus discovery extremely useful.

EXPERIENCE WE WANT

A student should be able to open DAnza between classes and within approximately 10 seconds see:

"MSA meets at 1:30 today."

"There is a MATH 1D study session at 5."

"The Club Fair is happening today."

"Someone wants to play basketball at 4."

"Programming Club has an event Friday."

That immediate usefulness is the heart of the product.

PRODUCT PRINCIPLE

DAnza should combine:

Utility + Community + Discovery + Data

Utility:
Help students find information they currently struggle to find.

Community:
Make it easier for students to connect.

Discovery:
Help students find events, clubs, study groups, and people they otherwise would never discover.

Data:
Use privacy-conscious behavioral analytics to understand campus engagement and continually improve the platform.

FIRST TASK

Do NOT attempt to fully implement every feature immediately.

First create a polished, interactive mobile prototype using realistic mock data.

Build the main screens:

Welcome / Login

Onboarding

Home

Clubs

Club Profile

Event Details

Study

Study Group Details

Create Study Group

Social Feed

Student Profile

Notifications

Settings

Make all navigation between these screens functional.

Use realistic De Anza-style examples but do not falsely imply any organizations have officially joined the platform.

Focus heavily on the design quality and user experience first.

Before expanding functionality, give me a complete clickable prototype so I can evaluate the navigation, visual style, information hierarchy, and overall feel of the product.

Do not redesign the concept into a generic productivity dashboard.

This should feel like a consumer social app built specifically around the everyday social experience of a community college student.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0f350aa7-1b91-4c80-83b4-44e9b2466994).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
