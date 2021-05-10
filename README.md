# Coder Take-Home Challenge

Hey there, congrats on your interview so far! To assess candidates in a fair way
that best aligns with their regular development, we give a take home challenge
to let you strut your stuff in the comfort of your own development environment,
without someone looking over your shoulder.

## Directions

- 📝 Read this entire README _carefully_. It contains all the instructions and
  details necessary.
  - If you have questions or are stuck, reach out to us
- ⏲ This challenge should take about **2-3 hours**, and is limited to at most 4
  hours. Please do not spend any longer than the alloted time on this task.
- 💻 Extract the project from the archive (.zip) and add your implementation
- (Optional): You may mark core goals as complete as you go
- (Optional): Add any extraneous notes regarding the implementation or any
  decisions you made within the provided [Notes.txt](./Notes.txt)
- 📧 Upon completion, Create an archive (.zip) of your project and send it to us

## Project Overview

What we have here is the skeleton of a basic chat application. In `src/server`,
we have an Express server that provides both a REST interface for sending
messages, and a Websocket interface for receiving new messages in real time. You
shouldn't need to edit anything in here, but reading the code may help you
understand the app better.

For the frontend, we have a React app in `src/client`. The project has been
setup for you using a few libraries and conventions that are core to our stack,
but the chat app hasn't been fully implemented yet. Using the API provided for
you in `src/client/lib/api`, you will need to create some components that have a
user specify a username, and then enter the chat.

### What We're Using on the Frontend

In order to assess how developers would handle being dropped into our stack,
we've setup this take-home using a few libraries and conventions that we use.
**You're not expected to be completely familiar with all of them**, but this
should give you an idea of how we write code, and assess your ability to adapt
and conform to new stacks.

- [TypeScript](https://www.typescriptlang.org/) - TypeScript requires you to
  write your JavaScript a little differently by typing your variables and
  functions. All JavaScript at Coder is compiled via TypeScript.
- [React Hooks](https://reactjs.org/docs/hooks-intro.html) - We prefer
  functional components with hooks, resorting only to class components for very
  specific scenarios.
- [JSS Styling](https://cssinjs.org/) - We have switched from Sass styling to
  using JSS, which is somewhat similar to other CSS-in-JS solutions, but shares
  a lot more in its structure with Sass.

Please try to use the project as configured, and don't worry too much about
minor mistakes due to unfamiliarity being held against you.

### Additional Libraries

Don't hesitate to add additional libraries. If you do add any additional
libraries, please explain why, the value they add, and why you chose that
particular library.

### Structure

Work from the existing structure as a base; the application shouldn't be
re-written from the ground-up or undergo a major structural overhaul. Minor
alterations to the structure such as new organizational units are OK and
encouraged.

## Core Goals

- [ ] Code: Requirements are completed within the existing codebase
- [ ] Code: Successfully compiles without errors (compile time or run time)
- [ ] Code: Clear, concise and adheres to engineering principles
- [ ] UX: Wireframes are implemented (at a minimum)
- [ ] UX: Basic styling is added such that the application is usable
- [ ] UX: Server errors that arise from regular user interaction are handled,
      ideally informing the user of the errors (ex: going offline, messages
      failing to send)
- [ ] UX: Client-side validation
  - Messages must be between 1 and 200 characters
  - Usernames must be between 3 and 20 characters
  - Usernames may only contain alphanumeric characters, hyphens (`-`) and
    underscores (`_`). No other characters should be permitted.
  - The user should be informed when their input is invalid

## Stretch Goals

If you finish with some time to spare and want to add a little flair, you could
implement any of the following:

- User persistence between sessions
- HTML5 notifications
- API rate limiting to prevent spamming the chat
- Animations or any other creative styling
- Custom feature of your own choosing (Be sure to describe it to us!)

### Design

A core aspect of this evaluation is meeting the minimum criteria in the
[wireframes](./wires.pdf). Changes to improve the UI interface styling are
encouraged and welcomed as long as the core app functions as expected. Should
you improve upon the design and/or implement stretch goals, remain mindful of
the **overall user experience**.

## Getting Started

**You'll want to get started in `App.tsx`**, remove the sample code, and create
new smaller components from there.

### Development System Requirements

The following need to be installed in your development environment:

- Node 10+ (check with `node --version`)
- NPM 6+ (check with `npm --version`)

### Running the project

- `npm install` to get all of the dependencies
- `npm start` to run the API and webpack servers

A webpage should open up for you automatically. Hot module replacement is
configured, so just save your code and changes should show up!

## Tips

- DO: Focus on code implementation
- DO: Focus on user experience
- DO: Focus on executing the core goals first and foremost
- DO: Ask questions if you have any. It's a good thing to ask questions!
- DON'T: Host the app on a server or worry about production builds. This
  challenge will _only_ be evaluated in development.
