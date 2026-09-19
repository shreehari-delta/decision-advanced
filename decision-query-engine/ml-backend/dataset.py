# dataset.py

TRAINING_DATA = [
    # -------------------------------------------------------------
    # DOMAIN 0: KNOWLEDGE (Factual, Definitions, History, Science)
    # -------------------------------------------------------------
    ("What is the capital of Japan?", 0, 0, 1.2),
    ("Who wrote the play Hamlet?", 0, 0, 1.5),
    ("What is the speed of light in vacuum?", 0, 0, 1.8),
    ("How many continents are there on Earth?", 0, 0, 1.0),
    ("What year did World War 2 end?", 0, 0, 1.4),
    ("Define photosynthesis in simple terms.", 0, 0, 2.0),
    ("What is the boiling point of water at sea level?", 0, 0, 1.1),
    ("Who painted the Mona Lisa?", 0, 0, 1.3),
    ("What is Moore's Law in computing?", 0, 0, 2.2),
    ("Explain the difference between fission and fusion.", 0, 0, 3.5),
    ("When was the United Nations established?", 0, 0, 1.5),
    ("What is the distance between the Earth and the Moon?", 0, 0, 2.0),

    # -------------------------------------------------------------
    # DOMAIN 1: REFLECTIVE (Philosophical, Dilemmas, Life Choices)
    # -------------------------------------------------------------
    ("Should I switch careers to software engineering?", 1, 1, 8.5),
    ("How do I choose between two equally attractive job offers?", 1, 1, 8.0),
    ("Would you rather live a safe predictable life or take risks that could lead to failure?", 1, 1, 9.2),
    ("If you could erase one painful memory but lose the lesson it taught you, would you?", 1, 1, 9.1),
    ("If you could erase one regret from your past, would you?", 1, 1, 9.0),
    ("How do you know when nostalgia is holding you back?", 1, 1, 7.5),
    ("Is it better to prioritize personal passion or financial security?", 1, 1, 8.8),
    ("How do I deal with feeling stuck in life in my early twenties?", 1, 1, 8.1),
    ("Is true unconditional love possible, or is everything transactional?", 1, 1, 9.4),
    ("What does it really mean to live a meaningful life?", 1, 1, 8.9),
    ("Should I relocate to a new country for personal growth?", 1, 1, 8.3),
    ("How do you know when it is time to walk away from a long relationship?", 1, 1, 8.7),
    ("Do our choices define who we are more than our circumstances?", 1, 1, 9.0),

    # -------------------------------------------------------------
    # DOMAIN 2: QUANTITATIVE (Math, Finance, Formulas, Data)
    # -------------------------------------------------------------
    ("Calculate the monthly payment on a $300,000 mortgage at 6.5%", 0, 2, 5.5),
    ("What is the compound interest after 5 years on $10,000 at 7%?", 0, 2, 4.8),
    ("How do I calculate standard deviation of a sample dataset?", 0, 2, 5.0),
    ("What is the formula for calculating customer lifetime value?", 0, 2, 4.5),
    ("If revenues grow 15% year over year, what is the 3-year projection?", 0, 2, 5.2),
    ("Compute the derivative of f(x) = 3x^2 + 5x - 7.", 0, 2, 4.0),
    ("How do I calculate Return on Equity (ROE)?", 0, 2, 4.2),
    ("What is Bayes' theorem and what is the mathematical formula?", 0, 2, 5.8),

    # -------------------------------------------------------------
    # DOMAIN 3: HEALTH (Nutrition, Sleep, Fitness, Biology)
    # -------------------------------------------------------------
    ("What exercises help alleviate chronic lower back pain?", 1, 3, 6.5),
    ("How many hours of sleep does an adult need per night?", 0, 3, 2.8),
    ("What is a balanced macronutrient ratio for endurance runners?", 1, 3, 6.2),
    ("How does caffeine consumption affect REM sleep latency?", 0, 3, 4.2),
    ("What are the primary symptoms of vitamin D deficiency?", 0, 3, 3.0),
    ("How do I lower resting heart rate through aerobic conditioning?", 0, 3, 5.0),
    ("What are the biological mechanisms behind intermittent fasting?", 0, 3, 5.4),
]

DOMAIN_MAP = {
    0: "knowledge",
    1: "reflective",
    2: "quantitative",
    3: "health"
}