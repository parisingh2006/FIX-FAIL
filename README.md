# FIX-FAIL

## Don't just mark it fixed. Prove it.

FIX-FAIL is a civic resolution verification prototype built for IBM Bobathon: Build for Bengaluru.

The system compares:

- Original problem
- Action taken
- Expected outcome
- Actual outcome

It then determines whether the civic intervention actually solved the problem.

## Result

The system produces one of two outcomes:

- FIX-VERIFIED
- FIX-FAIL

It also provides:

- Reason for the verdict
- Remaining problem
- Recommended next action

## Technology

- HTML
- CSS
- JavaScript
- JSON
- IBM watsonx Orchestrate
- IBM Bob

## IBM watsonx Orchestrate

FIX-FAIL uses an IBM watsonx Orchestrate agent named `FIX_FAIL_ANALYZER`.

The agent analyzes the provided civic intervention information and determines whether the intended outcome was achieved.

## Project Structure

```text
FIX-FAIL/
├── index.html
├── style.css
├── script.js
├── README.md
└── data/
    └── cases.json