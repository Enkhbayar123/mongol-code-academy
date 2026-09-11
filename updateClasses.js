// updateClasses.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./serviceAccountKey.json"), "utf8")
);

initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth();
const db = getFirestore();

const studentsList = [
  // 10a
  { name: "Хажидмаа", email: "tegshuhaanstudent1@tegshuhaan.mn", classGroup: "10a" },
  { name: "Хонголзул", email: "tegshuhaanstudent2@tegshuhaan.mn", classGroup: "10a" },
  { name: "Номин-Эрдэнэ", email: "tegshuhaanstudent3@tegshuhaan.mn", classGroup: "10a" },
  { name: "Мандуул", email: "tegshuhaanstudent4@tegshuhaan.mn", classGroup: "10a" },
  
  // 11a
  { name: "Ариунболд", email: "tegshuhaanstudent5@tegshuhaan.mn", classGroup: "11a" },
  { name: "Ариунцэцэг", email: "tegshuhaanstudent6@tegshuhaan.mn", classGroup: "11a" },
  { name: "Тэмүүлэн", email: "tegshuhaanstudent7@tegshuhaan.mn", classGroup: "11a" },
  { name: "Мөнхжин", email: "tegshuhaanstudent8@tegshuhaan.mn", classGroup: "11a" },
  { name: "Мөнх-Од", email: "tegshuhaanstudent9@tegshuhaan.mn", classGroup: "11a" },
  { name: "Энэрэл", email: "tegshuhaanstudent10@tegshuhaan.mn", classGroup: "11a" },
  { name: "Айша", email: "tegshuhaanstudent11@tegshuhaan.mn", classGroup: "11a" },
  
  // 12a
  { name: "Төгс-Амгалан", email: "tegshuhaanstudent12@tegshuhaan.mn", classGroup: "12a" },
  { name: "Алсбаяр", email: "tegshuhaanstudent13@tegshuhaan.mn", classGroup: "12a" },
  { name: "Тулга", email: "tegshuhaanstudent14@tegshuhaan.mn", classGroup: "12a" },
  { name: "Төвшинтулга", email: "tegshuhaanstudent15@tegshuhaan.mn", classGroup: "12a" },
  { name: "Тэмүүлэн", email: "tegshuhaanstudent100@tegshuhaan.mn", classGroup: "12a" },

  // 9a
  { name: "Анар", email: "tegshuhaanstudent17@tegshuhaan.mn", classGroup: "9a" },
  { name: "Ариунзаяа", email: "tegshuhaanstudent18@tegshuhaan.mn", classGroup: "9a" },
  { name: "Хосбагана", email: "tegshuhaanstudent19@tegshuhaan.mn", classGroup: "9a" },
  { name: "Түвшинбаяр", email: "tegshuhaanstudent20@tegshuhaan.mn", classGroup: "9a" },
  { name: "Баясгалан", email: "tegshuhaanstudent21@tegshuhaan.mn", classGroup: "9a" },
  { name: "Хасбилиг", email: "tegshuhaanstudent22@tegshuhaan.mn", classGroup: "9a" },
  { name: "Мөнхсүлд", email: "tegshuhaanstudent23@tegshuhaan.mn", classGroup: "9a" },
  { name: "Хангай", email: "tegshuhaanstudent24@tegshuhaan.mn", classGroup: "9a" },
  { name: "Ангараг", email: "tegshuhaanstudent25@tegshuhaan.mn", classGroup: "9a" },
  { name: "Ирмүүн", email: "tegshuhaanstudent26@tegshuhaan.mn", classGroup: "9a" },
  { name: "Батсайхан", email: "tegshuhaanstudent27@tegshuhaan.mn", classGroup: "9a" },
  { name: "Налжирмаа", email: "tegshuhaanstudent28@tegshuhaan.mn", classGroup: "9a" },
  { name: "Энххүслэн", email: "tegshuhaanstudent29@tegshuhaan.mn", classGroup: "9a" },
  { name: "Дөлгөөн", email: "tegshuhaanstudent30@tegshuhaan.mn", classGroup: "9a" },
  { name: "Биндэръя", email: "tegshuhaanstudent31@tegshuhaan.mn", classGroup: "9a" },
  { name: "Гэгээ", email: "tegshuhaanstudent32@tegshuhaan.mn", classGroup: "9a" },
  { name: "Хулан", email: "tegshuhaanstudent33@tegshuhaan.mn", classGroup: "9a" },

  // 8а
  { name: "Болорзул", email: "tegshuhaanstudent34@tegshuhaan.mn", classGroup: "8а" },
  { name: "Жаргалмаа", email: "tegshuhaanstudent35@tegshuhaan.mn", classGroup: "8а" },
  { name: "Эрхэмбаяр", email: "tegshuhaanstudent36@tegshuhaan.mn", classGroup: "8а" },
  { name: "Оюударь", email: "tegshuhaanstudent37@tegshuhaan.mn", classGroup: "8а" },
  { name: "Энэрлэн", email: "tegshuhaanstudent38@tegshuhaan.mn", classGroup: "8а" },
  { name: "Анар", email: "tegshuhaanstudent39@tegshuhaan.mn", classGroup: "8а" },
  { name: "Сундар", email: "tegshuhaanstudent40@tegshuhaan.mn", classGroup: "8а" },
  { name: "Индра", email: "tegshuhaanstudent41@tegshuhaan.mn", classGroup: "8а" },
  { name: "Маралмаа", email: "tegshuhaanstudent42@tegshuhaan.mn", classGroup: "8а" },
  { name: "Бадрах", email: "tegshuhaanstudent43@tegshuhaan.mn", classGroup: "8а" },
  { name: "Нарангарав", email: "tegshuhaanstudent44@tegshuhaan.mn", classGroup: "8а" },
  { name: "Б. Билэгт", email: "tegshuhaanstudent45@tegshuhaan.mn", classGroup: "8а" },
  { name: "Ирмүүн", email: "tegshuhaanstudent46@tegshuhaan.mn", classGroup: "8а" },
  { name: "Дөлгөөн", email: "tegshuhaanstudent47@tegshuhaan.mn", classGroup: "8а" },
  { name: "Болор", email: "tegshuhaanstudent48@tegshuhaan.mn", classGroup: "8а" },
  { name: "Аялгуусайхан", email: "tegshuhaanstudent49@tegshuhaan.mn", classGroup: "8а" },
  { name: "Н. Билэгт", email: "tegshuhaanstudent50@tegshuhaan.mn", classGroup: "8а" },
  { name: "Цэцэйгэн", email: "tegshuhaanstudent51@tegshuhaan.mn", classGroup: "8а" },
  { name: "Дөлгөөнтуяа", email: "tegshuhaanstudent52@tegshuhaan.mn", classGroup: "8а" },
  { name: "Лхагва-Эрдэнэ", email: "tegshuhaanstudent53@tegshuhaan.mn", classGroup: "8а" },
  { name: "Хишигт-Очир", email: "tegshuhaanstudent54@tegshuhaan.mn", classGroup: "8а" },
  { name: "Марал", email: "tegshuhaanstudent55@tegshuhaan.mn", classGroup: "8а" },
  { name: "Янжинцэрэн", email: "tegshuhaanstudent56@tegshuhaan.mn", classGroup: "8а" },

  // 6a
  { name: "Анхилхан", email: "tegshuhaanstudent57@tegshuhaan.mn", classGroup: "6a" },
  { name: "Бат", email: "tegshuhaanstudent58@tegshuhaan.mn", classGroup: "6a" },
  { name: "Билгүүн", email: "tegshuhaanstudent59@tegshuhaan.mn", classGroup: "6a" },
  { name: "Гоомарал", email: "tegshuhaanstudent60@tegshuhaan.mn", classGroup: "6a" },
  { name: "Дөлгөөнмөрөн", email: "tegshuhaanstudent61@tegshuhaan.mn", classGroup: "6a" },
  { name: "Жаргалан", email: "tegshuhaanstudent62@tegshuhaan.mn", classGroup: "6a" },
  { name: "Сийлэн", email: "tegshuhaanstudent63@tegshuhaan.mn", classGroup: "6a" },
  { name: "Урангоо", email: "tegshuhaanstudent64@tegshuhaan.mn", classGroup: "6a" },
  { name: "Чингүн", email: "tegshuhaanstudent65@tegshuhaan.mn", classGroup: "6a" },
  { name: "Хаш-Эрдэнэ", email: "tegshuhaanstudent66@tegshuhaan.mn", classGroup: "6a" },
  { name: "Есүй-Үжин", email: "tegshuhaanstudent67@tegshuhaan.mn", classGroup: "6a" },
  { name: "Нансалмаа", email: "tegshuhaanstudent68@tegshuhaan.mn", classGroup: "6a" },
  { name: "Шинэбат", email: "tegshuhaanstudent69@tegshuhaan.mn", classGroup: "6a" },
  { name: "Тэмүгэ", email: "tegshuhaanstudent70@tegshuhaan.mn", classGroup: "6a" },
  { name: "Энэрэл", email: "tegshuhaanstudent71@tegshuhaan.mn", classGroup: "6a" },
  { name: "Хангал", email: "tegshuhaanstudent72@tegshuhaan.mn", classGroup: "6a" },

  // 7а
  { name: "Анар-Эрдэнэ", email: "tegshuhaanstudent73@tegshuhaan.mn", classGroup: "7а" },
  { name: "Алунгуа", email: "tegshuhaanstudent74@tegshuhaan.mn", classGroup: "7а" },
  { name: "Соёмбо", email: "tegshuhaanstudent75@tegshuhaan.mn", classGroup: "7а" },
  { name: "Сүлдбуян", email: "tegshuhaanstudent76@tegshuhaan.mn", classGroup: "7а" },
  { name: "Сэнгүн", email: "tegshuhaanstudent77@tegshuhaan.mn", classGroup: "7а" },
  { name: "Сэцэн", email: "tegshuhaanstudent78@tegshuhaan.mn", classGroup: "7а" },
  { name: "Содбилэг", email: "tegshuhaanstudent79@tegshuhaan.mn", classGroup: "7а" },
  { name: "Мөнх-Эрдэнэ", email: "tegshuhaanstudent80@tegshuhaan.mn", classGroup: "7а" },
  { name: "Тэмүүлэн", email: "tegshuhaanstudent81@tegshuhaan.mn", classGroup: "7а" },
  { name: "Уранхолбоо", email: "tegshuhaanstudent82@tegshuhaan.mn", classGroup: "7а" },
  { name: "Хас-Од", email: "tegshuhaanstudent83@tegshuhaan.mn", classGroup: "7а" },
  { name: "Д. Хулан", email: "tegshuhaanstudent84@tegshuhaan.mn", classGroup: "7а" },
  { name: "М. Хулан", email: "tegshuhaanstudent85@tegshuhaan.mn", classGroup: "7а" },
  { name: "Шинэ-Од", email: "tegshuhaanstudent86@tegshuhaan.mn", classGroup: "7а" },
  { name: "Энэрэл", email: "tegshuhaanstudent87@tegshuhaan.mn", classGroup: "7а" }
];

async function provisionAllStudents() {
  console.log(`Starting account provisioning for ${studentsList.length} students...`);
  let successCount = 0;

  for (const student of studentsList) {
    try {
      let uid;

      // 1. Create Authentication account with password "TegshUhaanStudent"
      try {
        const userRecord = await auth.createUser({
          email: student.email,
          password: "TegshUhaanStudent",
          displayName: student.name,
        });
        uid = userRecord.uid;
      } catch (authError) {
        if (authError.code === 'auth/email-already-exists') {
          const existingUser = await auth.getUserByEmail(student.email);
          uid = existingUser.uid;
        } else {
          throw authError;
        }
      }

      // 2. Create/Update Firestore document with name, class, and supervisor tracking flags
      await db.collection("users").doc(uid).set({
        fullName: student.name,
        email: student.email,
        class: student.classGroup,
        isTegshUhaan: true,
        solvedProblems: [],
        createdAt: new Date()
      }, { merge: true });

      console.log(`Provisioned: [${student.classGroup}] ${student.name} (${student.email})`);
      successCount++;
    } catch (err) {
      console.error(`Failed to provision ${student.email}:`, err.message);
    }
  }

  console.log(`Finished! Successfully provisioned ${successCount} student accounts.`);
}

provisionAllStudents();