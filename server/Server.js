import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-track", async (req, res) => {

    const {
        username,
        grossMonthly,
        takeHomePay,
        totalFixedCosts,
        moneyLeft,
        fixedCosts,
        answers
    } = req.body;

    // BUILD THE PROMPT
    const prompt = `
You are a South African financial planning assistant helping a young professional build a personalised 5-year financial roadmap.

Here is their financial situation:
- Name: ${username}
- Gross monthly income: R${grossMonthly}
- Net take-home pay: R${takeHomePay}
- Total fixed costs per month: R${totalFixedCosts}
- Money left after fixed costs: R${moneyLeft}
- Fixed costs breakdown: ${JSON.stringify(fixedCosts)}

Here are their answers to the goal-setting questionnaire:
1. What do you want to achieve in the next 5 years? ${answers.goal}
2. What is your biggest financial concern right now? ${answers.concern}
3. Do you have any debt you want to prioritise? ${answers.debt}
4. Are you saving toward anything specific? ${answers.saving}

Based on all of this, generate a personalised, sequenced 5-year financial roadmap for ${username}. 

Structure your response EXACTLY like this — do not add any extra text outside this structure:

SUMMARY
Write 2-3 sentences explaining the overall strategy for this person specifically.

YEAR 1
Milestone: [what they should focus on in year 1]
Why: [one sentence explaining why this comes first]

YEAR 2
Milestone: [what they should focus on in year 2]
Why: [one sentence explaining why]

YEAR 3
Milestone: [what they should focus on in year 3]
Why: [one sentence explaining why]

YEAR 4
Milestone: [what they should focus on in year 4]
Why: [one sentence explaining why]

YEAR 5
Milestone: [what they should focus on in year 5]
Why: [one sentence explaining why]

NUDGE
Write one short, encouraging sentence directly addressing ${username} about their financial journey.

Use South African context throughout — mention TFSA, SARS, rand amounts, JSE where relevant. Be specific to their actual numbers, not generic.
`;

    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-opus-4",
                max_tokens: 1000,
                messages: [
                    { role: "user", content: prompt }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Anthropic error:", errorData);

            return res.status(response.status).json({
            error: "Anthropic request failed"
            });
        }

        const data = await response.json();
        const trackText = data.content[0].text;

        res.json({ track: trackText });

    } catch (error) {
        console.error("Anthropic API error:", error);
        res.status(500).json({ error: "Failed to generate track." });
    }
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});