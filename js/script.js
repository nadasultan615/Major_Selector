const questions = [
    "هل أنت مهتم بدراسة كيفية تأثير العرض والطلب على الأسعار والأسواق؟",
    "هل تحب فهم كيفية عمل الاقتصاد وتأثيره على الأعمال التجارية؟",
    "هل أنت مهتم بالأسواق المالية وكيفية عملها؟",
    "هل تحب التفكير في كيفية إدارة الأموال واستثمارها بشكل ذكي؟",
    "هل تستمتع بتحليل البيانات المالية والمعاملات المالية؟",
    "هل تحب التعامل مع الأرقام والبيانات المالية؟",
    "هل تحب التفاعل مع العملاء وفهم احتياجاتهم؟",
    "هل تحب تنظيم الأشياء وتوجيه الفرق لتحقيق الأهداف المشتركة؟",
    "هل تستمتع بدراسة السياسات الحكومية والتأثيرات التي لها على حياة المواطنين؟",
    "هل لديك اهتمام بالبحث في مفاهيم مثل العدالة الاجتماعية والحقوق الإنسانية؟",
    "هل تحب استخدام التكنولوجيا لتحسين عمليات الأعمال وتطوير حلول فعالة؟",
    "هل لديك الرغبة في الجلوس أمام أجهزة الكمبيوتر لفترة طويلة؟"
];

const questionsEnglish = [
    "Are you interested in studying how supply and demand affect prices and markets?",
    "Do you enjoy understanding how economics works and its impact on business?",
    "Are you interested in financial markets and how they operate?",
    "Do you enjoy thinking about how to manage money and invest it wisely?",
    "Do you enjoy analyzing financial data and transactions?",
    "Do you enjoy working with financial numbers and data?",
    "Do you like interacting with customers and understanding their needs?",
    "Do you enjoy organizing things and directing teams to achieve common goals?",
    "Do you enjoy studying government policies and their impact on citizens' lives?",
    "Are you interested in researching concepts like social justice and human rights?",
    "Do you enjoy using technology to improve business operations and develop effective solutions?",
    "Do you have a desire to sit in front of computers for long periods of time?"
];

const results = {
    "economics": "Economics",
    "finance": "Finance",
    "accounting": "Accounting",
    "business": "Business Administration",
    "political": "Political Science",
    "information_system": "Information Systems"
};

let currentQuestion = 0;
let answers = [];

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const nextButton = document.getElementById('next-btn');

function displayQuestion() {
    const currentQArabic = questions[currentQuestion];
    const currentQEnglish = questionsEnglish[currentQuestion];
    questionElement.innerHTML = `<div>${currentQEnglish}</div><div>${currentQArabic}</div>`;
    optionsElement.innerHTML = '';

    const option1 = createOptionButton("Yes");
    const option2 = createOptionButton("No");

    optionsElement.appendChild(option1);
    optionsElement.appendChild(option2);

    nextButton.style.display = 'none'; // Hide the Next button initially
}

function createOptionButton(text) {
    const option = document.createElement('button');
    option.textContent = text;
    option.classList.add('option-button');
    option.addEventListener('click', () => {
        const optionButtons = document.querySelectorAll('.option-button');
        optionButtons.forEach(button => button.classList.remove('selected'));
        option.classList.add('selected');
        answers[currentQuestion] = text === "Yes" ? "likely" : "dislikely";
        nextButton.disabled = false; // Enable the Next button after selecting an option
        nextButton.style.display = 'block'; // Display the Next button after an option is selected
    });
    return option;
}

function showNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
        nextButton.disabled = true; // Disable the Next button until an option is selected
    } else {
        displayResult();
    }
}

function displayResult() {
    let selectedMajors = [];

    if (answers.every(answer => answer === "likely")) {
        selectedMajors = Object.keys(results);
    } else {
        if (answers[0] === "likely" && answers[1] === "likely") {
            selectedMajors.push("Economics");
        }
        if (answers[2] === "likely" && answers[3] === "likely") {
            selectedMajors.push("Finance");
        }
        if (answers[4] === "likely" && answers[5] === "likely") {
            selectedMajors.push("Accounting");
        }
        if (answers[6] === "likely" && answers[7] === "likely") {
            selectedMajors.push("Business");
        }
        if (answers[8] === "likely" && answers[9] === "likely") {
            selectedMajors.push("Political");
        }
        if (answers[10] === "likely" && answers[11] === "likely") {
            selectedMajors.push("Information_System");
        }
    }

    if (selectedMajors.length > 0) {
        resultElement.textContent = selectedMajors.join(" or ");
       
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
    } else {
        resultElement.textContent = "No suitable major has been selected";
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
    }
}


nextButton.addEventListener('click', () => {
    showNextQuestion();
});
const prevButton = document.getElementById('prev-btn');

prevButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        nextButton.disabled = true; // Disable the Next button until an option is selected
    }
});


displayQuestion();
