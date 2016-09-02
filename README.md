## Setup
1. Install [node.js](https://nodejs.org/en/download/)
2. In root project directory, run `npm install`
3. `npm start` to run the code
4. `npm test` to run unit tests

### My Approach
I wanted to make this as simple and easy-to-configure as possible. For the scoring structure of the depression severity levels, I went with tier-system logic. This also helped to decouple the support resources (i.e. the psychiatrists) from scores.

In regards to the UI choices for the questionnaire form page, I initially wanted to create a radio button matrix since all of the question options are the same. I ended up using a traditional multiple choice format because it's inherently more mobile-friendly.
