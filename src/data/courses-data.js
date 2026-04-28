// This file acts as a simple database for the free courses.

export const coursesData = [
    {
        id: 'basic-programming',
        title: 'Программчлалын үндсэн ойлголтууд',
        description: 'Эндээс код бичих аяллаа эхлүүлээрэй. Аль ч хэлэнд хэрэглэгдэх программчлалын үндсэн барилгын блокуудыг сураарай.',
        lectures: [
            { title: '1. Программчлал гэж юу вэ?', videoId: 'sDTJ8cED6f8' },
            { title: '2. Хувьсагч (Variable)', videoId: 'G-VzHd3UCqk' },
            { title: '3. Өгөгдлийн төрөл (Data Types)', videoId: 'Fr8kKRNKMu8' },
            { title: '4. Операторууд (Operators)', videoId: 'HpWF9n-65Uk' },
            { title: '5. Нөхцөлтэй заавар (Conditional Statements)', videoId: '6j_RS4cZ4ZM' },
            { title: '6. Давталт (Loops)', videoId: 'r5cn1ItYwQM' },
            { title: '7. Функц (Functions)', videoId: 'LvwY7CqYd4Q' },
            { title: '8. Хамрах хүрээ (Scope)', videoId: '2zcmBQTaHX4' }
        ]
    },
    {
        id: 'sorting-algorithms',
        title: 'Эрэмбэлэх алгоритмууд',
        description: 'Эрэмбэлэх үндсэн алгоритмуудыг эзэмшиж, тэдгээрийн механик, хугацааны төвшин, практик хэрэглээг ойлгоорой.',
        lectures: [
            { title: '1. Bubble Sort', videoId: 'GQI_fc4zzKQ' },
            { title: '2. Selection Sort', videoId: 'm0e7Pq9ncpo' },
            { title: '3. Insertion Sort', videoId: '21aUS06tszU' },
            { title: '4. Merge Sort', videoId: 'vM96krcRGlc' },
            { title: '5. Quick Sort', videoId: 'fCjyj6arxz4' }
        ]
    }
];