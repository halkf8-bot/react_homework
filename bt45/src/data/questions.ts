export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
}

export const questionsData: Question[] = [
    {
        id: 1,
        text: "Khái niệm 'làn đường' được hiểu như thế nào là đúng?",
        options: [
            "Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, sử dụng cho xe chạy.",
            "Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có bề rộng đủ cho xe chạy an toàn.",
            "Cả 2 ý trên."
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        text: "Người lái xe không được lùi xe ở những khu vực nào dưới đây?",
        options: [
            "Ở khu vực cho phép đỗ xe.",
            "Ở khu vực cấm dừng và trên phần đường dành cho người đi bộ qua đường.",
            "Nơi đường bộ giao nhau, đường bộ giao nhau cùng mức với đường sắt."
        ],
        correctAnswer: 1
    }
];