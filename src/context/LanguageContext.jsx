import React, { createContext, useContext, useState } from 'react';
import { enProblemTranslations } from '../data/translations-problems-en';
import { koProblemTranslations } from '../data/translations-problems-ko';
import { mnProblemTranslations } from '../data/translations-problems-mn';

const translations = {
  mn: {
    // Navigation
    home: "Нүүр",
    courses: "Хичээлүүд",
    practice: "Бодлогууд",
    mongolgpt: "MongolGPT",
    about: "Бидний тухай",
    contact: "Холбоо барих",
    logout: "Гарах",
    login: "Нэвтрэх",
    register: "Бүртгүүлэх",
    
    // Home Page
    hero_title_1: "Бодлого Бод",
    hero_title_2: "Кодонд мэргэш",
    hero_desc: "Суурь программчлалын үндсээс эхлээд LeetCode-ийн ахисан түвшний сорил хүртэл бид таны хүссэн технологийн ажлыг олоход шаардлагатай системтэй замыг санал болгодог.",
    hero_login_register: "Нэвтрэх / Бүртгүүлэх",
    features_title: "Амжилтад хүрэхэд хэрэгтэй бүхэн",
    features_desc: "Манай платформ нь дэлхийн томоохон технологийн компаниудын ярилцлагад бэлдэх Leetcode дээрх бодлогуудыг Монгол тайлбартайгаар хүргэхэд чиглэсэн юм.",
    feat_curriculum_title: "Эмх цэгцтэй суралцах хөтөлбөр",
    feat_curriculum_desc: "Манай иж бүрэн сургалтын хөтөлбөрөөр А-гаас Я хүртэлх тодорхой замыг дагаж, бүх чухал алгоритмын ерөнхий ойлголтыг авах юм.",
    feat_video_title: "Бодлогуудын видео тайлбар",
    feat_video_desc: "Хэзээ ч гацахгүй. Бүх асуудалд зориулсан нарийвчилсан, алхам алхамаар тайлбарласан видео хичээлээр кодын “яагаад”-г ойлгоорой.",
    feat_community_title: "Дэмжлэгтэй хамт олон",
    feat_community_desc: "Идэвхтэй суралцагчдын сүлжээнд нэгдээрэй. Асуулт асууж, шийдлээ хуваалцаж, хувийн нийгэмлэгтээ хамтдаа өсөж хөгжөөрэй.",
    why_connect_title: "Надтай холбогдож, өөрийн өсөлтөө эрчимжүүлээрэй",
    why_connect_desc: "Намайг GitHub болон LinkedIn дээр дагаж мөрдөх нь зөвхөн нэвтрэх шаардлага биш—энэ нь тасралтгүй мэдлэг, карьерийн боломжууд, шууд дэмжлэг авах таны гарц юм.",
    why_connect_item1_title: "Онцгой сангууд руу хандах:",
    why_connect_item1_desc: " Эхлэх код, ахисан шийдлүүд, төслийн загварууд.",
    why_connect_item2_title: "Төслүүдийн шинэчлэлт:",
    why_connect_item2_desc: " Миний шинэ нээлттэй эхийн төслүүд, кодын туршилтууд.",
    why_connect_item3_title: "Мэргэжлийн сүлжээ:",
    why_connect_item3_desc: " Миний сүлжээнд холбогдож, карьерын зөвлөмж авах.",
    sponsors_title: "Бидний Аяллыг Дэмжээрэй",
    sponsors_desc: "Mongol Code Academy нь Монголын ирээдүйн технологийн манлайлагчдыг бэлтгэх эрхэм зорилготой. Бидний үйл ажиллагааг дэмжиж, энэхүү өсөлт хөгжилтийн нэгэн хэсэг болох түншүүдийг хайж байна.",
    sponsors_placeholder: "Таны лого энд байрших болно",
    sponsors_btn: "Дэмжигч болох",
    cta_ready: "Аяллаа эхлэхэд бэлэн үү?",
    cta_desc: "Өнөөдрөөс өөрийн өсөлтдөө хөрөнгө оруулаарай.",
    cta_btn: "Үнэгүй нэгдэх",

    // About Page
    about_title: "Бидний тухай",
    about_desc: "Дэлхийн хэмжээний технологийн боловсролыг хүн бүрт хүртээмжтэй болгох нь манай эрхэм зорилго юм.",
    about_mission_title: "Бидний Алсын Хараа",
    about_mission_text: "Бид Монголоос дэлхийд өрсөлдөхүйц шилдэг инженерүүдийг бэлтгэж, технологийн салбарын AI өөрчлөлтийг түүчээлэх зорилготой. Манай системтэй хөтөлбөр, бодит цагийн AI дэмжлэг нь суралцагч бүрт зорилгодоо хүрэхэд нь тусална.",
    about_stat_courses_title: "Нийт курсууд",
    about_stat_courses_val: "10+",
    about_stat_students_title: "Идэвхтэй суралцагч",
    about_stat_students_val: "5,000+",
    about_stat_rating_title: "Суралцагчдын үнэлгээ",
    about_stat_rating_val: "4.9/5",

    // Contact Page
    contact_title: "Холбоо барих",
    contact_desc: "Танд асуулт, санал хүсэлт байна уу? Бид тантай холбогдож, туслахад хэзээд бэлэн байна.",
    contact_form_title: "Зурвас илгээх",
    contact_name_label: "Таны нэр",
    contact_name_placeholder: "Нэрээ оруулна уу",
    contact_email_label: "Имэйл хаяг",
    contact_email_placeholder: "и-мэйл хаягаа оруулна уу",
    contact_msg_label: "Зурвас",
    contact_msg_placeholder: "Асуух асуулт, санал хүсэлтээ энд бичнэ үү...",
    contact_send_btn: "Илгээх",
    contact_info_title: "Холбоо барих мэдээлэл",

    // Courses Page
    courses_title: "Үнэгүй хичээлүүд",
    courses_desc: "Программчлалын суурь ойлголтоос эхлээд гол өгөгдлийн бүтцүүдийг хамарсан үнэгүй курсуудаар бат бөх суурь бий болгоорой.",
    courses_loading: "Уншиж байна...",
    
    // Practice Hub Page
    practice_title: "Бодлогын сан",
    practice_desc: "Өөрийн ур чадварын түвшинд тохирох замыг сонгоно уу. Үндсэн дадлагаас эхэлж эсвэл LeetCode-ийн сорилтууд руу шууд ороорой.",
    practice_basic_title: "Программчлалын үндсэн дадлага",
    practice_basic_desc: "Суурь ойлголтуудыг бататгах энгийн бодлогууд.",
    practice_leetcode_title: "LeetCode-ийн бодлогууд",
    practice_leetcode_desc: "Ажлын ярилцлагад бэлтгэх алгоритмын бодлогууд.",

    // Footer
    footer_copyright: "© 2026 Mongol Code Academy. Бүх эрх хуулиар хамгаалагдсан.",
    footer_desc: "Монголын ирээдүйн технологийн манлайлагчдыг бэлтгэх, AI-д суурилсан кодын сургалтын платформ.",
    footer_links_section: "Хэрэгтэй холбоосууд",
    footer_about: "Бидний тухай",
    footer_contact: "Холбоо барих",

    // Course Accordion Specific
    "basic-programming": "Программчлалын үндсэн ойлголтууд",
    "basic-programming-desc": "Эндээс код бичих аяллаа эхлүүлээрэй. Аль ч хэлэнд хэрэглэгдэх программчлалын үндсэн барилгын блокуудыг сураарай.",
    "sorting-algorithms": "Эрэмбэлэх алгоритмууд",
    "sorting-algorithms-desc": "Эрэмбэлэх үндсэн алгоритмуудыг эзэмшиж, тэдгээрийн механик, хугацааны төвшин, практик хэрэглээг ойлгоорой.",

    // IDE shell and list strings
    problem: "Бодлого",
    video_solution: "Видео Тайлбар",
    back: "Буцах",
    run: "Ажиллуулах",
    running: "Ажиллаж байна...",
    output_console: "Output / Console",
    language_label: "Хэл:",
    congrats: "Баяр хүргэе!",
    close: "Хаах",
    next_problem: "Дараагийн бодлого",
    error_occurred: "Алдаа гарлаа!",
    wrong_answer: "Буруу хариулт",
    test_failed: "Тест дээр алдаа гарлаа.",
    input: "Оролт:",
    expected: "Хүлээгдэж буй:",
    your_output: "Таны хариу:",
    prev_problem: "Өмнөх бодлого",
    retry: "Дахин оролдох",
    solved: "Бодсон",
    basic_practice_list_desc: "Суурь чадваруудыг эзэмшихэд тань туслах бодлогын видео тайлбарууд.",
    curriculum_desc: "Суурь ойлголтоос эхлээд ахисан түвшний сэдвүүдийг хамарсан чухал өгөгдлийн бүтэц, алгоритмын бүтэцтэй зам.",

    ...mnProblemTranslations
  },
  ko: {
    // Navigation
    home: "홈",
    courses: "무료 강의",
    practice: "문제 풀이",
    mongolgpt: "몽골GPT",
    about: "소개",
    contact: "문의",
    logout: "로그아웃",
    login: "로그인",
    register: "회원가입",
    
    // Home Page
    hero_title_1: "문제 풀이로",
    hero_title_2: "코드에 통달하세요",
    hero_desc: "프로그래밍 기초부터 LeetCode의 고난도 도전 과제까지, 꿈꾸는 글로벌 테크 기업에 입사하는 데 필요한 체계적인 교육 과정을 제공합니다.",
    hero_login_register: "로그인 / 회원가입",
    features_title: "성공적인 학습을 위한 최적의 도구",
    features_desc: "글로벌 빅테크 기업 코딩 인터뷰에 대비해 엄선된 LeetCode 문제들을 상세한 시각적 해설과 함께 제공하는 데 특화되어 있습니다.",
    feat_curriculum_title: "체계적인 커리큘럼",
    feat_curriculum_desc: "기초 개념부터 시작해 고급 알고리즘 주제까지 한 단계씩 설계된 맞춤형 학습 로드맵을 따라갈 수 있습니다.",
    feat_video_title: "상세한 비디오 강의",
    feat_video_desc: "풀리지 않는 문제로 고민하지 마세요. 복잡한 문제를 한 줄씩 설명해 주는 동영상 가이드를 통해 코드의 논리를 완벽히 이해할 수 있습니다.",
    feat_community_title: "소통하는 커뮤니티",
    feat_community_desc: "함께 공부하는 글로벌 학생들과 의견을 나누세요. 질문하고, 최선의 코드를 공유하며 학습 시너지를 만들어 갈 수 있습니다.",
    why_connect_title: "네트워킹을 통해 성장을 가속화하세요",
    why_connect_desc: "GitHub 및 LinkedIn에서 소통하며 최신 IT 트렌드, 커리어 조언, 그리고 유익한 프로젝트 개발 경험을 함께 공유하세요.",
    why_connect_item1_title: "고급 코드 아카이브:",
    why_connect_item1_desc: " 알고리즘 템플릿, 고성능 모범 답안, 실무용 보일러플레이트 코드 제공.",
    why_connect_item2_title: "프로젝트 실시간 업데이트:",
    why_connect_item2_desc: " 오픈소스 기여 현황, 실험적인 코딩 프로젝트 정보 공유.",
    why_connect_item3_title: "전문 커리어 네트워킹:",
    why_connect_item3_desc: " 현직 개발자 커뮤니티 추천 채널 및 멘토 피드백 제공.",
    sponsors_title: "Mongol Code Academy와 함께하세요",
    sponsors_desc: "우리는 차세대 글로벌 소프트웨어 리더를 양성하기 위한 미션을 함께할 기업 파트너 및 후원사를 찾고 있습니다.",
    sponsors_placeholder: "귀사의 멋진 로고가 여기에 표시됩니다",
    sponsors_btn: "후원 파트너 신청하기",
    cta_ready: "새로운 성장을 이룰 준비가 되셨나요?",
    cta_desc: "지금 바로 무료로 가입하여 최고의 IT 여정을 시작해 보세요.",
    cta_btn: "무료로 가입하기",

    // About Page
    about_title: "소개",
    about_desc: "세계적 수준의 기술 교육을 모든 이에게 제공하는 것이 우리의 사명입니다.",
    about_mission_title: "우리의 비전",
    about_mission_text: "우리는 몽골을 넘어 전 세계에서 경쟁할 수 있는 최고의 소프트웨어 엔지니어를 양성하고, AI 산업 기술 혁신을 주도하는 것을 목표로 합니다. 체계적인 로드맵과 실시간 AI 학습 지원을 통해 모든 학생이 목표를 실현할 수 있도록 돕습니다.",
    about_stat_courses_title: "총 코스 수",
    about_stat_courses_val: "10+",
    about_stat_students_title: "활성 수강생",
    about_stat_students_val: "5,000+",
    about_stat_rating_title: "수강생 만족도",
    about_stat_rating_val: "4.9 / 5.0",

    // Contact Page
    contact_title: "문의하기",
    contact_desc: "질문이나 피드백이 있으신가요? 언제든 친절하게 답변해 드리겠습니다.",
    contact_form_title: "메시지 보내기",
    contact_name_label: "이름",
    contact_name_placeholder: "이름을 입력해 주세요",
    contact_email_label: "이메일 주소",
    contact_email_placeholder: "이메일을 입력해 주세요",
    contact_msg_label: "메시지 내용",
    contact_msg_placeholder: "질문이나 의견을 입력해 주세요...",
    contact_send_btn: "전송하기",
    contact_info_title: "연락처 정보",

    // Courses Page
    courses_title: "무료 학습 코스",
    courses_desc: "프로그래밍의 기본 다지기부터 컴퓨터 과학의 필수 알고리즘 및 자료구조까지 단계별 무료 강의를 시청해 보세요.",
    courses_loading: "로딩 중...",
    
    // Practice Hub Page
    practice_title: "코딩 문제 보관소",
    practice_desc: "자신의 실력 수준에 알맞은 문제 세트를 골라 연습해 보세요. 기초 문법 다지기부터 고난도 실전 문제까지 제공합니다.",
    practice_basic_title: "기초 프로그래밍 연습",
    practice_basic_desc: "문법 이해도와 프로그래밍 기초 논리를 강화하기 위한 기초 연습용 문제입니다.",
    practice_leetcode_title: "실전 LeetCode 알고리즘",
    practice_leetcode_desc: "실제 기술 인터뷰 및 IT 기업 코딩 테스트 대비에 필수적인 엄선된 알고리즘 문제 세트입니다.",

    // Footer
    footer_copyright: "© 2026 Mongol Code Academy. All rights reserved.",
    footer_desc: "글로벌 기술 리더를 양성하기 위한 AI 기반 맞춤형 코딩 학습 솔루션입니다.",
    footer_links_section: "바로가기",
    footer_about: "아카데미 소개",
    footer_contact: "제휴 및 문의",

    // Course Accordion Specific
    "basic-programming": "프로그래밍 기초 다지기",
    "basic-programming-desc": "개발 여정의 완벽한 시작점. 어떤 언어에서도 활용 가능한 프로그래밍의 핵심 개념과 기초 문법 요소를 학습합니다.",
    "sorting-algorithms": "정렬 알고리즘 정복",
    "sorting-algorithms-desc": "다양한 정렬 방법의 기저 원리, 작동 속도 분석, 실제 프로그램 설계에 유용한 주요 정렬 모델을 마스터합니다.",
    "1. Программчлал гэж юу вэ?": "1. 프로그래밍이란 무엇인가요?",
    "2. Хувьсагч (Variable)": "2. 변수 (Variable)",
    "3. Өгөгдлийн төрөл (Data Types)": "3. 데이터 타입 (Data Types)",
    "4. Операторууд (Operators)": "4. 연산자 (Operators)",
    "5. Нөхцөлтэй заавар (Conditional Statements)": "5. 조건문 (Conditional Statements)",
    "6. Давталт (Loops)": "6. 반복문 (Loops)",
    "7. Функц (Functions)": "7. 함수 (Functions)",
    "8. Хамрах хүрээ (Scope)": "8. 변수 범위 (Scope)",
    "1. Bubble Sort": "1. 버블 정렬 (Bubble Sort)",
    "2. Selection Sort": "2. 선택 정렬 (Selection Sort)",
    "3. Insertion Sort": "3. 삽입 정렬 (Insertion Sort)",
    "4. Merge Sort": "4. 병합 정렬 (Merge Sort)",
    "5. Quick Sort": "5. 퀵 정렬 (Quick Sort)",

    // IDE shell and list strings
    problem: "문제 설명",
    video_solution: "동영상 해설",
    back: "뒤로가기",
    run: "코드 실행",
    running: "실행 중...",
    output_console: "콘솔 출력",
    language_label: "언어:",
    congrats: "축하합니다!",
    close: "닫기",
    next_problem: "다음 문제",
    error_occurred: "에러가 발생했습니다!",
    wrong_answer: "오답입니다",
    test_failed: "테스트 실패",
    input: "입력:",
    expected: "기대값:",
    your_output: "나의 출력:",
    prev_problem: "이전 문제",
    retry: "다시 시도",
    solved: "해결됨",
    basic_practice_list_desc: "기초 프로그래밍 역량을 다지기 위한 동영상 가이드 탑재 문제 리스트.",
    curriculum_desc: "기초 개념부터 시작하여 고급 알고리즘 주제까지 한 단계씩 설계된 맞춤형 학습 로드맵.",

    ...koProblemTranslations
  },
  en: {
    // Navigation
    home: "Home",
    courses: "Courses",
    practice: "Problems",
    mongolgpt: "MongolGPT",
    about: "About",
    contact: "Contact",
    logout: "Logout",
    login: "Login",
    register: "Register",
    
    // Home Page
    hero_title_1: "Solve Problems",
    hero_title_2: "Master Coding",
    hero_desc: "From fundamental programming concepts to advanced LeetCode challenges, we offer a systematic learning path designed to help you land your dream tech job.",
    hero_login_register: "Login / Register",
    features_title: "Everything You Need to Succeed",
    features_desc: "Our platform is specialized in providing detailed guides and step-by-step solutions for LeetCode-style coding problems to build confidence for technical interviews.",
    feat_curriculum_title: "Structured Curriculum",
    feat_curriculum_desc: "Follow a comprehensive learning roadmap from A to Z, gaining deep insight into essential computer science algorithms.",
    feat_video_title: "Video Explanations",
    feat_video_desc: "Never get stuck again. Understand the key concepts and structural logic with high-quality step-by-step video walk-throughs.",
    feat_community_title: "Supportive Community",
    feat_community_desc: "Join a vibrant community of passionate learners. Ask questions, share optimizations, and collaborate inside your private network.",
    why_connect_title: "Accelerate Your Professional Growth",
    why_connect_desc: "Connect with me on GitHub and LinkedIn to gain immediate access to software engineering insights, job referrals, and career support.",
    why_connect_item1_title: "Exclusive Repositories:",
    why_connect_item1_desc: " Access production boilerplates, optimized code solutions, and practical project models.",
    why_connect_item2_title: "Project Iterations:",
    why_connect_item2_desc: " Keep track of new open-source repositories, system architecture plans, and coding demos.",
    why_connect_item3_title: "Global Connection:",
    why_connect_item3_desc: " Enhance your professional network for strategic developer roles and referrals.",
    sponsors_title: "Support Our Education Mission",
    sponsors_desc: "Mongol Code Academy is dedicated to equipping future tech leaders. Partner with us to sponsor curriculum development and infrastructure.",
    sponsors_placeholder: "Your corporate logo will be featured here",
    sponsors_btn: "Become a Sponsor",
    cta_ready: "Ready to Kickstart Your Coding Journey?",
    cta_desc: "Invest in your future and learn skills that matter.",
    cta_btn: "Get Started Free",

    // About Page
    about_title: "About Us",
    about_desc: "Our mission is to make world-class tech education accessible to everyone.",
    about_mission_title: "Our Vision",
    about_mission_text: "We aim to prepare top-tier developers who can compete globally and lead the AI transformation in tech. With our structured roadmaps and real-time AI learning support, we empower every learner to achieve their potential and transition into high-impact software careers.",
    about_stat_courses_title: "Total Courses",
    about_stat_courses_val: "10+",
    about_stat_students_title: "Active Students",
    about_stat_students_val: "5,000+",
    about_stat_rating_title: "Student Rating",
    about_stat_rating_val: "4.9/5",

    // Contact Page
    contact_title: "Contact Us",
    contact_desc: "Have any questions or feedback? We would love to hear from you and offer our support.",
    contact_form_title: "Send Message",
    contact_name_label: "Name",
    contact_name_placeholder: "Enter your name",
    contact_email_label: "Email Address",
    contact_email_placeholder: "Enter your email address",
    contact_msg_label: "Message",
    contact_msg_placeholder: "Write your questions or suggestions here...",
    contact_send_btn: "Send Message",
    contact_info_title: "Contact Details",

    // Courses Page
    courses_title: "Free Courses",
    courses_desc: "Build a solid foundation with free courses covering fundamental programming concepts to essential data structures.",
    courses_loading: "Loading...",
    
    // Practice Hub Page
    practice_title: "Problem Archive",
    practice_desc: "Select a pathway tailored to your experience. Work on fundamental building blocks or dive directly into advanced coding test simulations.",
    practice_basic_title: "Fundamental Coding",
    practice_basic_desc: "Simple practice problems designed to strengthen syntax and core logic concepts.",
    practice_leetcode_title: "LeetCode Solutions",
    practice_leetcode_desc: "Highly-practical algorithms and structural problems curated for competitive coding and global tech interviews.",

    // Footer
    footer_copyright: "© 2026 Mongol Code Academy. All rights reserved.",
    footer_desc: "An AI-powered, modernized training environment preparing next-generation global software engineers.",
    footer_links_section: "Navigation",
    footer_about: "About the Academy",
    footer_contact: "Partnership & Support",

    // Course Accordion Specific
    "basic-programming": "Fundamentals of Programming",
    "basic-programming-desc": "The ideal starting point for your development career. Master key logical structures, control flows, and variables common to all programming languages.",
    "sorting-algorithms": "Mastering Sorting Algorithms",
    "sorting-algorithms-desc": "Deep dive into popular sorting methodologies, their algorithmic behaviors, computational bounds, and real-world system applications.",
    "1. Программчлал гэж юу вэ?": "1. What is Programming?",
    "2. Хувьсагч (Variable)": "2. Variable",
    "3. Өгөгдлийн төрөл (Data Types)": "3. Data Types",
    "4. Операторууд (Operators)": "4. Operators",
    "5. Нөхцөлтэй заавар (Conditional Statements)": "5. Conditional Statements",
    "6. Давталт (Loops)": "6. Loops",
    "7. Функц (Functions)": "7. Functions",
    "8. Хамрах хүрээ (Scope)": "8. Scope",
    "1. Bubble Sort": "1. Bubble Sort",
    "2. Selection Sort": "2. Selection Sort",
    "3. Insertion Sort": "3. Insertion Sort",
    "4. Merge Sort": "4. Merge Sort",
    "5. Quick Sort": "5. Quick Sort",

    // IDE shell and list strings
    problem: "Problem Statement",
    video_solution: "Video Solution",
    back: "Back",
    run: "Run Code",
    running: "Running...",
    output_console: "Output / Console",
    language_label: "Language:",
    congrats: "Congratulations!",
    close: "Close",
    next_problem: "Next Problem",
    error_occurred: "Error Occurred!",
    wrong_answer: "Wrong Answer",
    test_failed: "Test Failed",
    input: "Input:",
    expected: "Expected:",
    your_output: "Your Output:",
    prev_problem: "Previous Problem",
    retry: "Retry",
    solved: "Solved",
    basic_practice_list_desc: "Fundamental practice problems with high-quality video walkthroughs.",
    curriculum_desc: "Follow a comprehensive learning roadmap from A to Z, gaining deep insight into essential computer science algorithms.",

    ...enProblemTranslations
  }
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('app_language') || 'mn';
  });

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('app_language', lang);
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || translations['mn']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
