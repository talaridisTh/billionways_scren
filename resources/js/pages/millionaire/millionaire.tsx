import { CheckCircle, Gift, Phone, Scissors, Trophy, Users, XCircle } from 'lucide-react';
import { useState } from 'react';

const questionsData = [
    {
        id: 1,
        question: 'Τι δεν θα έβαζε ποτέ η Ραφαέλα στα νύχια της?',
        options: ['1 πέρλα', 'μπεζ ροζ', 'ένα αυτοκόλλητο', 'στραζ'],
        correct: 3,
    },
    {
        id: 2,
        question: 'Ποιος θα ήταν ο ιδανικός άντρας για την Μαρία πόντια?',
        options: ['ο Μπαρκουλης', 'ο Τσε Γκεβάρα', 'ο Γεωργουλης', 'ο Μπραντ Πιτ'],
        correct: 1,
        element: 'Στοιχείο 1',
    },
    {
        id: 3,
        question: 'Ή Μαρία (ξαδέρφη) δεν έχει πάει:',
        options: ['Βαρκελώνη', 'Μαλδίβες', 'Ρουμανία', 'Θιβέτ'],
        correct: 3,
    },
    {
        id: 4,
        question: 'Τι δουλειά κάνει ο Θάνος',
        options: ['διαφημιστής', 'αναλυτής', 'προγραμματιστής', 'μοντέλο της Calvin Klein'],
        correct: 2,
        element: 'Στοιχείο 2',
    },
    {
        id: 5,
        question: 'Σύμφωνα με την Μαρία πόντια τι πρέπει να έχουν να έχουν πάντα τα νύχια?',
        options: ['μήκος', 'μπλε', 'γκλιτερ', 'μπεζ'],
        correct: 2,
    },
    {
        id: 6,
        question: 'Ο γάμος της Ραφαέλας και του Χρήστου έγινε στις…',
        options: ['7 Ιούλη 2024', '17 Ιούλη 2024', '25 Αυγούστου 2024', '3 Φλεβάρη 2025'],
        correct: 0,
        element: 'Στοιχείο 3',
    },
    {
        id: 7,
        question: 'Σύμφωνα με τον Χρήστο τι απαγορεύεται να έχουν τα πράγματα του Ραφαελου;',
        options: [
            'λιοντάρια',
            'καμηλοπάρδαλη',
            'Ήρωές τις Marvel',
            'Οτιδήποτε ροζ, κίτρινο, πορτοκαλί και οτιδήποτε άλλο μπορεί να θεωρηθεί κοριτσίστικο',
        ],
        correct: 3,
    },
    {
        id: 8,
        question: 'Πότε είναι τα γενέθλια του Λευτέρη (αδερφός Μαρίας);',
        options: ['27 Αυγούστου', '3 Μαρτίου', '2 Σεπτέμβρη', '12 Μαΐου'],
        correct: 0,
        element: 'Στοιχείο 4',
    },
    {
        id: 9,
        question: 'Που ήταν το πρώτο ραντεβού με τον Δημήτρη;',
        options: ['Στο καρέ', 'Στο dogs', 'Στο trap', 'Στο il posto'],
        correct: 2,
    },
    {
        id: 10,
        question: 'Η καταγωγή της Μαρίας από τον πόντο είναι από:',
        options: ['Σμύρνη', 'Κωνσταντινούπολη', 'Άγκυρα', 'Γαρς'],
        correct: 3,
        element: 'Στοιχείο 5',
    },
    {
        id: 11,
        question: 'Τι δουλειά κάνουν οι Μαρίες;',
        options: ['Business Analysts', 'Product Owners', 'Accountants', 'Developers'],
        correct: 0,
    },
    {
        id: 12,
        question: 'Σε ποιο από τα παράκατω δεν εχει δουλέψει η Ραφαέλα σαν δασκάλα;',
        options: ['Στη Σάμο', 'Στη Λέρο', 'Στη Χαλκιδική', 'Στην Χίο'],
        correct: 3,
        element: 'Στοιχείο 6',
    },
    {
        id: 13,
        question: 'Ποια δουλειά δεν έχει κάνει ο Χρήστος στο παρελθόν;',
        options: ['Εξυπηρέτηση πελάτων', 'Βοηθός ηλεκτρολόγου', 'Ψηφιακό Μαρκετιγνκ', 'Τον Αη Βασίλη'],
        correct: 1,
    },
    {
        id: 14,
        question: 'Ποια μάρκα μποξεράκια δεν πρόκειται να αγοράσει ξανά ο Θάνος',
        options: ['Boss', 'Calvin Klein', 'UMO', 'Tommy Hilfiger'],
        correct: 2,
        element: 'Στοιχείο 7',
    },
    {
        id: 15,
        question: 'Ποιο είναι το αγαπημένο φαγητό του θείου Σταύρου;',
        options: ['Σαρμαδάκια', 'Πιπερίες γεμιστές', 'Παπουτσάκια', 'Παστίτσιο'],
        correct: 1,
    },
    {
        id: 16,
        question: 'Ο Ραφαέλος θα γίνει 1 χρονών στις..',
        options: ['1 Δεκεμβρίου', '23 Δεκεμβρίου', '4 Ιανουαρίου', '30 Ιανουάριου'],
        correct: 1,
        element: 'Στοιχείο 8',
    },
    {
        id: 17,
        question: 'Τα γατιά της Μαρίας τα λένε:',
        options: ['Όλιβερ και Μελίτα', 'Νανούς και Μελίτα', 'Μπιάνκα και Ολαφ', 'Μελίτα και Όλαφ'],
        correct: 1,
    },
    {
        id: 18,
        question: 'Πόσο χρονών είναι ο μούργος;',
        options: ['10 χρονών', '13 χρονών', '15 χρονών', '8 χρονών'],
        correct: 1,
        element: 'Στοιχείο 9',
    },
    {
        id: 19,
        question: 'Το καινούργιο αυτοκίνητο του Θάνου τι μάρκα είναι;',
        options: ['Ford', 'Hyundai', 'Kia', 'Nissan'],
        correct: 0,
    },
    {
        id: 20,
        question: 'Ποιος είναι ο κολλητός του Δημητρη;',
        options: ['Βασίλης', 'Άγγελος', 'Γιώργος', 'Στέλιος'],
        correct: 3,
        element: 'Στοιχείο 10',
    },
];

const clues = [
    'Δεν θα το βάλεις σε ράφι, ούτε σε κορνίζα. Δεν θα το φορέσεις, ούτε θα το κρύψεις σε συρτάρι. Δεν θα το τυλίξεις σε χαρτί, ούτε θα το αφήσεις να σκονιστεί.',
    'Δεν λειτουργεί μόνο του. Κάποιος θα σου κρατάει το χέρι.',
    'Από όλες τις Μαρίες, μόνο μία δεν έχει ακόμα κατι να πει για αυτό. Η Ραφαέλα όμως… ακόμα λέει τα δικά της σε κάθε ευκαιρία.',
    'Θα εμφανιστεί όταν ξεπουλήσουν όλα τα κόκκινα.',
    'Δεν είναι για 1, ούτε 2, ούτε 3. Ξεχωριστά ηλιοβασιλέματα και ξεχωριστές ανατολές.',
    'Ο κόσμος θα «μικρύνει» κάτω από τα πόδια σου.',
    'Τα μεσάνυχτα, το ρολόι θα δείχνει ακόμη έντεκα.',
    'Δύο ψέματα και μία αλήθεια: Το βλέπεις και το ακούς κάθε μέρα. Το χειμώνα πέφτει χιόνι κάθε μέρα. Δεν καταλαβαίνεις τίποτα από όσα λένε.',
    'Έχουν σχέση οι πατάτες και το τοστ, το κλειδί και το φιλί.',
    "Όλα τα κομμάτια είναι εδώ: η στιγμή, η παρέα, η μέρα, η διάρκεια, ο τόπος… Βάλ' τα μαζί και (μπορεί) να βρεις το δώρο σου.",
];

const Lifelines = ({ lifelines, onUseLifeline, disabled }) => {
    return (
        <div className="mb-6 flex justify-center space-x-4">
            <button
                onClick={() => onUseLifeline('fifty-fifty')}
                disabled={disabled || !lifelines.fiftyFifty}
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-bold transition-all ${
                    !lifelines.fiftyFifty
                        ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                        : disabled
                          ? 'cursor-not-allowed bg-gray-400 text-gray-600'
                          : 'bg-yellow-500 text-white shadow-lg hover:bg-yellow-600'
                }`}
            >
                <Scissors className="h-5 w-5" />
                <span>50-50</span>
            </button>

            <button
                onClick={() => onUseLifeline('audience')}
                disabled={disabled || !lifelines.audience}
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-bold transition-all ${
                    !lifelines.audience
                        ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                        : disabled
                          ? 'cursor-not-allowed bg-gray-400 text-gray-600'
                          : 'bg-blue-500 text-white shadow-lg hover:bg-blue-600'
                }`}
            >
                <Users className="h-5 w-5" />
                <span>Κοινό</span>
            </button>

            <button
                onClick={() => onUseLifeline('phone')}
                disabled={disabled || !lifelines.phone}
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-bold transition-all ${
                    !lifelines.phone
                        ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                        : disabled
                          ? 'cursor-not-allowed bg-gray-400 text-gray-600'
                          : 'bg-green-500 text-white shadow-lg hover:bg-green-600'
                }`}
            >
                <Phone className="h-5 w-5" />
                <span>Τηλέφωνο</span>
            </button>
        </div>
    );
};

const QuestionCard = ({ question, selectedAnswer, onAnswerSelect, showResult, isCorrect, hiddenOptions }) => {
    return (
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6">
                <h2 className="mb-4 text-2xl leading-relaxed font-bold text-gray-800">{question.question}</h2>
            </div>

            <div className="space-y-3">
                {question.options.map((option, index) => {
                    if (hiddenOptions.includes(index)) {
                        return (
                            <div key={index} className="w-full rounded-xl border-2 border-gray-300 bg-gray-100 p-4 text-gray-400">
                                <span>{String.fromCharCode(65 + index)}) [Κρυμμένη επιλογή]</span>
                            </div>
                        );
                    }

                    let buttonClass = 'w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium ';

                    if (showResult) {
                        if (index === question.correct) {
                            buttonClass += 'bg-green-100 border-green-500 text-green-800';
                        } else if (index === selectedAnswer && !isCorrect) {
                            buttonClass += 'bg-red-100 border-red-500 text-red-800';
                        } else {
                            buttonClass += 'bg-gray-50 border-gray-200 text-gray-500';
                        }
                    } else if (selectedAnswer === index) {
                        buttonClass += 'bg-blue-100 border-blue-500 text-blue-800';
                    } else {
                        buttonClass += 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300';
                    }

                    return (
                        <button key={index} className={buttonClass} onClick={() => !showResult && onAnswerSelect(index)} disabled={showResult}>
                            <div className="flex items-center justify-between">
                                <span>
                                    {String.fromCharCode(65 + index)}) {option}
                                </span>
                                {showResult && index === question.correct && <CheckCircle className="h-6 w-6 text-green-600" />}
                                {showResult && index === selectedAnswer && !isCorrect && <XCircle className="h-6 w-6 text-red-600" />}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const ElementCard = ({ elementText, elementNumber }) => {
    return (
        <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white shadow-xl">
            <div className="text-center">
                <Gift className="mx-auto mb-4 h-12 w-12 animate-bounce" />
                <h3 className="mb-4 text-2xl font-bold">🎉 Μπράβο! 🎉</h3>
                <p className="mb-2 text-lg">Κέρδισες το:</p>
                <p className="inline-block rounded-lg bg-white p-4 text-3xl font-bold text-purple-600">{elementText}</p>
            </div>
        </div>
    );
};

const ProgressBar = ({ current, total }) => {
    const percentage = (current / total) * 100;

    return (
        <div className="mb-6 h-3 w-full rounded-full bg-gray-200">
            <div
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

const LifelineMessage = ({ type, onClose }) => {
    const messages = {
        'fifty-fifty': 'Έχουν αφαιρεθεί 2 λάθος απαντήσεις!',
        audience: 'Ρωτήστε το κοινό! Συζητήστε την ερώτηση με τους παίκτες.',
        phone: 'Τηλεφωνήστε σε φίλο! Έχετε 30 δευτερόλεπτα να συζητήσετε την ερώτηση.',
    };

    const colors = {
        'fifty-fifty': 'from-yellow-500 to-orange-500',
        audience: 'from-blue-500 to-indigo-500',
        phone: 'from-green-500 to-teal-500',
    };

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className={`mx-auto max-w-md rounded-2xl bg-gradient-to-r ${colors[type]} p-8 text-white shadow-xl`}>
                <div className="text-center">
                    <h3 className="mb-4 text-2xl font-bold">Βοήθημα Ενεργοποιήθηκε!</h3>
                    <p className="mb-6 text-lg">{messages[type]}</p>
                    <button onClick={onClose} className="rounded-xl bg-white px-6 py-3 font-bold text-gray-800 transition-transform hover:scale-105">
                        Συνέχεια
                    </button>
                </div>
            </div>
        </div>
    );
};

const QuizGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [showElement, setShowElement] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [collectedElements, setCollectedElements] = useState([]);
    const [lifelines, setLifelines] = useState({
        fiftyFifty: true,
        audience: true,
        phone: true,
    });
    const [hiddenOptions, setHiddenOptions] = useState([]);
    const [showLifelineMessage, setShowLifelineMessage] = useState(null);

    const question = questionsData[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex);
        setShowResult(true);

        if (answerIndex === question.correct) {
            setScore(score + 1);
        }
    };

    const handleUseLifeline = (type) => {
        if (type === 'fifty-fifty') {
            const correctAnswer = question.correct;
            const wrongAnswers = [0, 1, 2, 3].filter((i) => i !== correctAnswer);
            const toHide = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 2);
            setHiddenOptions(toHide);
            setLifelines((prev) => ({ ...prev, fiftyFifty: false }));
        } else {
            setLifelines((prev) => ({
                ...prev,
                [type === 'audience' ? 'audience' : 'phone']: false,
            }));
        }
        setShowLifelineMessage(type);
    };

    const handleNext = () => {
        if (question.element && isCorrect) {
            setCollectedElements([...collectedElements, question.element]);
            setShowElement(true);
        } else {
            proceedToNext();
        }
    };

    const proceedToNext = () => {
        if (currentQuestion < questionsData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setShowElement(false);
            setHiddenOptions([]);
        } else {
            setGameCompleted(true);
        }
    };

    const restartGame = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setShowElement(false);
        setGameCompleted(false);
        setCollectedElements([]);
        setLifelines({
            fiftyFifty: true,
            audience: true,
            phone: true,
        });
        setHiddenOptions([]);
        setShowLifelineMessage(null);
    };

    if (gameCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
                <div className="container mx-auto py-8">
                    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-xl">
                        <Trophy className="mx-auto mb-6 h-16 w-16 text-yellow-500" />
                        <h1 className="mb-4 text-4xl font-bold text-gray-800">Συγχαρητήρια!</h1>
                        <p className="mb-6 text-xl text-gray-600">
                            Τελείωσες το quiz! Σκορ: {score}/{questionsData.length}
                        </p>

                        <div className="mb-8">
                            <h3 className="mb-4 text-2xl font-bold text-gray-800">Τα στοιχεία που συγκέντρωσες:</h3>
                            <div className="space-y-3">
                                {collectedElements.map((element, index) => (
                                    <div key={index} className="rounded-lg bg-purple-100 p-3 font-medium text-purple-800">
                                        {element}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="mb-4 text-xl font-bold text-gray-800">Όλα τα στοιχεία μαζί:</h3>
                            <div className="space-y-3 rounded-lg bg-gray-100 p-6 text-left">
                                {clues.map((clue, index) => (
                                    <p key={index} className="text-gray-700">
                                        <span className="font-bold">{index + 1}.</span> {clue}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={restartGame}
                            className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 text-lg font-bold text-white transition-transform hover:scale-105"
                        >
                            Ξανά από την αρχή
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (showElement) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
                <div className="container mx-auto py-8">
                    <ProgressBar current={currentQuestion + 1} total={questionsData.length} />
                    <ElementCard elementText={question.element} />
                    <div className="mt-8 text-center">
                        <button
                            onClick={proceedToNext}
                            className="rounded-xl bg-white px-8 py-3 text-lg font-bold text-purple-600 shadow-lg transition-transform hover:scale-105"
                        >
                            Συνέχεια
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
            <div className="container mx-auto py-8">
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-white">🎯 ΕΚΑΤΟΜΜΥΡΙΟΥΧΟΣ QUIZ 🎯</h1>
                    <p className="text-xl text-white/90">
                        Ερώτηση {currentQuestion + 1} από {questionsData.length}
                    </p>
                </div>

                <ProgressBar current={currentQuestion + 1} total={questionsData.length} />

                <Lifelines lifelines={lifelines} onUseLifeline={handleUseLifeline} disabled={showResult} />

                <QuestionCard
                    question={question}
                    selectedAnswer={selectedAnswer}
                    onAnswerSelect={handleAnswerSelect}
                    showResult={showResult}
                    isCorrect={isCorrect}
                    hiddenOptions={hiddenOptions}
                />

                {showResult && (
                    <div className="mt-8 text-center">
                        <div className="mb-4">
                            {isCorrect ? (
                                <p className="text-2xl font-bold text-green-100">🎉 Σωστό! 🎉</p>
                            ) : (
                                <p className="text-2xl font-bold text-red-100">❌ Λάθος!</p>
                            )}
                        </div>
                        <button
                            onClick={handleNext}
                            className="rounded-xl bg-white px-8 py-3 text-lg font-bold text-purple-600 shadow-lg transition-transform hover:scale-105"
                        >
                            {currentQuestion < questionsData.length - 1 ? 'Επόμενη ερώτηση' : 'Τέλος Quiz'}
                        </button>
                    </div>
                )}

                {showLifelineMessage && <LifelineMessage type={showLifelineMessage} onClose={() => setShowLifelineMessage(null)} />}
            </div>
        </div>
    );
};

export default QuizGame;
