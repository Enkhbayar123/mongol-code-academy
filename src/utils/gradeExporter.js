// src/utils/gradeExporter.js
import * as XLSX from 'xlsx';

export function getLetterGrade(percentage) {
  if (percentage >= 90) return 'VIII';
  if (percentage >= 80) return 'VII';
  if (percentage >= 70) return 'VI';
  if (percentage >= 60) return 'V';
    if (percentage >= 50) return 'IV';
    if (percentage >= 40) return 'III';
    if (percentage >= 30) return 'II';
  return 'I';
}

/**
 * Generates an Excel workbook where each class receives its own worksheet.
 */
export function exportGradesToExcel(students, classGroups, calculateProgress, getStudentExam) {
  const wb = XLSX.utils.book_new();

  Object.keys(classGroups).sort((a, b) => a.localeCompare(b, 'mn')).forEach((className) => {
    const classStudents = classGroups[className];

    const sheetData = classStudents.map((student) => {
      // 1. Homework % (60% weight)
      const hwProgress = calculateProgress(student);
      const hwPct = hwProgress.percent || 0;

      // 2. Exam % (30% weight)
      const exam = getStudentExam(student);
      const examPct = exam && exam.maxScore ? Math.round((exam.score / exam.maxScore) * 100) : 0;

      // 3. Participation % (10% weight - defaults to 100% unless configured)
      const partPct = student.participationScore !== undefined ? student.participationScore : 100;

      // Composite calculation: 0.60 * HW + 0.30 * Exam + 0.10 * Participation
      const totalPct = Math.round(hwPct * 0.6 + examPct * 0.3 + partPct * 0.1);
      const letter = getLetterGrade(totalPct);

      return {
        'Овог Нэр': student.fullName || student.name || 'Нэргүй',
        'Имэйл': student.email || '',
        'Анги': className,
        'Гэрийн даалгавар (60%)': `${hwPct}% (${hwProgress.completed}/${hwProgress.total})`,
        '1-р улирлын сорил (30%)': exam ? `${examPct}% (${exam.score}/${exam.maxScore})` : 'Өгөөгүй (0%)',
        'Ирц / Идэвх (10%)': `${partPct}%`,
        'Нийт оноо (%)': `${totalPct}%`,
        'Үсгэн дүн': letter
      };
    });

    const ws = XLSX.utils.json_to_sheet(sheetData);

    // Auto-fit column widths
    ws['!cols'] = [
      { wch: 22 }, // Name
      { wch: 32 }, // Email
      { wch: 10 }, // Class
      { wch: 26 }, // HW
      { wch: 26 }, // Exam
      { wch: 18 }, // Participation
      { wch: 15 }, // Total
      { wch: 12 }  // Grade
    ];

    // Clean sheet tab names (Excel limits to 31 chars and bans specific punctuation)
    const validSheetName = className.replace(/[:\\/?*\[\]]/g, '').slice(0, 30);
    XLSX.utils.book_append_sheet(wb, ws, `${validSheetName} анги`);
  });

  // Download the workbook
  XLSX.writeFile(wb, `TegshUhaan_Dun_${new Date().toISOString().slice(0, 10)}.xlsx`);
}